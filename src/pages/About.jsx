import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/About.html?raw';

export default function About() {
  return (
    <>
      <Seo route="/about" />
      <PageContent html={html} />
    </>
  );
}
