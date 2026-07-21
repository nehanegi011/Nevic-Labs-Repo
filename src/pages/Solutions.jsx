import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Solutions.html?raw';

export default function Solutions() {
  return (
    <>
      <Seo route="/solutions" />
      <PageContent html={html} />
    </>
  );
}
