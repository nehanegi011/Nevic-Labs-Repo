import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/SolutionsDigitalMarketing.html?raw';

export default function SolutionsDigitalMarketing() {
  return (
    <>
      <Seo route="/solutions/digital-marketing" />
      <PageContent html={html} />
    </>
  );
}
