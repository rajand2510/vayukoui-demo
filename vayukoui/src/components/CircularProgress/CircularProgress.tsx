import type { CircularProgressProps } from "./CircularProgress.types";

export default function CircularProgress({
  value,
  max = 100,
  color,
  label = "Status",
  subLabel,
  size = 120,
  strokeWidth = 8,
  className = "",
  "aria-label": ariaLabel,
}: CircularProgressProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const percent = max <= 0 ? 0 : (clamped / max) * 100;
  const r = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  const style = {
    ...(color && { "--vk-circular-progress-color": color } as React.CSSProperties),
    ["--vk-circular-progress-size" as string]: `${size}px`,
    ["--vk-circular-progress-stroke" as string]: `${strokeWidth}px`,
  } as React.CSSProperties;

  const displaySub = subLabel ?? (max !== 100 ? `${clamped} of ${max}` : `${Math.round(percent)}%`);

  return (
    <div
      className={`vk-circular-progress ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel ?? (subLabel ? `${label} ${subLabel}` : label)}
    >
      <svg
        className="vk-circular-progress-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden
      >
        <circle
          className="vk-circular-progress-track"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
        />
        <circle
          className="vk-circular-progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="vk-circular-progress-content">
        <span className="vk-circular-progress-label">{label}</span>
        <span className="vk-circular-progress-sublabel">{displaySub}</span>
      </div>
    </div>
  );
}
