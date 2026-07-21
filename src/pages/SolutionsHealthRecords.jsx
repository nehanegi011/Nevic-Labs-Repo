import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/SolutionsHealthRecords.html?raw';

export default function SolutionsHealthRecords() {
  return (
    <>
      <Seo route="/solutions/health-records" />
      <PageContent html={html} />
    </>
  );
}
