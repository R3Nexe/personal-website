import { motion } from 'framer-motion';
import Button from './Button';
import RotatingText from './RotatingText';
export const Hero = () => {
  return (
    <motion.section id="hero" className="flex flex-col justify-center items-center min-h-screen w-full px-5 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1}}
      transition={{ duration: 0.8, ease: "easeInOut", }}
    >
      <div className="max-w-4xl">

        <motion.h1 className='font-medium text-8xl '
         initial={{ opacity: 0, translateY:-50,scale:0.5,skewX:4}}
      animate={{ opacity: 1, scale: 1 ,translateY:0,skewX:0}}
      transition={{ duration: 1, ease: "easeOut", }}>
    Nishant Kumar
        </motion.h1>
       <RotatingText

  texts={['FrontEnd Developer','AI Enthusiast','Tech Junkie','Artist','Photographer','Coffee Nerd']}

  mainClassName="px-2 sm:px-2 md:px-3 text-highlight font-regular font-head md:text-4xl text-2xl overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"

  staggerFrom={"last"}

  initial={{ y: "100%" }}

  animate={{ y: 0 }}

  exit={{ y: "-120%" }}

  staggerDuration={0.025}

  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"

  transition={{ type: "spring", damping: 30, stiffness: 400 }}

  rotationInterval={2500}

/>
        <Button />
      </div>
    </motion.section>
  );
};
