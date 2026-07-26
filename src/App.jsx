import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import HudChrome from "./components/HudChrome";
import TargetCursor from "./components/TargetCursor";
import GradualBlur from "./components/GradualBlur";

import { setupGlobalErrorHandling } from "./lib/errorLogger";

// Pages (route-level code splitting: each page ships in its own chunk)
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Tools = lazy(() => import("./pages/Tools"));
const Uses = lazy(() => import("./pages/Uses"));
const Gallery = lazy(() => import("./pages/Gallery"));

// Site-wide scroll edge: content dissolves into the void at the bottom of the
// viewport as it scrolls past — the Event Horizon read applied to scrolling
// itself. Fixed (target="page"), so it holds across routes.
//
// zIndex is pinned to 20 (overriding the component default): above all scrolling
// content and the hero (z-10), but below the fixed chrome — nav (z-50) and the
// mobile menu (z-40) — so only content dissolves, never a control.
//
// It sits out on /gallery: that page pins its category filter to the viewport
// bottom, and stacking this backdrop-filter beneath the filter's own frosted
// glass muddies that control. Rather than degrade a primary control, the fade
// yields on the one page that has bottom-fixed UI.
const ScrollEdgeBlur = () => {
  const { pathname } = useLocation();
  if (pathname === "/gallery") return null;
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="6.5rem"
      strength={2}
      divCount={6}
      curve="bezier"
      exponential
      opacity={1}
      style={{ zIndex: 20 }}
    />
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Setup global error handling
  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);

  return (
    // reducedMotion="user" makes every framer-motion animation honour the OS
    // setting: transform/layout moves are dropped, opacity fades are kept.
    <MotionConfig reducedMotion="user">
      <Router>
        <AnimatePresence mode="wait">
          {isLoading && <Loader key="loader" setLoading={setIsLoading} />}
        </AnimatePresence>
        <HudChrome />
        <TargetCursor
          targetSelector=".cursor-target"
          spinDuration={8}
          hideDefaultCursor={true}
          parallaxOn={true}
          cursorColor="rgba(234, 234, 234, 0.7)"
          cursorColorOnTarget="#9A70F5"
        />
        <main>
          <Navbar />
          <Suspense fallback={<div className="min-h-screen w-full" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/uses" element={<Uses />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </Suspense>
        </main>
        {/* Gated on the loader so the strip never shows over the loading screen. */}
        {!isLoading && <ScrollEdgeBlur />}
      </Router>
    </MotionConfig>
  );
};

export default App;
