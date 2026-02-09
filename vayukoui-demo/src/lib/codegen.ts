/** Escape string for use as JSX children in code snippet (no quotes/newlines => plain, else JSON) */
export function jsxStr(s: string): string {
  if (!s) return '""';
  if (!/[\n"\\]/.test(s)) return s;
  return `{${JSON.stringify(s)}}`;
}

export function jsxAttrStr(s: string): string {
  return JSON.stringify(s);
}
