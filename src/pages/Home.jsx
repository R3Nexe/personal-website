import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import TextType from "../components/TextType";
import TelemetryBlock from "../components/TelemetryBlock";
import { About } from "../components/About";
import { VideoBackground } from "../components/VideoBg";

const formatClock = (date) =>
  date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

// Stable references: Home re-renders every second (the live UTC clock), so these
// must not be re-created inline — TextType keys its typing effect off their
// identity, and fresh objects each render would reset the timer before it advances.
const HERO_TAGLINES = [
  "I Ship Pixels & Predictions",
  "Turns Coffee Into Commits",
  "console.log('hire me')",
  "Code • Design • Data",
  "Engineering curiosity into code"

];
const TAGLINE_SPEED = { min: 55, max: 95 };

// One orchestrated arrival: the hero materialises as a single reveal, its
// readouts cascading in sequence, rather than four entrances on their own eases.
const EASE_OUT = [0.16, 1, 0.3, 1];

const heroReveal = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: EASE_OUT,
      delayChildren: 0.3,
      staggerChildren: 0.12,
    },
  },
};

const heroGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

// The telemetry readout carries a scroll-linked `y` motion value, so it fades
// in on opacity alone to avoid fighting that transform.
const heroFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_OUT } },
};

const Home = () => {
  // Real client telemetry for the hero readout — factual only, never fabricated
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
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

  const [time, setTime] = useState(() => formatClock(new Date()));
  useEffect(() => {
    const interval = setInterval(() => setTime(formatClock(new Date())), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <VideoBackground />
      {/* Hero Section */}
      <motion.section
        id="hero"
        ref={heroRef}
        className="flex flex-col justify-center items-center min-h-dvh w-full px-5 text-center"
        variants={heroReveal}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="hero-telemetry"
          style={{ y: telemetryY }}
          variants={heroFade}
        >
          <TelemetryBlock
            lines={[
              ["SYS.CLIENT", `VIEWPORT ${viewport.width}×${viewport.height}`],
              ["SYS.ORIGIN", "ODISHA · IN"],
              ["SYS.RENDER", "REACT19 // VITE7"],
              ["SYS.CLOCK", `${time} UTC`],
            ]}
          />
        </motion.div>
        <motion.div className="hero-content max-w-4xl" variants={heroGroup}>
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl"
            variants={heroItem}
          >
            Nishant Kumar
          </motion.h1>

          <motion.div
            variants={heroItem}
            className="py-1 md:py-2 px-4 min-h-[4.5rem] md:min-h-0 flex items-center justify-center"
          >
            <TextType
              text={HERO_TAGLINES}
              className="font-head text-2xl md:text-4xl"
              typingSpeed={70}
              deletingSpeed={35}
              pauseDuration={1800}
              variableSpeed={TAGLINE_SPEED}
              cursorCharacter="_"
              cursorClassName="text-bright-purple"
            />
          </motion.div>

          <motion.div className="mt-6" variants={heroItem}>
            <Button />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* About Section */}
      <About />
    </>
  );
};

export default Home;
