import { useState } from "react";

export function useControlled<T>({
  controlled,
  defaultValue,
}: {
  controlled: T | undefined;
  defaultValue: T;
}) {
  const [valueState, setValue] = useState(defaultValue);

  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : valueState;

  const set = (v: T) => {
    if (!isControlled) setValue(v);
  };

  return [value, set] as const;
}
