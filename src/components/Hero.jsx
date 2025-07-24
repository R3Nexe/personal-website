import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero = () => {
  return (
    <section id="home" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center">
      <div className="max-w-4xl">
        <h1 className="text-3xl text-gradient leading-tight md:text-7xl lg:text-8xl">
          Software Developer & Digital Creator
        </h1>
        <p>
          I build beautiful, responsive, and performant web applications that solve real-world problems and provide exceptional user experiences.
        </p>
      </div>
    </section>
  );
};
