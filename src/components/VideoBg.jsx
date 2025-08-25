import { motion, useScroll, useTransform } from "framer-motion";

export const VideoBackground = () => {
  const { scrollYProgress } = useScroll();
  const translateValue = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.5]);
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const opacityValue = useTransform(scrollYProgress, [0, 1], [1, 1]);
  return (
    <div className="fixed h-screen w-full top-0 left-0 z-[0]">
      <motion.video
        style={{
          scale: scaleValue,
          opacity: opacityValue,
        }}
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{duration:1.2}}

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
      <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
    </div>
  );
};
