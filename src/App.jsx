import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";
import HudChrome from "./components/HudChrome";

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
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" setLoading={setIsLoading} />}
      </AnimatePresence>
      <HudChrome />
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
  );
};

export default App;
