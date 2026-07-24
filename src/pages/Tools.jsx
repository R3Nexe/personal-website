import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";

const Tools = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-center">
      <PageHeader eyebrow="System Status" title="Work in Progress" />
      <motion.div
        className="tools-status"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <span className="tools-status-dot" />
        <span className="tools-status-label">Status: In Development</span>
      </motion.div>
      <p className="tools-status-note">
        This section is still being assembled — check back soon.
      </p>
    </section>
  );
};

export default Tools;
