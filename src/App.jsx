import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';

import Home from './pages/Home.jsx';
import Solutions from './pages/Solutions.jsx';
import SolutionsOpdManagement from './pages/SolutionsOpdManagement.jsx';
import SolutionsPatientEngagement from './pages/SolutionsPatientEngagement.jsx';
import SolutionsDigitalMarketing from './pages/SolutionsDigitalMarketing.jsx';
import SolutionsHealthRecords from './pages/SolutionsHealthRecords.jsx';
import Products from './pages/Products.jsx';
import ProductPulse from './pages/ProductPulse.jsx';
import ProductConnect from './pages/ProductConnect.jsx';
import ProductReach from './pages/ProductReach.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/opd-management" element={<SolutionsOpdManagement />} />
          <Route path="/solutions/patient-engagement" element={<SolutionsPatientEngagement />} />
          <Route path="/solutions/digital-marketing" element={<SolutionsDigitalMarketing />} />
          <Route path="/solutions/health-records" element={<SolutionsHealthRecords />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/pulse" element={<ProductPulse />} />
          <Route path="/products/connect" element={<ProductConnect />} />
          <Route path="/products/reach" element={<ProductReach />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
