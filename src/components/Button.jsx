import { useState } from "react";
import { motion } from "framer-motion";

const Button = () => {
  const [isHover, setisHover] = useState(false);
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
        >
          View Resume
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Button;
