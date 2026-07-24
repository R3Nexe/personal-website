export const TelemetryBlock = ({ lines, className = "" }) => (
  <div className={`telemetry-block ${className}`} aria-hidden="true">
    {lines.map(([label, value], i) => (
      <p key={i}>
        <span className="telemetry-label">{label}</span> {value}
      </p>
    ))}
  </div>
);

export default TelemetryBlock;
