"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import * as api from "./lib/api";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function redirectToFirstBoard() {
      try {
        const res = await api.getBoards();
        const boards = res.data.boards;
        if (boards && boards.length > 0) {
          router.replace(`/board/${boards[0].id}`);
        } else {
          // If no boards, ideally show a 'Create Board' UI
          // For now, let's just stay here or handle accordingly
          // We'll add a simple "No boards" view if needed
        }
      } catch (err) {
        console.error("Failed to load initial boards:", err);
      }
    }
    redirectToFirstBoard();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="text-on-surface-variant text-sm">Initializing Curator Board...</span>
      </div>
    </div>
  );
}
