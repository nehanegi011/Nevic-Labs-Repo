import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Careers.html?raw';

export default function Careers() {
  return (
    <>
      <Seo route="/careers" />
      <PageContent html={html} />
    </>
  );
}
