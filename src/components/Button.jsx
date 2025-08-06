import { useState } from 'react'
import { motion } from 'framer-motion'

const Button = () => {
  const [isHover, setisHover] = useState(false)
  return (
    <div className='flex justify-center pt-3'>
      <motion.div className='flex relative overflow-clip border-1 p-2 rounded-full '
        onMouseEnter={(e) => setisHover(true)}
        onMouseLeave={(e) => setisHover(false)}
        animate={{
          scale: isHover ? 1.1 : 1
        }}
        transition={{ ease: "easeIn" }}
      >
        <motion.div className='absolute size-2 bg-bright-purple rounded-full'
          initial={{ opacity: 0 }}
          animate={{
            width: isHover ? 40 : 0,
            scale: isHover ? 40 : 1,
            opacity: isHover ? 1 : 1,
          }}
          transition={{
            duration: .5,
            ease: "easeInOut"
          }}></motion.div>
        <motion.a
          className='text-white z-5 '
          href="/resume/webdevResume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Resume
        </motion.a>
      </motion.div>
    </div>
  )
}

export default Button
