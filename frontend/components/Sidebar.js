"use client";

import { useState, useEffect } from "react";

export default function Sidebar({
  boards = [],
  currentBoardId,
  onSwitchBoard,
  isMobileOpen = false,
  onCloseMobile,
  isDesktopCollapsed = false,
  onToggleDesktopCollapse,
}) {
  return (
    <aside
      className={`${
        isDesktopCollapsed ? "md:w-[52px]" : "md:w-[280px]"
      } ${
        isMobileOpen ? "w-[84vw] max-w-[320px]" : "w-0"
      } md:max-w-none fixed md:static inset-y-0 left-0 bg-gradient-to-b from-[#172B4D] to-[#0D1D3A] border-r border-black/20 flex flex-col shrink-0 transition-all duration-300 ease-in-out relative group shadow-2xl z-50 md:z-40 ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } overflow-hidden md:overflow-visible`}
    >
      {/* Mobile close button */}
      <button
        onClick={onCloseMobile}
        className="md:hidden absolute right-2 top-2 w-8 h-8 bg-[#22272B] border border-white/10 rounded-full flex items-center justify-center text-[#B6C2CF] hover:text-[#FFFFFF] shadow-lg transition-colors z-50"
      >
        <span className="material-symbols-outlined text-base">close</span>
      </button>

      {/* Desktop Collapse Toggle Button — always visible on md+ */}
      <button
        onClick={onToggleDesktopCollapse}
        className="hidden md:flex absolute -right-3.5 top-10 w-7 h-7 bg-[#282E33] border border-white/10 rounded-full items-center justify-center text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-[#363D44] shadow-lg transition-all z-50 opacity-0 group-hover:opacity-100 ring-2 ring-black/30"
        title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="material-symbols-outlined text-sm">
          {isDesktopCollapsed ? "chevron_right" : "chevron_left"}
        </span>
      </button>

      <div className={`p-3 pt-12 md:pt-3 flex flex-col h-full overflow-hidden ${isDesktopCollapsed ? "md:items-center md:px-1.5" : ""}`}>
        {/* Boards Section Header */}
        <div className={`flex items-center mb-3 md:mb-4 w-full ${isDesktopCollapsed ? "md:justify-center" : "justify-between"}`}>
          <div className="flex items-center gap-2 text-white/90 overflow-hidden">
            <span className="material-symbols-outlined text-xl shrink-0">dashboard</span>
            {!isDesktopCollapsed && <h2 className="hidden md:block text-xs md:text-sm font-bold truncate uppercase tracking-wider">Boards</h2>}
            <h2 className="md:hidden text-xs font-bold truncate uppercase tracking-wider">Boards</h2>
          </div>
          {/* Inline collapse/expand toggle next to BOARDS title */}
          {!isDesktopCollapsed && (
            <button
              onClick={onToggleDesktopCollapse}
              className="hidden md:flex w-6 h-6 items-center justify-center text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-all shrink-0"
              title="Collapse sidebar"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 mb-4 overflow-y-auto custom-scrollbar flex-1 w-full px-1">
            {boards.map((board) => (
              <button
                key={board.id}
                onClick={() => {
                  onSwitchBoard?.(board.id);
                  onCloseMobile?.();
                }}
                title={board.title}
                className={`w-full text-left rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2.5 overflow-hidden ${
                  isDesktopCollapsed ? "md:justify-center md:px-0 md:py-2.5 px-3 py-2.5" : "px-3 md:px-3.5 py-2.5"
                } ${
                  board.id === currentBoardId
                    ? "bg-[#0055CC] text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold shrink-0 ${
                  board.id === currentBoardId ? "bg-white/20 text-white" : "bg-white/10 text-white/60"
                }`}>
                  {board.title?.charAt(0)?.toUpperCase() || "B"}
                </div>
                {/* On mobile: always show text. On desktop: hide when collapsed */}
                <span className={`truncate ${isDesktopCollapsed ? "md:hidden" : ""}`}>{board.title}</span>
              </button>
            ))}
            {boards.length === 0 && !isDesktopCollapsed && (
              <p className="text-xs text-white/30 px-3 py-2 italic">No boards yet.</p>
            )}
        </div>

        {/* Static Items (Hidden when collapsed on desktop) */}
        <div className={`border-t border-white/10 pt-4 space-y-2 mt-auto ${isDesktopCollapsed ? "md:hidden" : ""}`}>
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-md p-2.5 cursor-pointer border border-white/5">
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Workspace</span>
          </div>
          <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-md p-2.5 cursor-pointer border border-white/5">
            <span className="text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">settings</span>
              Settings
            </span>
          </div>
        </div>
        
        {/* When collapsed on desktop, show icon-only footer */}
        {isDesktopCollapsed && (
           <div className="mt-auto space-y-4 py-4 border-t border-white/10 w-full hidden md:flex flex-col items-center">
             <span className="material-symbols-outlined text-white/40 text-lg cursor-pointer hover:text-white transition-colors" title="Workspace">workspaces</span>
             <span className="material-symbols-outlined text-white/40 text-lg cursor-pointer hover:text-white transition-colors" title="Settings">settings</span>
           </div>
        )}
      </div>
    </aside>
  );
}
