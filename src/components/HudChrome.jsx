import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const corners = [
  { key: "tl", className: "hud-corner hud-corner--tl" },
  { key: "tr", className: "hud-corner hud-corner--tr" },
  { key: "bl", className: "hud-corner hud-corner--bl" },
  { key: "br", className: "hud-corner hud-corner--br" },
];

const formatClock = (date) =>
  date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

export const HudChrome = () => {
  const [time, setTime] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatClock(new Date()));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hud-chrome" aria-hidden="true">
      <div className="hud-grid" />
      <div className="hud-grain" />
      {corners.map((corner, i) => (
        <motion.div
          key={corner.key}
          className={corner.className}
          style={{ "--glitch-delay": `${i * 1.6}s` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      <div className="hud-meta hud-meta--left">Odisha, India</div>
      <div className="hud-meta hud-meta--right">
        <span className="hud-meta-dot" />
        {time} UTC
      </div>
    </div>
  );
};

export default HudChrome;
