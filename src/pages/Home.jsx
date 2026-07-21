import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Home.html?raw';

export default function Home() {
  return (
    <>
      <Seo route="/" />
      <PageContent html={html} />
    </>
  );
}
