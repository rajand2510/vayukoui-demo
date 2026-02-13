"use client";

import { openDB } from "idb";

const DB_NAME = "next-pwa-offline";
const DB_VERSION = 1;
const STORE_USER_DATA = "user-data";
const STORE_SYNC_QUEUE = "sync-queue";

export interface OfflinePost {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  synced: boolean;
}

let dbPromise: ReturnType<typeof openDB> | null = null;

function getDB() {
  if (typeof window === "undefined") {
    return null;
  }
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(STORE_USER_DATA)) {
          database.createObjectStore(STORE_USER_DATA, { keyPath: "id" });
        }
        if (!database.objectStoreNames.contains(STORE_SYNC_QUEUE)) {
          database.createObjectStore(STORE_SYNC_QUEUE, { keyPath: "id" });
        }
      },
    });
  }
  return dbPromise;
}

export const userDataStore = {
  async get<T>(key: string): Promise<T | undefined> {
    const db = getDB();
    if (!db) return undefined;
    const database = await db;
    return database.get(STORE_USER_DATA, key);
  },
  async set(key: string, value: Record<string, unknown>): Promise<void> {
    const db = getDB();
    if (!db) return;
    const database = await db;
    await database.put(STORE_USER_DATA, { id: key, ...value });
  },
};

export const syncQueueStore = {
  async add(item: OfflinePost): Promise<void> {
    const db = getDB();
    if (!db) return;
    const database = await db;
    await database.add(STORE_SYNC_QUEUE, { ...item, synced: false });
  },
  async getAll(): Promise<OfflinePost[]> {
    const db = getDB();
    if (!db) return [];
    const database = await db;
    return database.getAll(STORE_SYNC_QUEUE);
  },
};
