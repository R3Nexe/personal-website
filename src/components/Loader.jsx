import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SingularityField from "./SingularityField";

// "Singularity Intake" — the site loads as if being pulled into a black hole.
// The progress state machine below is unchanged from the original loader (hold at
// 90% until window.load, 3s hard cap, 0.6s beat at 100%); only the visuals are new.
// A single `charge` (progress/100) drives every layer, and an eased `chaos` makes
// the whole scene judder harder the closer it gets to breaching the horizon.

const Loader = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    let isLoaded = document.readyState === "complete";
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(100);
      clearInterval(interval);
      clearTimeout(maxWaitTimer);
      setTimeout(() => setLoading(false), 600); // 0.6s delay at 100%
    };

    // Fallback if load event hasn't fired yet
    const handleLoad = () => {
      isLoaded = true;
    };

    window.addEventListener("load", handleLoad);

    // Hard cap: never let a slow resource (e.g. the background video)
    // hold the loader hostage past what a visitor will tolerate.
    const maxWaitTimer = setTimeout(finish, 3000);

    let progressValue = 0;
    const interval = setInterval(() => {
      // randomly increment progress
      progressValue += Math.floor(Math.random() * 15) + 5;

      if (progressValue >= 90) {
        if (isLoaded) {
          finish();
        } else {
          progressValue = 90; // hold at 90% until fully loaded, or capped
          setProgress(90);
        }
      } else {
        setProgress(progressValue);
      }
    }, 200);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearInterval(interval);
      clearTimeout(maxWaitTimer);
    };
  }, [setLoading]);

  // Prevent scrolling while loader is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const charge = progress / 100;
  const chaos = charge * charge; // eased: calm early, snowballing near the breach
  const breaching = progress >= 100;

  // Live telemetry + chaos-scaled CSS vars. Under reduced motion the CSS looping
  // animations are already neutralised globally, so the scene renders as a still,
  // legible frame — no tremor, no glitch, no particle loop.
  const stageVars = useMemo(
    () =>
      reduce
        ? {}
        : {
            "--amp": (chaos * 4).toFixed(2),
            "--tremor-speed": `${(0.16 - chaos * 0.1).toFixed(3)}s`,
          },
    [chaos, reduce],
  );

  const CORE_MAX = 168; // px — fixed DOM box; growth is transform: scale below
  const coreSize = 80 + charge * 88; // 80 → 168px visual, matches SingularityField horizon
  const ringGlow = reduce
    ? "0 0 24px 4px rgba(154, 112, 245, 0.4)"
    : `0 0 ${(20 + charge * 60).toFixed(0)}px ${(4 + charge * 16).toFixed(
        0,
      )}px rgba(154, 112, 245, ${(0.3 + charge * 0.5).toFixed(2)})`;

  const schwarzschild = (charge * 0.5).toFixed(2);
  const status = breaching
    ? "HORIZON_BREACHED"
    : progress >= 90
      ? "INTAKE_SEQUENCING"
      : "MASS_INFALL";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Gravitationally lensed HUD grid, breathing faster as it collapses */}
      <div
        className="loader-grid-warp"
        style={
          reduce ? undefined : { "--warp-speed": `${(9 - chaos * 5).toFixed(1)}s`, "--chaos": chaos.toFixed(3) }
        }
      />

      {/* Inward-spiralling matter */}
      <SingularityField progress={progress} />

      {/* Pinned HUD chrome — steady instruments reading a wild core */}
      <div className="hud-corner hud-corner--tl" />
      <div className="hud-corner hud-corner--tr" style={{ animationDelay: "1.7s" }} />
      <div className="hud-corner hud-corner--bl" style={{ animationDelay: "3.4s" }} />
      <div className="hud-corner hud-corner--br" style={{ animationDelay: "5.1s" }} />

      <div className="loader-telemetry top-8 left-8 md:top-12 md:left-12 text-left text-[#EAEAEA]/45">
        <p>EVENT_HORIZON // SINGULARITY_BREACH</p>
        <p>STATUS: {status}</p>
        <p>
          MASS_ACQUIRED:{" "}
          <span className="text-bright-purple">{Math.round(progress)}%</span>
        </p>
        <p>
          SCHWARZSCHILD_R:{" "}
          <span className="text-bright-purple">{schwarzschild}c</span>
        </p>
        <p>
          VOID_ECHO: {breaching ? "CASCADING" : "STABLE"}
          <span className="loader-cursor" />
        </p>
      </div>

      {/* Central stage — this is what trembles */}
      <div className="loader-stage relative z-10 flex flex-col items-center justify-center" style={stageVars}>
        <div className="relative flex items-center justify-center">
          {/* Faint accretion shells */}
          <div className="absolute h-[400px] w-[400px] rounded-full border border-white/5 opacity-20" />
          <div className="absolute h-[600px] w-[600px] rounded-full border border-white/5 opacity-10" />

          {/* Dashed intake streaks */}
          <svg
            className="absolute h-[500px] w-[500px] rotate-45 opacity-20"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <path d="M50 0 A50 50 0 0 1 100 50" fill="none" stroke="#9A70F5" strokeWidth="0.2" strokeDasharray="1 4" />
            <path d="M50 100 A50 50 0 0 1 0 50" fill="none" stroke="#9A70F5" strokeWidth="0.2" strokeDasharray="1 4" />
          </svg>

          {/* The singularity */}
          <div
            className="loader-core flex items-center justify-center"
            style={{
              width: CORE_MAX,
              height: CORE_MAX,
              transform: `scale(${(coreSize / CORE_MAX).toFixed(3)})`,
            }}
          >
            <div
              className="loader-lensing-ring"
              style={{
                boxShadow: ringGlow,
                borderColor: `rgba(154, 112, 245, ${(0.5 + charge * 0.5).toFixed(2)})`,
                ...(reduce ? {} : { "--ring-speed": `${(10 - chaos * 6).toFixed(1)}s`, "--chaos": chaos.toFixed(3) }),
              }}
            />
          </div>

          {/* Big Orbitron readout, offset beside the core (stacked under md) */}
          <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 md:left-full md:top-1/2 md:ml-8 md:mt-0 md:-translate-x-0 md:-translate-y-1/2">
            <span
              className="loader-percent text-6xl md:text-7xl"
              style={reduce ? undefined : { "--glitch-speed": `${(5 - chaos * 4).toFixed(1)}s`, "--chaos": chaos.toFixed(3) }}
            >
              {Math.round(progress)}
              <span className="align-super text-2xl text-bright-purple">%</span>
            </span>
          </div>
        </div>
      </div>

      {/* Status line */}
      <div className="absolute bottom-[18%] z-10 flex flex-col items-center">
        <motion.div
          className="font-sub-head text-sm uppercase tracking-[0.4em] text-[#EAEAEA]"
          animate={reduce ? undefined : { opacity: [0.35, 0.85, 0.35] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {breaching ? "Entering Site" : "Materialising Site"}
        </motion.div>
        <div className="mt-4 h-px w-12 bg-bright-purple opacity-50" />
      </div>

      {/* Bottom-right system readout (static telemetry) */}
      <div className="loader-telemetry bottom-8 right-8 md:bottom-12 md:right-12 hidden text-right text-[#EAEAEA]/20 sm:block">
        <p>SYS.NEBULA_ENGINE_CORE V2.0.4</p>
        <p>GRAVITY_VAR 9.80665 m/s²</p>
      </div>

      {/* Terminal white-out at the moment of breach (skipped under reduced motion) */}
      {breaching && !reduce && <div className="loader-flash" />}
    </motion.div>
  );
};

export default Loader;
