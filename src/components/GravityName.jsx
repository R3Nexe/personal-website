import { Fragment, useCallback, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// The hero name is the site's one unrepeated moment, and the whole system is
// built on a single North Star: content behaving as if pulled by a nearby
// gravity well (MagneticButton, TargetCursor's lock-on). Until now the biggest
// element on the page — the name itself — sat inert, outside its own metaphor.
// GravityName makes each glyph feel the pull: as the pointer approaches, letters
// lean toward it and their Nebula-Purple glow blooms with proximity, then spring
// back to a flat, matte rest (The Gravitational Rule — nothing glows until touched).

// Low-mass spring, echoing MagneticButton's { type: spring, mass: 0.1 } so the
// name drifts and returns in the same physical voice as the rest of the system.
const SPRING = { stiffness: 220, damping: 16, mass: 0.16 };

const RADIUS = 190; // px — the gravity well's reach around each glyph
const PULL = 13; // px — the farthest a letter leans toward the pointer
const LIFT = 1.055; // scale on the glyph nearest the pointer

// smoothstep: soft engage/release so the lean eases in from zero, never snaps on.
const smoothstep = (t) => t * t * (3 - 2 * t);

function Letter({ char, register }) {
  const ref = useRef(null);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const glow = useSpring(0, SPRING);

  useEffect(
    () =>
      register({
        getRect: () => ref.current?.getBoundingClientRect(),
        set: (tx, ty, g) => {
          x.set(tx);
          y.set(ty);
          glow.set(g);
        },
      }),
    [register, x, y, glow],
  );

  // A soft purple halo lives on every glyph at rest (per direction); proximity
  // then blooms it brighter and wider, plus a faint lift. A text-shadow, never a
  // gradient fill, so The Flat Rule holds.
  const scale = useTransform(glow, [0, 1], [1, LIFT]);
  const textShadow = useTransform(
    glow,
    (g) =>
      `0 0 ${(8 + 16 * g).toFixed(1)}px rgba(154, 112, 245, ${(0.3 + 0.35 * g).toFixed(3)})`,
  );

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      style={{ x, y, scale, textShadow }}
    >
      {char}
    </motion.span>
  );
}

const GravityName = ({ text, className }) => {
  const reduce = useReducedMotion();
  const registry = useRef(new Map());
  const nextId = useRef(0);
  const rafId = useRef(0);

  // Stable registration so each Letter's effect runs once. Each entry exposes its
  // live rect and a setter into its own springs; the parent's one pointer handler
  // drives them all — 13 glyphs, one listener, rather than a listener per letter.
  const register = useCallback((api) => {
    const id = nextId.current++;
    registry.current.set(id, api);
    return () => registry.current.delete(id);
  }, []);

  useEffect(() => {
    // No cursor to feel the pull on touch, and under reduced-motion the system
    // settles to a still frame (The Reduced-Motion Rule) — the name stays flat.
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let px = 0;
    let py = 0;
    let queued = false;

    // rect reads are batched into one rAF per pointer burst so a fast sweep can't
    // thrash layout with 13 getBoundingClientRect calls per event.
    const apply = () => {
      queued = false;
      registry.current.forEach((api) => {
        const r = api.getRect();
        if (!r) return;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = px - cx;
        const dy = py - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = smoothstep(Math.max(0, 1 - dist / RADIUS));
        if (reach <= 0) {
          api.set(0, 0, 0);
          return;
        }
        api.set((dx / dist) * PULL * reach, (dy / dist) * PULL * reach, reach);
      });
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!queued) {
        queued = true;
        rafId.current = requestAnimationFrame(apply);
      }
    };

    // Pointer gone from the document, or the tab blurs: release the whole name.
    const release = () => registry.current.forEach((api) => api.set(0, 0, 0));

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.addEventListener("pointerleave", release);
    window.addEventListener("blur", release);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.removeEventListener("pointerleave", release);
      window.removeEventListener("blur", release);
    };
  }, [reduce]);

  // Split by word: each word is an inline-block so its glyphs never break mid-word,
  // with real breaking spaces between words so the name still wraps on narrow
  // viewports. The visible glyphs are decorative — the h1 carries the real name
  // via aria-label — so this whole tree is hidden from assistive tech.
  const words = text.split(" ");

  return (
    <span className={className} aria-hidden="true">
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block">
            {Array.from(word).map((char, ci) => (
              <Letter key={ci} char={char} register={register} />
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
};

export default GravityName;
