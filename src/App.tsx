import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';

// Route-based code splitting: Each route is compiled into its own lightweight chunk
const Home = lazy(() => import('./pages/Home'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Services = lazy(() => import('./pages/Services'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Industries = lazy(() => import('./pages/Industries'));
const Company = lazy(() => import('./pages/Company'));
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
      <div className="flex items-center gap-2 text-primary font-mono text-xs font-bold tracking-wider animate-pulse">
        <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
        <span>INITIALIZING TELEMETRY...</span>
      </div>
    </div>
  );
}

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
      <Suspense fallback={<RouteLoadingFallback />}>
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
      </Suspense>
    </Router>
  );
}
