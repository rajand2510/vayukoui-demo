import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  children,
  variant = "primary",
  style,
  ...rest
}: Props) {
  const bg =
    variant === "primary"
      ? "var(--vk-color-primary)"
      : "var(--vk-color-surface)";

  const color =
    variant === "primary"
      ? "#fff"
      : "var(--vk-color-text-primary)";

  return (
    <button
      {...rest}
      style={{
        background: bg,
        color,
        padding: "10px 18px",
        borderRadius: "var(--vk-radius-md)",
        border: "1px solid var(--vk-color-border)",
        cursor: "pointer",
        transition: "all .2s ease",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
