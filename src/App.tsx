import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './site/Home';
import Work from './site/Work';
import { About, CaseStudy, OldProject } from './site/Routes';
import '@fontsource/playfair-display/latin-400.css';
import '@fontsource/playfair-display/latin-400-italic.css';
import '@fontsource/playfair-display/latin-500.css';
import '@fontsource/montserrat/latin-500.css';
import '@fontsource/montserrat/latin-600.css';
import '@fontsource/montserrat/latin-700.css';
import '@fontsource/jost/latin-300.css';
import '@fontsource/jost/latin-400.css';
import '@fontsource/jost/latin-500.css';
import './site.css';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<CaseStudy />} />
      <Route path="/about" element={<About />} />
      <Route path="/portfolio" element={<Navigate to="/work" replace />} />
      <Route path="/portfolio/:slug" element={<OldProject />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
