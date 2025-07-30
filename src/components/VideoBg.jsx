import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
export const VideoBackground = ({ children }) => {
    const videoRef=useRef(null);
    useEffect(()=>{
    if (videoRef.current){
        videoRef.current.playbackRate=1 // this is to change the playback speed of the background video
    }
},[])
  return (
    <div className="relative h-screen w-full">
      <motion.video
      initial={{scale:1.2, opacity:0}}
    animate={{scale:1,opacity:1}}
    transition={{duration:1,ease:'easeOut'}}
      ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 z-[1] md:h-full h-[30vh] w-full object-cover"
      >
        <source
          src="./public/videos/vid.mp4"
        />
        Your browser does not support the video tag.
      </motion.video>
     <div className="fixed top-0 left-0 z-2 h-full w-full bg-black/65"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
