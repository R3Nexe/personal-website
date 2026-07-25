import { motion } from "framer-motion";
import FuzzyText from "./FuzzyText";

export const PageHeader = ({ eyebrow, title }) => (
  <div className="page-header">
    <div className="page-header-reticle" aria-hidden="true" />
    <motion.p
      className="page-header-eyebrow"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow}
    </motion.p>
    <motion.h1
      className="page-header-title font-head"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      <FuzzyText
        fontSize="3rem"
        fontWeight={400}
        fontFamily="'Orbitron', sans-serif"
        color="#EAEAEA"
        enableHover={true}
        baseIntensity={0.15}
        hoverIntensity={0.4}
        fuzzRange={14}
        fps={30}
      >
        {title}
      </FuzzyText>
    </motion.h1>
  </div>
);

export default PageHeader;
