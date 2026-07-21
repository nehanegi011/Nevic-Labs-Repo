import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/ProductConnect.html?raw';

export default function ProductConnect() {
  return (
    <>
      <Seo route="/products/connect" />
      <PageContent html={html} />
    </>
  );
}
