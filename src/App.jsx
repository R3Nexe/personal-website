import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { VideoBackground } from './components/VideoBg';
const App = () => {

  return (
    <>
        <main>
          <VideoBackground/>
          <Navbar />
          <Hero />
          <About />
        </main>
    </>
  );
};

export default App;
