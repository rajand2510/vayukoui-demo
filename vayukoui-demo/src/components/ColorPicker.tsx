import { useCallback } from "react";

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  className?: string;
  "aria-label"?: string;
}

const VALID_HEX = /^#[0-9A-Fa-f]{6}$/;

export function ColorPicker({ value, onChange, className = "", "aria-label": ariaLabel }: ColorPickerProps) {
  const pickerValue = VALID_HEX.test(value) ? value : "#000000";

  const handleColorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      if (v && v.startsWith("#")) onChange(v);
    },
    [onChange]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value.trim();
      if (v && !v.startsWith("#")) v = "#" + v;
      if (v === "#" || v === "") v = "#000000";
      onChange(v);
    },
    [onChange]
  );

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div className="flex h-10 w-14 shrink-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
        <input
          type="color"
          value={pickerValue}
          onChange={handleColorChange}
          className="h-full w-full cursor-pointer border-0 p-0"
          aria-label={ariaLabel ? `${ariaLabel} color picker` : "Color picker"}
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleTextChange}
        className="demo-input font-mono flex-1 min-w-0 max-w-[10rem]"
        placeholder="#000000"
        aria-label={ariaLabel}
      />
    </div>
  );
}
