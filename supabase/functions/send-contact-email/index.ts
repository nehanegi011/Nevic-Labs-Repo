import { serve } from "https://deno.land/std/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const {
      name,
      email,
      phone,
      message,
      attachmentUrl,
    } = await req.json();

    console.log("Sending email...");

    const { data, error } = await resend.emails.send({
      // Use onboarding@resend.dev while testing unless your domain is verified
      // from: "Nevic Labs <contact@neviclabs.com>"
      from: "onboarding@resend.dev",
      to: ["nehaagnihotripune@gmail.com"],
      replyTo: email,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>

        ${
          attachmentUrl
            ? `<p><a href="${attachmentUrl}">View Attachment</a></p>`
            : ""
        }
      `,
    });

    console.log(data);

    if (error) {
      console.error(error);

      return new Response(JSON.stringify(error), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});