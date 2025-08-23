import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Tools from "./pages/Tools";
import Uses from "./pages/Uses";
import Gallary from "./pages/Gallary";

const App = () => {
  return (
    <Router>
      <main>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/uses" element={<Uses />} />
          <Route path="/gallary" element={<Gallary />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
