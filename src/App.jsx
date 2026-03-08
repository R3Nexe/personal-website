import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar";
import Loader from "./components/Loader";

import { setupGlobalErrorHandling } from "./lib/errorLogger";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tools from "./pages/Tools";
import Uses from "./pages/Uses";
import Gallery from "./pages/Gallery";

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
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
