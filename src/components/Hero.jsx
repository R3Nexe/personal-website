import { motion } from 'framer-motion';
import Button from './Button';
export const Hero = () => {
  return (
    <motion.section id="hero" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
        // Animate to opacity 1
        animate={{ opacity: 1, scale: 1 }}
        // The animation will take 0.8 seconds
        transition={{ duration: 0.8, ease: "easeOut",}}
    >
      <div className="max-w-4xl">
        <h1 className='font-bold'>
          Software Developer & Digital Creator
        </h1>
        <p className='md:text-xl pt-2'>
          I build beautiful, responsive, and performant web applications that solve real-world problems and provide exceptional user experiences.
        </p>

        <Button/>
      </div>
    </motion.section>
  );
};
