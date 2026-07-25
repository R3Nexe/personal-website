import { motion } from "framer-motion";

const corners = [
  { key: "tl", className: "hud-corner hud-corner--tl" },
  { key: "tr", className: "hud-corner hud-corner--tr" },
  { key: "bl", className: "hud-corner hud-corner--bl" },
  { key: "br", className: "hud-corner hud-corner--br" },
];

export const HudChrome = () => {
  return (
    <div className="hud-chrome" aria-hidden="true">
      <div className="hud-grid" />
      <div className="hud-grain" />
      {corners.map((corner, i) => (
        <motion.div
          key={corner.key}
          className={corner.className}
          style={{ "--glitch-delay": `${i * .2}s` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

export default HudChrome;
