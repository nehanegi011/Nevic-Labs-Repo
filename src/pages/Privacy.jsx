import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Privacy.html?raw';

export default function Privacy() {
  return (
    <>
      <Seo route="/privacy" />
      <PageContent html={html} />
    </>
  );
}
