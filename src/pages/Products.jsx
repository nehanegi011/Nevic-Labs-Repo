import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Products.html?raw';

export default function Products() {
  return (
    <>
      <Seo route="/products" />
      <PageContent html={html} />
    </>
  );
}
