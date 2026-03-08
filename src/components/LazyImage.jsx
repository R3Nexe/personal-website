import { useState } from "react";
import { motion } from "framer-motion";

export const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden w-full rounded-xl bg-white/5 ${!isLoaded ? "min-h-[200px] md:min-h-[300px]" : ""} ${className}`}>
      {/* Skeleton / Placeholder */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundColor: ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.05)"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Subtle loading indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-[#9A70F5] border-t-transparent rounded-full animate-spin"></div>
        </motion.div>
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto block transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};
