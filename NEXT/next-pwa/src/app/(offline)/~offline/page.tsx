"use client";

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-100 p-6 dark:bg-zinc-900">
      <div className="rounded-full bg-amber-100 p-4 dark:bg-amber-900/30">
        <svg
          className="h-16 w-16 text-amber-600 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        You&apos;re Offline
      </h1>
      <p className="max-w-sm text-center text-zinc-600 dark:text-zinc-400">
        This page is cached. Your data is safe in IndexedDB. Reconnect to sync.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Try Again
      </button>
    </div>
  );
}
