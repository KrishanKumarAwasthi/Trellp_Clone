"use client";

import { useState } from "react";

export default function Header({ boardTitle, onSearch, onCreateBoard, onToggleSidebar }) {
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [boardTitleInput, setBoardTitleInput] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (boardTitleInput.trim()) {
      onCreateBoard?.(boardTitleInput.trim());
      setBoardTitleInput("");
      setShowCreateBoard(false);
    }
  };

  return (
    <header className="flex justify-between items-center w-full px-2 sm:px-3 lg:px-4 h-12 sm:h-13 md:h-14 bg-[#1D2125]/90 backdrop-blur-md border-b border-white/10 z-30 shrink-0 shadow-lg gap-1.5 sm:gap-2 overflow-x-hidden">
      <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 text-[#B6C2CF] hover:bg-white/10 rounded-lg transition-colors shrink-0"
          aria-label="Open boards sidebar"
        >
          <span className="material-symbols-outlined text-[20px]">menu</span>
        </button>

        {/* Logo */}
        <div className="flex items-center gap-1.5 cursor-pointer px-1 sm:px-2 py-1 rounded-lg hover:bg-white/5 group shrink-0">
          <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#0079bf] rounded-sm flex flex-col items-center justify-center gap-0.5 p-0.5 shadow-sm group-hover:bg-[#0055CC] transition-colors">
            <div className="flex gap-0.5 w-full h-full">
               <div className="w-1/2 bg-white rounded-[1px]"></div>
               <div className="w-1/2 bg-white rounded-[1px] opacity-50"></div>
            </div>
          </div>
          <span className="hidden sm:inline text-base md:text-lg font-bold text-[#FFFFFF] tracking-tight">Trello</span>
        </div>

        {/* Search — desktop/tablet inline, mobile expandable */}
        <div className={`relative min-w-0 transition-all duration-200 ${showMobileSearch ? 'flex-1' : 'hidden sm:block sm:flex-1'} max-w-none sm:max-w-md md:max-w-lg lg:max-w-2xl`}>
          <form onSubmit={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#B6C2CF] text-sm opacity-70">
              search
            </span>
            <input
              className="bg-white/10 border border-white/10 rounded-lg py-1.5 sm:py-2 pl-9 pr-3 text-xs sm:text-sm focus:ring-2 focus:ring-[#579DFF]/30 text-[#FFFFFF] w-full outline-none placeholder:text-[#B6C2CF]/50 transition-all focus:bg-white/20"
              placeholder="Search cards..."
              type="text"
              onChange={(e) => onSearch?.(e.target.value)}
              onBlur={() => setShowMobileSearch(false)}
              autoFocus={showMobileSearch}
            />
          </form>
        </div>

        {/* Mobile search toggle */}
        {!showMobileSearch && (
          <button
            onClick={() => setShowMobileSearch(true)}
            className="sm:hidden p-2 text-[#B6C2CF] hover:bg-white/10 rounded-lg transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
        )}

        {/* Create button */}
        {!showMobileSearch && (
          <div className="relative shrink-0">
            {showCreateBoard ? (
              <form onSubmit={handleCreateSubmit} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <input
                  autoFocus
                  className="bg-[#22272B] border border-[#579DFF] rounded-lg py-1.5 px-2 sm:px-3 text-xs sm:text-sm text-[#FFFFFF] w-28 sm:w-48 outline-none focus:ring-2 focus:ring-[#579DFF]/30 placeholder:text-[#B6C2CF]/30"
                  placeholder="Board title..."
                  value={boardTitleInput}
                  onChange={(e) => setBoardTitleInput(e.target.value)}
                  onBlur={() => {
                    if (!boardTitleInput.trim()) setShowCreateBoard(false);
                  }}
                />
                <button type="submit" className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-[#579DFF] text-[#1D2125] rounded-lg hover:bg-[#85B8FF] transition-colors whitespace-nowrap shadow-md">
                  Save
                </button>
                <button type="button" onClick={() => setShowCreateBoard(false)} className="text-[#B6C2CF] hover:text-[#FFFFFF] p-1">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setShowCreateBoard(true)}
                className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold bg-[#579DFF] text-[#1D2125] rounded-lg hover:bg-[#85B8FF] transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#579DFF]/10"
              >
                Create
              </button>
            )}
          </div>
        )}
      </div>

       {/* Right icons — tablet + desktop */}
      <div className="hidden md:flex items-center gap-0.5 lg:gap-1.5 shrink-0">
        <button className="p-2 text-[#B6C2CF] hover:bg-white/10 transition-colors rounded-full">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
        <button className="p-2 text-[#B6C2CF] hover:bg-white/10 transition-colors rounded-full">
          <span className="material-symbols-outlined text-xl">help</span>
        </button>
        <button className="hidden lg:block p-2 text-[#B6C2CF] hover:bg-white/10 transition-colors rounded-full">
          <span className="material-symbols-outlined text-xl">announcement</span>
        </button>
      </div>
    </header>
  );
}
