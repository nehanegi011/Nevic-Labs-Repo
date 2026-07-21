import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Terms.html?raw';

export default function Terms() {
  return (
    <>
      <Seo route="/terms" />
      <PageContent html={html} />
    </>
  );
}
