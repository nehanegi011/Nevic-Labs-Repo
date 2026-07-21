import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/ProductReach.html?raw';

export default function ProductReach() {
  return (
    <>
      <Seo route="/products/reach" />
      <PageContent html={html} />
    </>
  );
}
