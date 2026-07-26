import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// The particle intake for the Singularity Intake loader: a field of matter that
// spirals inward and is swallowed at the event horizon. The whole point is that
// it gets more violent as the site "falls in" — density, speed and streak length
// all climb with the load progress. One canvas, one rAF loop; progress arrives
// through a ref so a new percentage never re-launches the animation.
//
// Follows the codebase's canvas conventions (see GravityName / FuzzyText):
// DPR-aware sizing, a single cancel-able rAF, and a hard reduced-motion guard
// that paints one still frame instead of animating.

const MAX_PARTICLES = 240;
const BASE_PARTICLES = 70;

const TAU = Math.PI * 2;

// Purple nebula matter, occasionally a green-tinged glitch fleck near the end.
const PURPLE = "154, 112, 245";
const GREEN = "130, 255, 158";

const SingularityField = ({ progress = 0 }) => {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  // Live 0→1 charge, written on every progress change without touching the loop.
  const chargeRef = useRef(0);
  useEffect(() => {
    chargeRef.current = Math.min(1, Math.max(0, progress / 100));
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let maxR = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = width / 2;
      cy = height / 2;
      // Spiral reach: to the far corner so particles stream in from every edge.
      maxR = Math.hypot(width, height) / 2;
    };

    // Polar particle: angle + radius, drifting inward. Angular speed rises as the
    // radius shrinks (spin-up near the core), radial speed accelerates with it.
    const spawn = (p, fromEdge) => {
      p.a = Math.random() * TAU;
      p.r = fromEdge
        ? maxR * (0.75 + Math.random() * 0.35)
        : maxR * Math.random();
      p.spin = (Math.random() * 0.6 + 0.5) * (Math.random() < 0.5 ? 1 : -1);
      p.speed = Math.random() * 0.6 + 0.7;
      p.size = Math.random() * 1.4 + 0.5;
      p.green = Math.random() < 0.08;
      p.pr = p.r; // previous radius, for the trailing streak
      p.pa = p.a;
      return p;
    };

    const particles = Array.from({ length: MAX_PARTICLES }, () =>
      spawn({}, false),
    );

    resize();
    window.addEventListener("resize", resize);

    // Reduced motion: one still frame — a sparse, calm ring of matter, no loop.
    if (reduce) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < BASE_PARTICLES; i++) {
        const p = particles[i];
        const x = cx + Math.cos(p.a) * p.r * 0.6;
        const y = cy + Math.sin(p.a) * p.r * 0.6;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${PURPLE}, 0.25)`;
        ctx.arc(x, y, p.size, 0, TAU);
        ctx.fill();
      }
      return () => window.removeEventListener("resize", resize);
    }

    let rafId = 0;
    const coreR = () => 40 + chargeRef.current * 44; // matches the loader-core size

    const tick = () => {
      const charge = chargeRef.current;
      // Eased chaos: quiet early, snowballing toward the breach.
      const chaos = charge * charge;
      const active = Math.round(BASE_PARTICLES + chaos * (MAX_PARTICLES - BASE_PARTICLES));
      const horizon = coreR();

      // Trails: paint a translucent black wash instead of clearing, so streaks
      // smear toward the core. The wash gets lighter with chaos → longer streaks.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(0, 0, 0, ${0.34 - chaos * 0.16})`;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < active; i++) {
        const p = particles[i];
        p.pr = p.r;
        p.pa = p.a;

        // Gravitational infall: radial pull grows sharply as r → 0; angular spin
        // tightens the closer it gets. Everything scaled by the chaos factor.
        const pull = (1 + (maxR / (p.r + 60)) * 1.6) * p.speed * (0.8 + chaos * 3.2);
        p.r -= pull;
        p.a += (p.spin * (0.004 + (maxR / (p.r + 40)) * 0.012)) * (0.7 + chaos * 1.8);

        if (p.r <= horizon) {
          spawn(p, true); // swallowed → new matter falls in from the rim
          continue;
        }

        const x = cx + Math.cos(p.a) * p.r;
        const y = cy + Math.sin(p.a) * p.r;
        const px = cx + Math.cos(p.pa) * p.pr;
        const py = cy + Math.sin(p.pa) * p.pr;

        // Brighter and hotter the nearer the horizon.
        const near = 1 - Math.min(1, (p.r - horizon) / (maxR - horizon));
        const alpha = 0.12 + near * 0.7;
        const hue = p.green && charge > 0.8 ? GREEN : PURPLE;

        ctx.strokeStyle = `rgba(${hue}, ${alpha})`;
        ctx.lineWidth = p.size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [reduce]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default SingularityField;
