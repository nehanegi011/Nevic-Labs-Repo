import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/SolutionsPatientEngagement.html?raw';

export default function SolutionsPatientEngagement() {
  return (
    <>
      <Seo route="/solutions/patient-engagement" />
      <PageContent html={html} />
    </>
  );
}
