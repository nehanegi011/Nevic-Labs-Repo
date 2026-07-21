// Paragraphs may contain inline HTML (e.g. <b>…</b>) — this is trusted local
// content from posts.json, so dangerouslySetInnerHTML is appropriate here.
export default function PostBody({ paragraphs = [] }) {
  return (
    <div className="body">
      {paragraphs.map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
}
