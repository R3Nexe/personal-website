import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export const Loader = () => {
  // Animation for the loader to fade out
  const loaderVariants = {
    exit: {
      opacity: 0,
      transition: {
        duration: 1.0, // Control the speed of the fade out
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black"
      variants={loaderVariants}
      exit="exit" // Triggered by AnimatePresence on component unmount
    >
      {/* The video will cover the entire screen.
        - `autoPlay`: Starts the video automatically.
        - `muted`: Required for autoplay in most browsers.
        - `loop`: Loops the video if it's short.
        - `playsInline`: Important for mobile browsers.
      */}
      <video
        src="public/Timeline 1.mov"
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      ></video>
    </motion.div>
  );
};
