import { motion } from "framer-motion";

export default function Card({
  title,
  desc,
  gitLink,
  liveLink,
  websiteLink,
  variant = "default"
}) {
  // For Projects variant - render with buttons
  if (variant === "project") {
    return (
      <motion.div
        className="relative group"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 0.7, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeOut", delay: 0.4 }
        }}
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(154, 112, 245, 0.15)"
          }}
          whileTap={{ scale: 0.98 }}
          className="relative p-6 rounded-2xl border border-[#454545]/50 backdrop-blur-xl bg-gradient-to-br from-[#9A70F5]/20 to-transparent rounded-bl-2xl group-hover:bg-gradient-to-br group-hover:from-[#1a1a1a]/90 group-hover:via-[#2a2a2a]/70 group-hover:to-[#1a1a1a]/90"
        >
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9A70F5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Project title with enhanced styling */}
          <h2 className="relative font-semibold text-bright-purple text-xl mb-4 group-hover:text-white transition-colors duration-300">
            {title}
          </h2>

          {/* Description with better typography */}
          <p className="relative text-white/90 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
            {desc}
          </p>

          {/* Enhanced button container */}
          <div className="relative flex flex-row gap-3 mt-4">
            {gitLink && (
              <motion.a
                href={gitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-bright-purple border z-2 border-[#9A70F5]/30 rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-[#9A70F5]/10 hover:border-[#9A70F5]/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Github
              </motion.a>
            )}
            {liveLink && (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-white bg-gradient-to-r z-2 from-[#9A70F5] to-[#8B5CF6] rounded-xl px-4 py-2.5 text-sm font-medium hover:from-[#8B5CF6] hover:to-[#7C3AED] hover:shadow-lg hover:shadow-[#9A70F5]/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Live Demo
              </motion.a>
            )}
          </div>


        </motion.div>
      </motion.div>
    );
  }

  // For Uses variant - render as clickable card
  if (variant === "use") {
    return (
      <motion.a
        href={websiteLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          opacity: { duration: 0.7, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeOut", delay: 0.4 }
        }}
        whileHover={{
          scale: 1.02,
          y: -5,
          boxShadow: "0 20px 40px rgba(154, 112, 245, 0.15)"
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative p-6 rounded-2xl border border-[#454545]/50 backdrop-blur-xl bg-gradient-to-br from-[#9A70F5]/20 to-transparent rounded-bl-2xl hover:bg-gradient-to-br hover:from-[#1a1a1a]/90 hover:via-[#2a2a2a]/70 hover:to-[#1a1a1a]/90">
          {/* Glow Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9A70F5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Title */}
          <h2 className="relative font-semibold text-bright-purple text-xl mb-4 group-hover:text-white transition-colors duration-300">
            {title}
          </h2>

          {/* Description */}
          <p className="relative text-white/90 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
            {desc}
          </p>



        </div>
      </motion.a>
    );
  }

  // Default variant (fallback)
  return (
    <motion.div
      className="relative p-6 rounded-2xl border border-[#454545]/50 backdrop-blur-xl bg-gradient-to-br from-[#1a1a1a]/80 via-[#2a2a2a]/60 to-[#1a1a1a]/80"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.7, ease: "easeInOut" },
        y: { duration: 0.6, ease: "easeOut", delay: 0.4 }
      }}
    >
      <h2 className="font-semibold text-bright-purple text-xl mb-4">{title}</h2>
      <p className="text-white/90 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
