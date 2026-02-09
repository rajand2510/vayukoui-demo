import type { StepperProps, StepperStep } from "./Stepper.types";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Stepper({
  steps,
  currentStep,
  variant = "dots",
  color,
  inactiveColor = "#d1d5db",
  onStepClick,
  clickable = false,
  className = "",
  "aria-label": ariaLabel,
}: StepperProps) {
  const style = {
    ...(color && { "--vk-stepper-color": color } as React.CSSProperties),
    ...(inactiveColor && { "--vk-stepper-inactive": inactiveColor } as React.CSSProperties),
    ...(variant === "fill" && {
      ["--vk-stepper-fill-step" as string]: currentStep,
      ["--vk-stepper-steps" as string]: steps.length,
    } as React.CSSProperties),
  };

  const getStatus = (index: number): "completed" | "current" | "upcoming" => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "current";
    return "upcoming";
  };

  const handleStepClick = (index: number) => {
    if (clickable) onStepClick?.(index);
  };

  const isInteractive = clickable && !!onStepClick;

  return (
    <nav
      className={`vk-stepper vk-stepper--${variant} ${className}`.trim()}
      style={style}
      aria-label={ariaLabel ?? "Progress"}
    >
      <ol className="vk-stepper-list" role="list">
        {steps.map((step: StepperStep, index: number) => {
          const status = getStatus(index);
          return (
            <li
              key={step.id}
              className={`vk-stepper-item vk-stepper-item--${status} ${isInteractive ? "vk-stepper-item--clickable" : ""}`}
            >
              {index > 0 && <span className="vk-stepper-connector" aria-hidden />}
              <button
                type="button"
                className="vk-stepper-marker"
                onClick={() => handleStepClick(index)}
                disabled={!isInteractive}
                aria-current={status === "current" ? "step" : undefined}
                aria-label={`${step.label}, ${status === "completed" ? "completed" : status === "current" ? "current step" : "not started"}`}
              >
                {variant === "dots" && <span className="vk-stepper-dot" aria-hidden />}
                {(variant === "icons" || variant === "vertical") && (
                  <span className="vk-stepper-squircle" aria-hidden>
                    {status === "completed" ? (
                      <CheckIcon className="vk-stepper-check" />
                    ) : step.icon != null ? (
                      <span className="vk-stepper-icon-wrap">{step.icon}</span>
                    ) : (
                      <span className="vk-stepper-squircle-inner" aria-hidden />
                    )}
                  </span>
                )}
                {variant === "shapes" && (
                  <span className={`vk-stepper-shape ${step.highlight ? "vk-stepper-shape--diamond" : ""}`} aria-hidden />
                )}
                {variant === "segmented" && <span className="vk-stepper-segment-label">{step.label}</span>}
                {variant === "underline" && <span className="vk-stepper-label">{step.label}</span>}
              </button>
              {(variant === "dots" || variant === "shapes" || variant === "icons" || variant === "vertical") && (
                <div className="vk-stepper-content">
                  <span className="vk-stepper-label">{step.label}</span>
                  {step.description && <span className="vk-stepper-description">{step.description}</span>}
                </div>
              )}
              {variant === "fill" && <span className="vk-stepper-label">{step.label}</span>}
              {variant === "segmented" && <span className="vk-stepper-segment-label-bottom">{step.label}</span>}
            </li>
          );
        })}
      </ol>
      {variant === "fill" && <div className="vk-stepper-fill-track" aria-hidden />}
    </nav>
  );
}
