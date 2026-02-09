import { useState } from "react";
import { Stepper, LinearProgress, CircularProgress } from "@vayuko/ui";
import type { StepperStep, StepperVariant } from "@vayuko/ui";
import { PageLayout } from "../components/PageLayout";
import { PropControl } from "../components/PropControl";
import { ColorPicker } from "../components/ColorPicker";

const DEFAULT_STEPS: StepperStep[] = [
  { id: "plan", label: "Plan" },
  { id: "account", label: "Account" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation" },
  { id: "review", label: "Review" },
];

const STEPS_WITH_SHAPE: StepperStep[] = [
  { id: "plan", label: "Plan" },
  { id: "account", label: "Account" },
  { id: "payment", label: "Payment" },
  { id: "confirmation", label: "Confirmation", highlight: true },
  { id: "review", label: "Review" },
];

const ICON_PLAN = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const ICON_ACCOUNT = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const ICON_PAYMENT = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <path d="M1 10h22" />
  </svg>
);
const ICON_CONFIRM = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);
const ICON_REVIEW = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

const STEPS_WITH_ICONS: StepperStep[] = [
  { id: "plan", label: "Plan", icon: ICON_PLAN },
  { id: "account", label: "Account", icon: ICON_ACCOUNT },
  { id: "payment", label: "Payment", icon: ICON_PAYMENT },
  { id: "confirmation", label: "Confirmation", icon: ICON_CONFIRM },
  { id: "review", label: "Review", icon: ICON_REVIEW },
];

const STEPS_WITH_DESCRIPTION: StepperStep[] = [
  { id: "s1", label: "Step 1", description: "Explain your step here." },
  { id: "s2", label: "Step 2", description: "Add details for this step." },
  { id: "s3", label: "Step 3", description: "Current step description." },
  { id: "s4", label: "Step 4", description: "Upcoming step." },
  { id: "s5", label: "Step 5", description: "Final step." },
];

