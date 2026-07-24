import { motion } from "framer-motion";

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
      {title}
    </motion.h1>
  </div>
);

export default PageHeader;
