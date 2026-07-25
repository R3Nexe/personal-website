
import { motion } from 'framer-motion';

const SocialIcon = ({ href, src, alt, className }) => {
  return (
    <motion.a
      href={href}
      target="_blank" // Opens the link in a new tab
      rel="noopener noreferrer" // Security measure for external links
      aria-label={alt} // accessible name for the link (icon-only otherwise)
      // Animation props
      whileHover={{ y: -2, scale: 1.1 }} // Moves up slightly and scales up on hover
      whileTap={{ scale: 0.9 }} // Scales down on click/tap
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      <img
        src={src}
        alt="" // decorative — the link carries the accessible name via aria-label
        className={className} // Adjust size with Tailwind as needed
        onError={() => console.error("Image failed to load:", src)}
      />
    </motion.a>
  );
};

export default SocialIcon;
