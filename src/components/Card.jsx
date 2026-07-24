import { motion } from "framer-motion";

// Error logging utility for Card component
const logCardError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`🃏 CARD ERROR [${context}]:`, errorInfo);
};

export default function Card({
  title,
  desc,
  gitLink,
  liveLink,
  websiteLink,
  tag,
  variant = "default"
}) {
  // Validate required props
  if (!title) {
    logCardError('MISSING_TITLE', new Error('Card component missing required title prop'), {
      severity: 'HIGH',
      impact: 'Card will not display properly',
      props: { title, desc, gitLink, liveLink, websiteLink, variant },
      solution: 'Provide a title prop to the Card component'
    });
  }

  if (!desc) {
    logCardError('MISSING_DESCRIPTION', new Error('Card component missing required desc prop'), {
      severity: 'MEDIUM',
      impact: 'Card description will be empty',
      props: { title, desc, gitLink, liveLink, websiteLink, variant },
      solution: 'Provide a desc prop to the Card component'
    });
  }

  // Validate URLs if provided
  if (gitLink && typeof gitLink !== 'string') {
    logCardError('INVALID_GIT_LINK', new Error('gitLink prop is not a string'), {
      severity: 'MEDIUM',
      impact: 'GitHub link may not work',
      gitLinkValue: gitLink,
      gitLinkType: typeof gitLink,
      solution: 'gitLink should be a valid URL string'
    });
  }

  if (liveLink && typeof liveLink !== 'string') {
    logCardError('INVALID_LIVE_LINK', new Error('liveLink prop is not a string'), {
      severity: 'MEDIUM',
      impact: 'Live demo link may not work',
      liveLinkValue: liveLink,
      liveLinkType: typeof liveLink,
      solution: 'liveLink should be a valid URL string'
    });
  }

  if (websiteLink && typeof websiteLink !== 'string') {
    logCardError('INVALID_WEBSITE_LINK', new Error('websiteLink prop is not a string'), {
      severity: 'MEDIUM',
      impact: 'Website link may not work',
      websiteLinkValue: websiteLink,
      websiteLinkType: typeof websiteLink,
      solution: 'websiteLink should be a valid URL string'
    });
  }
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
          {/* Target-lock corners */}
          <span className="card-target card-target--tl" />
          <span className="card-target card-target--br" />
          {tag && <span className="card-tag">{tag}</span>}

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
                className="btn-bracket btn-bracket--ghost z-2 flex-1 justify-center"
                whileTap={{ scale: 0.98 }}
              >
                <span className="btn-bracket-corner" />
                Github
              </motion.a>
            )}
            {liveLink && (
              <motion.a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-bracket btn-bracket--primary z-2 flex-1 justify-center"
                whileTap={{ scale: 0.98 }}
              >
                <span className="btn-bracket-corner" />
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
        className="block group"
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
        <div className="relative p-6 rounded-2xl border border-[#454545]/50 backdrop-blur-xl bg-gradient-to-br from-[#9A70F5]/20 to-transparent rounded-bl-2xl group-hover:bg-gradient-to-br group-hover:from-[#1a1a1a]/90 group-hover:via-[#2a2a2a]/70 group-hover:to-[#1a1a1a]/90">
          {/* Glow Overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#9A70F5]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Target-lock corners */}
          <span className="card-target card-target--tl" />
          <span className="card-target card-target--br" />
          {tag && <span className="card-tag">{tag}</span>}

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
      className="relative group p-6 rounded-2xl border border-[#454545]/50 backdrop-blur-xl bg-gradient-to-br from-[#1a1a1a]/80 via-[#2a2a2a]/60 to-[#1a1a1a]/80"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 0.7, ease: "easeInOut" },
        y: { duration: 0.6, ease: "easeOut", delay: 0.4 }
      }}
    >
      {/* Target-lock corners */}
      <span className="card-target card-target--tl" />
      <span className="card-target card-target--br" />
      {tag && <span className="card-tag">{tag}</span>}
      <h2 className="font-semibold text-bright-purple text-xl mb-4">{title}</h2>
      <p className="text-white/90 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}
