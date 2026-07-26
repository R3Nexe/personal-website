import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
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

  // Cockpit turbulence: a jittery buffeting of the whole backdrop, as if the
  // craft is rattling under gravitational stress near the accretion disk. The
  // offset SNAPS to a fresh random value every STEP ms (rather than easing) so
  // it reads as a hard vibration, not a smooth float. Applied to an oversized
  // wrapper (below) so the jitter never exposes the void behind the video.
  const shakeX = useMotionValue(0);
  const shakeY = useMotionValue(0);
  const shakeRot = useMotionValue(0);

  useEffect(() => {
    // Reduced motion: hold perfectly still — no gravitational buffeting.
    if (prefersReducedMotion) return;

    const AMP = 2; // px — peak positional jolt
    const ROT = 0.3; // deg — peak rotational jolt
    const STEP = 50; // ms between jolts — lower = more frantic
    const rand = (m) => (Math.random() * 2 - 1) * m;

    let raf = 0;
    let last = -Infinity;

    const loop = (t) => {
      if (t - last >= STEP) {
        last = t;
        shakeX.set(rand(AMP));
        shakeY.set(rand(AMP));
        shakeRot.set(rand(ROT));
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [prefersReducedMotion, shakeX, shakeY, shakeRot]);

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
    <div className="fixed h-screen w-full top-0 left-0 z-[0] overflow-hidden">
      {/* Oversized so the cockpit turbulence (x / y / rotate) can drift without
          ever revealing the black void behind the backdrop. */}
      <motion.div
        className="absolute -inset-[2.5%]"
        style={{ x: shakeX, y: shakeY, rotate: shakeRot }}
      >
        {videoError ? (
          // Fallback when the video fails: stay in the Event Horizon world — the
          // void with a faint nebula-purple gravity-well where the disk would be.
          <div
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2"
            style={{
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
      </motion.div>
      <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
    </div>
  );
};
