import { useState } from 'react'
import { easeIn, motion, scale } from 'framer-motion'

const Button = () => {
  const [ isHover, setisHover ] = useState(false)
  return (
    <div className='flex justify-center pt-4 gap-3'
    >
      <motion.div className='flex justify-around relative overflow-clip border-1 p-2 rounded-full '
        onMouseEnter={(e) => setisHover(true)}
        onMouseLeave={(e) => setisHover(false)}
        animate={{
          scale: isHover?1.1:1
        }}
        transition={{ease:"easeIn"}}
      >
        <motion.div className='absolute size-2 bg-bright-purple'
          animate={{
            scale: isHover ? 40 : 1,
            opacity: isHover?1:0
          }}
          transition={{duration:.2,
            ease:"easeIn"
          }}></motion.div>
        <motion.a
        className='text-white z-5'
          href="public/resume/resume.pdf" // Make sure your PDF is in the `public` folder
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
