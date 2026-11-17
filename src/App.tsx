import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import Layout from './components/Layout';

// Route-based code splitting: Each route is compiled into its own lightweight chunk
const Home = lazy(() => import('./pages/Home'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Industries = lazy(() => import('./pages/Industries'));
const HowItWorks = lazy(() => import('./pages/HowItWorks'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const Resources = lazy(() => import('./pages/Resources'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Company = lazy(() => import('./pages/Company'));
const OurStory = lazy(() => import('./pages/OurStory'));
const Security = lazy(() => import('./pages/Security'));
const Tools = lazy(() => import('./pages/Tools'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Compare = lazy(() => import('./pages/Compare'));
const Press = lazy(() => import('./pages/Press'));
const Insights = lazy(() => import('./pages/Insights'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const Docs = lazy(() => import('./pages/Docs'));
const Faq = lazy(() => import('./pages/Faq'));
const Status = lazy(() => import('./pages/Status'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoadingFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center p-8">
      <div className="flex items-center gap-3 text-on-surface-variant font-mono text-xs font-medium tracking-wider">
        <span className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span>Loading view...</span>
      </div>
    </div>
  );
}

function LegacyHashRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
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
    <MotionConfig reducedMotion="user">
      <Router>
        <LegacyHashRedirect />
        <AnalyticsTracker />
        <ScrollManager />
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="engineering" element={<Engineering />} />
              <Route path="services" element={<Services />} />
              <Route path="services/:slug" element={<ServiceDetail />} />
              <Route path="solutions" element={<Solutions />} />
              <Route path="industries" element={<Industries />} />
              <Route path="how-it-works" element={<HowItWorks />} />
              <Route path="case-studies" element={<CaseStudies />} />
              <Route path="resources" element={<Resources />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="company" element={<Company />} />
              <Route path="our-story" element={<OurStory />} />
              <Route path="security" element={<Security />} />
              <Route path="tools" element={<Tools />} />
              <Route path="glossary" element={<Glossary />} />
              <Route path="compare" element={<Compare />} />
              <Route path="press" element={<Press />} />
              <Route path="insights" element={<Insights />} />
              <Route path="careers" element={<Careers />} />
              <Route path="contact" element={<Contact />} />
              <Route path="docs" element={<Docs />} />
              <Route path="faq" element={<Faq />} />
              <Route path="status" element={<Status />} />
              <Route path="legal" element={<Legal />} />
              <Route path="privacy" element={<Legal />} />
              <Route path="terms" element={<Legal />} />
              <Route path="disclaimer" element={<Legal />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </MotionConfig>
  );
}
