"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isOnline, setIsOnline] = useState(true);
  const [posts, setPosts] = useState<{ id: string; title: string; content: string }[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handler = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handler);
    window.addEventListener("offline", handler);
    return () => {
      window.removeEventListener("online", handler);
      window.removeEventListener("offline", handler);
    };
  }, []);

  useEffect(() => {
    import("@/lib/db").then(({ syncQueueStore }) => {
      syncQueueStore.getAll().then(setPosts);
    });
  }, []);

  const addPost = async () => {
    const { syncQueueStore } = await import("@/lib/db");
    const post = {
      id: crypto.randomUUID(),
      title: newTitle || "Untitled",
      content: newContent || "",
      createdAt: Date.now(),
      synced: false,
    };
    await syncQueueStore.add(post);
    setPosts((p) => [...p, post]);
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Next PWA · Offline
          </h1>
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isOnline ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 p-4">
        <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-100">
            Architecture
          </h2>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>✅ Service Worker (Serwist) – intercepts requests</li>
            <li>✅ Cache Storage – HTML, JS, CSS, assets</li>
            <li>✅ IndexedDB – user data & sync queue</li>
            <li>✅ Offline fallback at /~offline</li>
          </ul>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 font-medium text-zinc-900 dark:text-zinc-100">
            Offline demo – add a post (stored in IndexedDB)
          </h2>
          <div className="mb-3 flex flex-col gap-2">
            <input
              type="text"
              placeholder="Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            />
            <textarea
              placeholder="Content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows={2}
              className="rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={addPost}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Add Post
            </button>
          </div>
          <ul className="space-y-2">
            {posts.map((p) => (
              <li
                key={p.id}
                className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700"
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {p.title}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {p.content || "(empty)"}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-center text-xs text-zinc-500">
          Go offline (DevTools → Network → Offline) and reload. The app keeps
          working.
        </p>
      </main>
    </div>
  );
}
