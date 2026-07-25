import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import HudChrome from "./components/HudChrome";
import TargetCursor from "./components/TargetCursor";

import { setupGlobalErrorHandling } from "./lib/errorLogger";

// Pages (route-level code splitting: each page ships in its own chunk)
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const Tools = lazy(() => import("./pages/Tools"));
const Uses = lazy(() => import("./pages/Uses"));
const Gallery = lazy(() => import("./pages/Gallery"));

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
      </Router>
    </MotionConfig>
  );
};

export default App;
