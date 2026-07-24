import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import RotatingText from "../components/RotatingText";
import TelemetryBlock from "../components/TelemetryBlock";
import { About } from "../components/About";
import { VideoBackground } from "../components/VideoBg";

const Home = () => {
  // Real client telemetry for the hero readout — factual only, never fabricated
  const { scrollYProgress } = useScroll();
  const telemetryY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const [viewport, setViewport] = useState({ width: 0, height: 0, tz: "" });
  useEffect(() => {
    const readViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    };
    readViewport();
    window.addEventListener("resize", readViewport);
    return () => window.removeEventListener("resize", readViewport);
  }, []);

  return (
    <>
      <VideoBackground variant="home" />
      {/* Hero Section */}
      <motion.section
        id="hero"
        className="flex flex-col justify-center items-center h-screen w-full px-5 text-center"
        initial={{ opacity: 0, scale: 0.7,translateY:-100 }}
        animate={{ opacity: 1, scale: 1, translateY:0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <motion.div className="hero-telemetry" style={{ y: telemetryY }}>
          <TelemetryBlock
            lines={[
              ["SYS.CLIENT", `VIEWPORT ${viewport.width}×${viewport.height}`],
              ["SYS.CLIENT", `TZ ${viewport.tz}`],
              ["SYS.ORIGIN", "ODISHA · IN"],
              ["SYS.RENDER", "REACT19 // VITE7"],
            ]}
          />
        </motion.div>
        <div className="max-w-4xl">
          <motion.h1
            className="font-medium text-6xl sm:text-7xl md:text-8xl"
            initial={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Nishant Kumar
          </motion.h1>

          <RotatingText
            texts={[
              "FrontEnd Developer",
              "AI Enthusiast",
              "Tech Junkie",
              "Artist",
              "Photographer",
              "Coffee Nerd",
            ]}
            mainClassName="px-2 md:px-3 text-highlight font-head md:text-4xl text-2xl overflow-hidden py-1 md:py-2 justify-center rounded-lg"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />

          <div className="mt-6">
            <Button />
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <About />
    </>
  );
};

export default Home;
