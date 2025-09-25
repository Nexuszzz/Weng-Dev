import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CandidateFeatures from './components/CandidateFeatures';
import CompanyFeatures from './components/CompanyFeatures';
import SDGImpact from './components/SDGImpact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AnimatedStats from './components/AnimatedStats';
import Login from './pages/Login';
import Register from './pages/Register';
import OAuthMock from './pages/OAuthMock';
import OAuthCallback from './pages/OAuthCallback';
import DashboardLayout from './dashboard/components/DashboardLayout';
import DashboardJobsHome from './dashboard/pages/DashboardJobsHome';
import JobFinder from './dashboard/pages/JobFinder';
import JobSimulation from './dashboard/pages/JobSimulation';
import FeaturePlaceholder from './dashboard/pages/FeaturePlaceholder';
import AutoCV from './dashboard/pages/AutoCV';

function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <HowItWorks />
      <CandidateFeatures />
      <CompanyFeatures />
      <SDGImpact />
      <AnimatedStats />
      <Testimonials />
      <Footer />
    </div>
  );
}

// Scroll to top on route change
const useScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
};

// Page transition wrapper (default)
const Page: React.FC<React.PropsWithChildren<{ direction?: 'left' | 'right' }>> = ({ children, direction = 'right' }) => {
  const initialX = direction === 'right' ? 20 : -20;
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -initialX }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Auth page transition: Slide + Fade + subtle blur & scale (ciamik)
const AuthPage: React.FC<React.PropsWithChildren<{ direction?: 'left' | 'right' }>> = ({ children, direction = 'left' }) => {
  const offset = direction === 'left' ? 40 : -40;
  return (
    <motion.div
      initial={{ opacity: 0, x: offset, scale: 0.98, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -offset / 2, scale: 0.985, filter: 'blur(6px)' }}
      transition={{ type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  useScrollToTop();
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page><HomePage /></Page>} />
        <Route path="/login" element={<AuthPage direction="left"><Login /></AuthPage>} />
        <Route path="/register" element={<AuthPage direction="left"><Register /></AuthPage>} />
        <Route path="/auth/:provider" element={<AuthPage direction="left"><OAuthMock /></AuthPage>} />
        <Route path="/auth/callback" element={<AuthPage direction="left"><OAuthCallback /></AuthPage>} />
        <Route path="/dashboard" element={<Page direction="right"><DashboardLayout /></Page>}>
          <Route index element={<DashboardJobsHome />} />
          <Route path="job-finder" element={<JobFinder />} />
          <Route path="job-simulation" element={<JobSimulation />} />
          <Route path="apprenticeship-tracker" element={<FeaturePlaceholder title="Pelacak Magang" />} />
          <Route path="auto-cv" element={<AutoCV />} />
          <Route path="escrow-contract" element={<FeaturePlaceholder title="Kontrak Escrow" />} />
          <Route path="impact-dashboard" element={<FeaturePlaceholder title="Dasbor Dampak" />} />
          <Route path="portfolio" element={<FeaturePlaceholder title="Portofolio" />} />
          <Route path="skill-snapshot" element={<FeaturePlaceholder title="Ringkasan Skill" />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;