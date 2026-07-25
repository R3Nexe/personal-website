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
  const handleClick = () => {
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
        initial={{ translateY: 50, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <a
          className="btn-bracket btn-bracket--primary cursor-target"
          href="/resume/nishant_kumar.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          <span className="btn-bracket-corner" />
          View Resume
        </a>
      </motion.div>
    </div>
  );
};

export default Button;
