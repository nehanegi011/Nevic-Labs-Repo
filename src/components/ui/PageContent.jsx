// Renders a ported page-content fragment exactly as authored in the source site.
// Fragments are pre-extracted at build time (scripts/extract.mjs) with internal
// links + asset paths already rewritten, and inline <script> stripped.
export default function PageContent({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
