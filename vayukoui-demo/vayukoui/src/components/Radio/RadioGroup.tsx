import { useState } from "react";
import type { RadioGroupProps } from "./Radio.types";

export default function RadioGroup({
  name,
  options,
  value: valueProp,
  defaultValue,
  onChange,
  variant = "default",
  disabled = false,
  color,
  className = "",
  "aria-label": ariaLabel,
}: RadioGroupProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const selected = valueProp ?? value;

  const handleChange = (v: string) => {
    if (valueProp === undefined) setValue(v);
    onChange?.(v);
  };

  const accentStyle = color ? { "--vk-radio-accent": color } as React.CSSProperties : undefined;

  return (
    <div
      className={`vk-radio-group vk-radio-group--${variant} ${disabled ? "vk-radio-group--disabled" : ""} ${className}`.trim()}
      role="radiogroup"
      aria-label={ariaLabel ?? name}
      style={accentStyle}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`vk-radio-option vk-radio-option--${variant} ${selected === opt.value ? "vk-radio-option--selected" : ""}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => handleChange(opt.value)}
            disabled={disabled}
            className="vk-radio-input"
          />
          <span className="vk-radio-dot" aria-hidden />
          <span className="vk-radio-label">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
