import type { TabsProps } from "./Tabs.types";

export default function Tabs({
  tabs,
  value,
  onChange,
  variant = "filled",
  iconPosition = "none",
  color,
  className = "",
  "aria-label": ariaLabel,
}: TabsProps) {
  const style = color ? ({ "--vk-tabs-color": color } as React.CSSProperties) : undefined;

  return (
    <div
      className={`vk-tabs vk-tabs--${variant} vk-tabs--icon-${iconPosition} ${className}`.trim()}
      style={style}
      role="tablist"
      aria-label={ariaLabel ?? "Tabs"}
    >
      {tabs.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`vk-tabs-tab ${isActive ? "vk-tabs-tab--active" : ""}`}
            onClick={() => onChange(tab.id)}
          >
            {iconPosition !== "none" && tab.icon && (
              <span className="vk-tabs-icon">{tab.icon}</span>
            )}
            <span className="vk-tabs-label">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
