import { motion } from 'framer-motion';
import Button from './Button';
export const Hero = () => {
  return (
    <motion.section id="hero" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", }}
    >
      <div className="max-w-4xl">
        <h1 className='font-bold'>
          FrontEnd Developer & <br />AI Enthusiast
        </h1>
        <p className='md:text-xl pt-2'>
          From building beautiful responsive websites <br />to training Machine learning models, I do it all
        </p>
        <Button />
      </div>
    </motion.section>
  );
};
