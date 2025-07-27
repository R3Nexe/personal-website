import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
export const Hero = () => {
  return (
    <section id="hero" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center">
      <div className="max-w-4xl">
        <h1 className='font-bold'>
          Software Developer & Digital Creator
        </h1>
        <p className='md:text-xl pt-2'>
          I build beautiful, responsive, and performant web applications that solve real-world problems and provide exceptional user experiences.
        </p>
      </div>
    </section>
  );
};