export default function ProgressPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [stepperVariant, setStepperVariant] = useState<StepperVariant>("dots");
  const [stepperColor, setStepperColor] = useState("#3b82f6");
  const [linearValue, setLinearValue] = useState(65);
  const [linearColor, setLinearColor] = useState("#3b82f6");
  const [linearLabel, setLinearLabel] = useState("Your progress");
  const [linearStatus, setLinearStatus] = useState("Payment in progress");
  const [circularValue, setCircularValue] = useState(1);
  const [circularMax, setCircularMax] = useState(4);
  const [circularColor, setCircularColor] = useState("#3b82f6");
  const [clickable, setClickable] = useState(true);

  const steps =
    stepperVariant === "icons"
      ? STEPS_WITH_ICONS
      : stepperVariant === "vertical"
        ? STEPS_WITH_DESCRIPTION
        : stepperVariant === "shapes"
          ? STEPS_WITH_SHAPE
          : DEFAULT_STEPS;
  const stepCount = steps.length;

  const code = `const steps = ${JSON.stringify(DEFAULT_STEPS.slice(0, 3).map((s) => ({ id: s.id, label: s.label })))};
const [currentStep, setCurrentStep] = useState(0);

<Stepper
  steps={steps}
  currentStep={currentStep}
  variant="${stepperVariant}"
  color="${stepperColor}"
  clickable={${clickable}}
  onStepClick={setCurrentStep}
  aria-label="Progress"
/>

<LinearProgress value={${linearValue}} max={100} color="${linearColor}" label="${linearLabel}" statusMessage="${linearStatus}" />
<CircularProgress value={${circularValue}} max={${circularMax}} color="${circularColor}" label="Status" />`;

  return (
    <PageLayout
      title="Progress"
      description="Stepper (step indicators), linear progress bar, and circular progress. Use variant 'icons' and pass your own icon per step (steps[].icon: SVG, img, or any React node). Icons inherit step color when they use currentColor."
      code={code}
      preview={
        <div className="space-y-10 max-w-2xl">
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Stepper — {stepperVariant}</h3>
            <Stepper
              steps={steps}
              currentStep={Math.min(currentStep, stepCount - 1)}
              variant={stepperVariant}
              color={stepperColor}
              clickable={clickable}
              onStepClick={setCurrentStep}
              aria-label="Step progress"
            />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Linear progress</h3>
            <LinearProgress
              value={linearValue}
              max={100}
              color={linearColor}
              label={linearLabel || undefined}
              statusMessage={linearStatus || undefined}
              showValue
            />
          </section>
          <section>
            <h3 className="text-sm font-semibold text-slate-600 mb-3">Circular progress</h3>
            <div className="flex flex-wrap gap-6 items-start">
              <CircularProgress
                value={circularValue}
                max={circularMax}
                color={circularColor}
                label="Status"
                size={100}
                strokeWidth={6}
              />
              <CircularProgress value={1} max={4} color="#ef4444" label="Status" size={100} strokeWidth={6} />
              <CircularProgress value={2} max={4} color="#eab308" label="Status" size={100} strokeWidth={6} />
            </div>
          </section>
        </div>
      }
      props={
        <>
          <PropControl label="Current step">
            <input
              type="range"
              className="w-full"
              min={0}
              max={stepCount - 1}
              value={Math.min(currentStep, stepCount - 1)}
              onChange={(e) => setCurrentStep(Number(e.target.value))}
            />
            <span className="text-sm text-slate-500">{Math.min(currentStep, stepCount - 1) + 1} of {stepCount}</span>
          </PropControl>
          <PropControl
            label="Stepper variant"
            hint={stepperVariant === "icons" ? "Add your own icon per step: steps[].icon = <YourSVG />. Use stroke=\"currentColor\" or fill=\"currentColor\" so the icon follows step color." : undefined}
          >
            <select
              className="demo-select w-full"
              value={stepperVariant}
              onChange={(e) => setStepperVariant(e.target.value as StepperVariant)}
            >
              <option value="dots">Dots</option>
              <option value="shapes">Shapes</option>
              <option value="segmented">Segmented</option>
              <option value="fill">Fill bar</option>
              <option value="underline">Underline</option>
              <option value="icons">Icons (squircle + checkmark when completed)</option>
              <option value="vertical">Vertical</option>
            </select>
          </PropControl>
          <PropControl label="Stepper color">
            <ColorPicker value={stepperColor} onChange={setStepperColor} aria-label="Stepper color" />
          </PropControl>
          <PropControl label="Clickable steps">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="demo-checkbox"
                checked={clickable}
                onChange={(e) => setClickable(e.target.checked)}
              />
              <span className="text-sm">Allow step click to navigate</span>
            </label>
          </PropControl>
          <PropControl label="Linear value">
            <input
              type="range"
              className="w-full"
              min={0}
              max={100}
              value={linearValue}
              onChange={(e) => setLinearValue(Number(e.target.value))}
            />
            <span className="text-sm text-slate-500">{linearValue}%</span>
          </PropControl>
          <PropControl label="Linear color">
            <ColorPicker value={linearColor} onChange={setLinearColor} aria-label="Linear progress color" />
          </PropControl>
          <PropControl label="Linear label">
            <input
              type="text"
              className="demo-input"
              value={linearLabel}
              onChange={(e) => setLinearLabel(e.target.value)}
              placeholder="Your progress"
            />
          </PropControl>
          <PropControl label="Status message">
            <input
              type="text"
              className="demo-input"
              value={linearStatus}
              onChange={(e) => setLinearStatus(e.target.value)}
              placeholder="Payment in progress"
            />
          </PropControl>
          <PropControl label="Circular value (step)">
            <input
              type="number"
              className="demo-input w-20"
              min={0}
              max={circularMax}
              value={circularValue}
              onChange={(e) => setCircularValue(Number(e.target.value))}
            />
          </PropControl>
          <PropControl label="Circular max">
            <input
              type="number"
              className="demo-input w-20"
              min={1}
              value={circularMax}
              onChange={(e) => setCircularMax(Number(e.target.value))}
            />
          </PropControl>
          <PropControl label="Circular color">
            <ColorPicker value={circularColor} onChange={setCircularColor} aria-label="Circular progress color" />
          </PropControl>
        </>
      }
    />
  );
}
