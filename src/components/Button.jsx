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
    ...additionalInfo
  };

  console.error(`🔘 BUTTON ERROR [${context}]:`, errorInfo);
};

const Button = () => {
  const [isHover, setisHover] = useState(false);

  const handleClick = (event) => {
    try {
      // Check if resume file exists
      const resumePath = "/resume/webdevResume.pdf";

      // Note: We can't actually check if the file exists from the client side
      // but we can log the click for analytics/debugging
      console.log(`✅ Resume button clicked - attempting to open: ${resumePath}`);

    } catch (error) {
      logButtonError('RESUME_CLICK_ERROR', error, {
        severity: 'LOW',
        impact: 'Resume download may fail',
        resumePath: "/resume/webdevResume.pdf",
        solution: 'Ensure resume file exists in public/resume/ directory'
      });
    }
  };

  return (
    <div className="flex justify-center pt-3">
      <motion.div
        className="flex relative overflow-clip border-1 p-2 rounded-full
        "
        onMouseEnter={() => setisHover(true)}
        onMouseLeave={() => setisHover(false)}
        animate={{
          scale: isHover ? 1.1 : 1,
        }}
        transition={{ ease: "easeIn" }}
      >
        <motion.a
          className="text-white z-5 "
          href="/resume/webdevResume.pdf"
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
