import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { publicUrl } from "../lib/assets";
import { useState, useEffect, useRef } from "react";

// Error logging utility for video operations
const logVideoError = (context, error, additionalInfo = {}) => {
  const timestamp = new Date().toISOString();
  const errorInfo = {
    timestamp,
    context,
    error: error.message || error,
    stack: error.stack,
    ...additionalInfo
  };

  console.error(`🎥 VIDEO ERROR [${context}]:`, errorInfo);
};

export const VideoBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Reduced motion: hold scale steady so scroll no longer drives a parallax zoom.
  const scaleValue = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 0.5]
  );
  const opacityValue = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(null);

  // Get video URL with error handling
  const videoUrl = publicUrl("videos/smooth.webm");

  // Reduced motion: don't loop the accretion-disk footage. Seek to a
  // representative frame and hold it, so the hero keeps its glow without motion.
  useEffect(() => {
    const video = videoRef.current;
    if (!prefersReducedMotion || !video) return;
    const freeze = () => {
      try {
        if (isFinite(video.duration) && video.duration > 0) {
          video.currentTime = Math.min(2, video.duration / 2);
        }
      } catch {
        /* metadata not ready yet; the loadedmetadata handler retries */
      }
      video.pause();
    };
    video.pause();
    if (video.readyState >= 1) freeze();
    video.addEventListener("loadedmetadata", freeze);
    return () => video.removeEventListener("loadedmetadata", freeze);
  }, [prefersReducedMotion, videoError]);

  useEffect(() => {
    if (!videoUrl) {
      logVideoError('VIDEO_URL_GENERATION', new Error('Failed to generate video URL'), {
        severity: 'HIGH',
        impact: 'Background video will not display',
        videoPath: 'videos/smooth.webm',
        solution: 'Check if video file exists in Supabase storage and verify storage configuration'
      });
      setVideoError('Video file not found');
    }
  }, [videoUrl]);

  const handleVideoError = (event) => {
    const error = event.target.error;
    let errorMessage = 'Unknown video error';
    let severity = 'HIGH';

    if (error) {
      switch (error.code) {
        case error.MEDIA_ERR_ABORTED:
          errorMessage = 'Video loading was aborted';
          severity = 'MEDIUM';
          break;
        case error.MEDIA_ERR_NETWORK:
          errorMessage = 'Network error while loading video';
          severity = 'HIGH';
          break;
        case error.MEDIA_ERR_DECODE:
          errorMessage = 'Video decoding error';
          severity = 'HIGH';
          break;
        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = 'Video format not supported';
          severity = 'HIGH';
          break;
        default:
          errorMessage = `Video error code: ${error.code}`;
      }
    }

    logVideoError('VIDEO_PLAYBACK_ERROR', new Error(errorMessage), {
      severity,
      impact: 'Background video cannot play',
      videoUrl,
      errorCode: error?.code,
      errorMessage: error?.message,
      solution: 'Check video file format (should be .webm), file integrity, and browser compatibility'
    });

    setVideoError(errorMessage);
  };

  const handleVideoLoad = () => {
    console.log('✅ Background video loaded successfully');
  };

  const handleVideoCanPlay = () => {
    console.log('✅ Background video ready to play');
  };

  return (
    <div className="fixed h-screen w-full top-0 left-0 z-[0]">
      {videoError ? (
        // Fallback when the video fails: stay in the Event Horizon world — the
        // void with a faint nebula-purple gravity-well where the disk would be.
        <div
          className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          style={{
            height: '100vh',
            background:
              'radial-gradient(circle at 50% 45%, rgba(154, 112, 245, 0.18), #000000 60%)',
          }}
        >
          <div className="absolute inset-0 bg-black/25"></div>
        </div>
      ) : (
        <motion.video
          ref={videoRef}
          style={{
            scale: scaleValue,
            opacity: opacityValue,
          }}
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{duration:1.2}}
          autoPlay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          muted
          playsInline
          preload="auto"
          className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
        >
          <source src={videoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </motion.video>
      )}
      <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
    </div>
  );
};
