import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
const App = () => {
  return (
    <>
        <main>
          <Navbar />
          <Hero />
          <About />
          {/* ... other sections go here */}
        </main>
    </>
  );
};

export default App;
