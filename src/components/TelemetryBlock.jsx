import { useEffect, useRef, useState } from "react";
import FuzzyText from "./FuzzyText";

const TYPE_SPEED_MS = 18;
const FUZZ_RANGE = 4;
// FuzzyText pads its canvas by (fuzzRange + 20) on each side so the jitter
// never clips; pull that padding back out so the glyphs sit flush left.
const FUZZ_CANVAS_INSET = FUZZ_RANGE + 20;

// Types out the lines captured at mount once, character by character, then
// hands off to the live `lines` prop so later value updates (the ticking
// clock, viewport resize) render instantly instead of re-triggering typing.
export const TelemetryBlock = ({ lines, className = "" }) => {
  const initialLines = useRef(lines).current;
  const fullText = initialLines.map(([label, value]) => `${label} ${value}`).join("\n");

  const [typedCount, setTypedCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typedCount >= fullText.length) {
      setDone(true);
      return;
    }
    const timeout = setTimeout(() => setTypedCount((c) => c + 1), TYPE_SPEED_MS);
    return () => clearTimeout(timeout);
  }, [typedCount, fullText]);

  if (done) {
    return (
      <div className={`telemetry-block ${className}`} aria-hidden="true">
        {lines.map(([label, value], i) => (
          <div className="telemetry-fuzzy-line" key={i} style={{ marginLeft: -FUZZ_CANVAS_INSET }}>
            <FuzzyText
              fontSize={10}
              fontWeight={400}
              fontFamily="'IBM Plex Mono', monospace"
              color="rgba(234, 234, 234, 0.4)"
              enableHover={false}
              clickEffect={false}
              baseIntensity={0.4}
              fuzzRange={FUZZ_RANGE}
              fps={30}
            >
              {`${label} ${value}`}
            </FuzzyText>
          </div>
        ))}
      </div>
    );
  }

  const typedLines = fullText.slice(0, typedCount).split("\n");

  return (
    <div className={`telemetry-block ${className}`} aria-hidden="true">
      {typedLines.map((line, i) => (
        <p key={i}>
          {line}
          {i === typedLines.length - 1 && <span className="telemetry-cursor" />}
        </p>
      ))}
    </div>
  );
};

export default TelemetryBlock;
