"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as api from "./lib/api";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function redirectToFirstBoard() {
      try {
        const res = await api.getBoards();
        const boards = res.data.boards;
        if (boards && boards.length > 0) {
          router.replace(`/board/${boards[0].id}`);
        } else {
          setEmpty(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load initial boards:", err);
        setError(err.message || "Failed to connect to server");
        setLoading(false);
      }
    }
    redirectToFirstBoard();
  }, [router]);

  async function handleCreateBoard() {
    setCreating(true);
    try {
      const res = await api.createBoard("My First Board");
      const board = res.data.board;
      router.replace(`/board/${board.id}`);
    } catch (err) {
      console.error("Failed to create board:", err);
      setError(err.message || "Failed to create board");
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-on-surface-variant text-sm">Initializing Curator Board...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface border border-outline-variant max-w-md text-center">
          <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-on-surface text-lg font-semibold">Connection Error</h2>
          <p className="text-on-surface-variant text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-5 p-8 rounded-2xl bg-surface border border-outline-variant max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
            </svg>
          </div>
          <div>
            <h2 className="text-on-surface text-xl font-bold mb-1">Welcome to Curator Board</h2>
            <p className="text-on-surface-variant text-sm">Get started by creating your first Kanban board.</p>
          </div>
          <button
            onClick={handleCreateBoard}
            disabled={creating}
            className="px-6 py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {creating ? (
              <>
                <div className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Create Your First Board
              </>
            )}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
