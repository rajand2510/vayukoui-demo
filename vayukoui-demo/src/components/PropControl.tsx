import type { ReactNode } from "react";

interface PropControlProps {
  label: string;
  children: ReactNode;
  hint?: string;
}

export function PropControl({ label, children, hint }: PropControlProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-600">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
