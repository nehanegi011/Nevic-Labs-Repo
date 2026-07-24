import { useState, useRef } from 'react';
import { supabase } from './supabaseClient';

const initialState = {
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

const MAX_FILE_MB = 5;

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function ContactForm() {
  const [values, setValues] = useState(initialState);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.type !== 'application/pdf') {
      setErrors((prev) => ({ ...prev, file: 'Please upload a PDF file.' }));
      setFile(null);
      e.target.value = '';
      return;
    }
    if (selected.size > MAX_FILE_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: `File is too large — please keep it under ${MAX_FILE_MB}MB.` }));
      setFile(null);
      e.target.value = '';
      return;
    }
    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(selected);
  };

  // Only validates fields that actually exist in this form now.
  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!isValidEmail(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.phone.trim()) next.phone = 'Please enter a phone number.';
    if (!values.consent) next.consent = 'Please provide your consent to continue.';
    setErrors((prev) => ({ ...prev, ...next }));
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      let attachmentUrl = null;

      if (file) {
        const path = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('attachments')
          .upload(path, file, { contentType: 'application/pdf' });

        if (uploadError) throw uploadError;

        const { data: signedData, error: signedError } = await supabase.storage
          .from('attachments')
          .createSignedUrl(path, 60 * 60 * 24 * 7); // 7-day link, regenerate as needed

        if (signedError) throw signedError;
        attachmentUrl = signedData.signedUrl;
      }

      const { error: insertError } = await supabase.from('submissions').insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        consent: values.consent,
        attachment_url: attachmentUrl,
      });

      if (insertError) throw insertError;

      const { error: emailError } =
  await supabase.functions.invoke(
    "send-contact-email",
    {
      body: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        attachmentUrl,
      },
    }
  );

if (emailError) throw emailError;

      setStatus('success');
      setValues(initialState);
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="ok" style={{ display: 'block' }}>
        Thank you for contacting Nevic Labs. We've received your details. Our team will reach out to you.
      </div>
    );
  }

  return (
    <form name="contact" onSubmit={handleSubmit} noValidate>
      <div className="r2">
        <div>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" value={values.name} onChange={handleChange} autoComplete="name" />
          {errors.name && <ErrorText text={errors.name} />}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={values.email} onChange={handleChange} autoComplete="email" />
          {errors.email && <ErrorText text={errors.email} />}
        </div>
      </div>

      <div className="r2">
        <div>
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
          {errors.phone && <ErrorText text={errors.phone} />}
        </div>
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" value={values.message} onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="attachment">Upload a document (PDF)</label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {file && (
          <p style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 6 }}>
            Selected: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
          </p>
        )}
        {errors.file && <ErrorText text={errors.file} />}
      </div>

      <label className="consent" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <input
          type="checkbox"
          name="consent"
          checked={values.consent}
          onChange={handleChange}
          style={{ width: 16, height: 16, marginTop: 2, flex: 'none' }}
        />
        <span>
          I consent to Nevic Labs contacting me regarding my enquiry, in accordance with the {' '}
          <a href="/privacy">Privacy Policy</a>.
        </span>
      </label>
      {errors.consent && <ErrorText text={errors.consent} />}

      <button type="submit" className="btn btn-accent" disabled={status === 'submitting'} style={{ justifySelf: 'start' }}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#B3261E', fontSize: 14 }}>
          Something went wrong sending this — please try again, or email us directly at contact@neviclabs.com.
        </p>
      )}
    </form>
  );
}

function ErrorText({ text }) {
  return <p style={{ color: '#B3261E', fontSize: 12.5, marginTop: 4 }}>{text}</p>;
}
