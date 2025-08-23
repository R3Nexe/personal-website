import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export const VideoBackground = () => {
  const { scrollYProgress } = useScroll();
  const [isLoaded, setIsLoaded] = useState(false);

  // Store initial position and scale in localStorage to retain on reload
  useEffect(() => {
    const savedTransform = localStorage.getItem('videoTransform');
    if (savedTransform) {
      setIsLoaded(true);
    } else {
      // Set initial transform after component mounts
      setTimeout(() => {
        setIsLoaded(true);
        localStorage.setItem('videoTransform', 'loaded');
      }, 100);
    }
  }, []);

  // Home page variant: scale up on reload, then scale/translate on scroll

    const translateValue = useTransform(scrollYProgress, [0, 1], [0,500]);
    const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const rotateValue = useTransform(scrollYProgress, [0, 1], [0, -16]);
    const opacityValue = useTransform(scrollYProgress,[0,1],[1,1])
    return (
      <div className="fixed h-screen w-full top-0 left-0 z-[0]">
        <motion.video
          style={{
            translateY: translateValue,
            scale: scaleValue,
            rotate: rotateValue,
            opacity:opacityValue,
          }}
          initial={{ scale: 0, rotate: -15 }}
          animate={isLoaded ? { scale: 1, rotate: 0 } : { scale: 1, rotate: -15 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src="videos/smooth.webm" />
          Your browser does not support the video tag.
        </motion.video>
        <div className="absolute top-0 left-0 h-full w-full backdrop-blur-[3px] bg-black/45"></div>
      </div>
    );

}
