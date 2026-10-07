import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Engineering from './pages/Engineering';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Company from './pages/Company';
import Insights from './pages/Insights';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Docs from './pages/Docs';
import Faq from './pages/Faq';
import Status from './pages/Status';
import NotFound from './pages/NotFound';

function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    // Automatically convert legacy hash routes (e.g. /#/careers or /#/services) into clean canonical paths
    if (typeof window !== 'undefined' && window.location.hash && window.location.hash.startsWith('#/')) {
      const cleanPath = window.location.hash.slice(2);
      if (cleanPath) {
        navigate('/' + cleanPath, { replace: true });
      }
    }
  }, [navigate]);
  return null;
}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // If there is a hash in the current location or query
    if (location.hash && !location.hash.startsWith('#/')) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
        return;
      }
    }
    // Default to top of viewport on path change without hash
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, location.hash]);

  return null;
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', 'G-FRDMX9QZH8', {
        page_path: location.pathname + location.search + location.hash,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <Router>
      <LegacyHashRedirect />
      <AnalyticsTracker />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="engineering" element={<Engineering />} />
          <Route path="services" element={<Services />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="industries" element={<Industries />} />
          <Route path="company" element={<Company />} />
          <Route path="insights" element={<Insights />} />
          <Route path="careers" element={<Careers />} />
          <Route path="contact" element={<Contact />} />
          <Route path="docs" element={<Docs />} />
          <Route path="faq" element={<Faq />} />
          <Route path="status" element={<Status />} />
          <Route path="legal" element={<Legal />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
