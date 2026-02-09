import type { LinearProgressProps } from "./LinearProgress.types";

export default function LinearProgress({
  value,
  max = 100,
  color,
  trackColor,
  label,
  statusMessage,
  showValue = false,
  height = 8,
  rounded = true,
  className = "",
  "aria-label": ariaLabel,
}: LinearProgressProps) {
  const clamped = Math.min(max, Math.max(0, value));
  const percent = max <= 0 ? 0 : (clamped / max) * 100;

  const style = {
    ...(color && { "--vk-linear-progress-color": color } as React.CSSProperties),
    ...(trackColor && { "--vk-linear-progress-track": trackColor } as React.CSSProperties),
    ["--vk-linear-progress-height" as string]: `${height}px`,
    ["--vk-linear-progress-fill-width" as string]: percent,
  } as React.CSSProperties;

  return (
    <div
      className={`vk-linear-progress ${rounded ? "vk-linear-progress--rounded" : ""} ${className}`.trim()}
      style={style}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel ?? label ?? "Progress"}
    >
      {label && <div className="vk-linear-progress-label">{label}</div>}
      <div className="vk-linear-progress-track">
        <div className="vk-linear-progress-fill" style={{ width: `${percent}%` }} />
        {rounded && percent > 0 && percent < 100 && <span className="vk-linear-progress-thumb" aria-hidden />}
      </div>
      {(showValue || statusMessage) && (
        <div className="vk-linear-progress-meta">
          {showValue && <span className="vk-linear-progress-value">{Math.round(percent)}%</span>}
          {statusMessage && <span className="vk-linear-progress-status">{statusMessage}</span>}
        </div>
      )}
    </div>
  );
}
