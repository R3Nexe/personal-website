import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      // Add the exit prop
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      <motion.div
        className="w-16 h-16 bg-white rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: 2,
        }}
      />
    </motion.div>
  );
};

export default Loader;
