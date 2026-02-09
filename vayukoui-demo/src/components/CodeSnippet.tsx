import { useState, useCallback } from "react";

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export function CodeSnippet({ code, language = "tsx" }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/80 px-3 py-2">
        <span className="text-xs font-medium text-gray-400">{language}</span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium text-gray-300 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-700 hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h2m8 0h2a2 2 0 012 2v2m0 8a2 2 0 01-2 2h-2m-8 0H6m8 0h2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="m-0 overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
