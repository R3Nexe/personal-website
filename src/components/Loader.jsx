import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let isLoaded = document.readyState === "complete";

    // Fallback if load event hasn't fired yet
    const handleLoad = () => {
      isLoaded = true;
    };

    window.addEventListener("load", handleLoad);

    let progressValue = 0;
    const interval = setInterval(() => {
      // randomly increment progress
      progressValue += Math.floor(Math.random() * 15) + 5;

      if (progressValue >= 90) {
        if (isLoaded) {
          progressValue = 100;
          setProgress(100);
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600); // 0.6s delay at 100%
        } else {
          progressValue = 90; // hold at 90% until fully loaded
          setProgress(90);
        }
      } else {
        setProgress(progressValue);
      }
    }, 200);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(interval);
    };
  }, [setLoading]);

  // Prevent scrolling while loader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="flex flex-col items-center">
        {/* Animated Rings */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-t-transparent border-l-transparent border-r-[#9A70F5] border-b-[#9A70F5] opacity-70"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-b-transparent border-r-transparent border-l-[#F4F4F6] border-t-[#F4F4F6] opacity-"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 rounded-full border border-dashed border-white/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="text-white font-head text-3xl font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="font-sub-head tracking-[0.2em] text-[#EAEAEA] text-sm md:text-base uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0,1,0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Materialising Site...
        </motion.div>

        {/* Loading Bar */}
        <div className="w-56 md:w-64 h-1.5 bg-[#EAEAEA]/10 rounded-full mt-5 overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#9A70F5] to-[#F4F4F6] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
