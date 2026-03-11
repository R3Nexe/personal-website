import { useState } from "react";
import { motion } from "framer-motion";

// Error logging utility for Button component
const logButtonError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo,
  };

  console.error(`🔘 BUTTON ERROR [${context}]:`, errorInfo);
};

const Button = () => {
  const [isHover, setisHover] = useState(false);

  const handleClick = (event) => {
    try {
      // Check if resume file exists
      const resumePath = "/resume/nishant_kumar.pdf";

      // Note: We can't actually check if the file exists from the client side
      // but we can log the click for analytics/debugging
      console.log(
        `✅ Resume button clicked - attempting to open: ${resumePath}`,
      );
    } catch (error) {
      logButtonError("RESUME_CLICK_ERROR", error, {
        severity: "LOW",
        impact: "Resume download may fail",
        resumePath: "/resume/nishant_kumar.pdf",
        solution: "Ensure resume file exists in public/resume/ directory",
      });
    }
  };

  return (
    <div className="flex justify-center pt-3">
      <motion.div
        className="group flex relative overflow-clip border-1 border-bright-purple p-2 rounded-full bg-white hover:bg-white/50 transition-all duration-400
        "
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
        initial={{ translateY: 50 }}
        animate={{
          translateY: 0,
        }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <motion.a
          className="text-black z-5 group-hover:text-white transition-all duration-400"
          href="/resume/nishant_kumar.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          View Resume
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Button;
