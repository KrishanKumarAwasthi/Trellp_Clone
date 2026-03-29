"use client";

import { useState, useRef, useEffect } from "react";

export default function BoardHeader({ title, allLabels = [], allMembers = [], filters = {}, onFilterChange, onClearFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);

  const activeCount = Object.values(filters).filter((v) => v !== "" && v !== null).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilters]);

  return (
    <div className="w-full flex items-center justify-between px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#1D2125]/60 backdrop-blur-md shrink-0 border-b border-white/5 relative z-30 shadow-md transition-all duration-300 gap-1.5 sm:gap-2">
      <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1">
        <h1 className="text-sm sm:text-base md:text-lg font-bold text-[#FFFFFF] truncate max-w-[40vw] sm:max-w-[50vw] md:max-w-none">
          {title || "My Trello board"}
        </h1>
        <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors group">
          <span className="material-symbols-outlined text-[#B6C2CF] text-lg group-hover:scale-110 transition-transform">star</span>
        </div>
        <div className="hidden md:block h-4 w-[1px] bg-white/10 mx-1"></div>
        <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#B6C2CF] hover:text-[#FFFFFF] transition-all text-xs font-semibold">
          <span className="material-symbols-outlined text-sm">group</span>
          Board
          <span className="material-symbols-outlined text-sm">expand_more</span>
        </button>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Members — hidden on small mobile, shown on sm+ */}
        <div className="hidden sm:flex -space-x-1.5 mr-1 md:mr-2">
          {allMembers.slice(0, 3).map((m) => (
            <div
              key={m.id}
              className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#44546F] border-2 border-[#1D2125] flex items-center justify-center text-[9px] md:text-[10px] text-[#FFFFFF] font-bold cursor-pointer hover:scale-110 transition-transform shadow-sm"
            >
              {m.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
            </div>
          ))}
          {allMembers.length > 3 && (
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#596773] border-2 border-[#1D2125] flex items-center justify-center text-[9px] md:text-[10px] text-[#B6C2CF] font-bold shadow-sm">
              +{allMembers.length - 3}
            </div>
          )}
        </div>

        <div className="hidden sm:block h-5 md:h-6 w-[1px] bg-white/20 mx-0.5 md:mx-1"></div>

        {/* Filter button */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              showFilters || activeCount > 0 ? "bg-[#579DFF]/20 text-[#579DFF]" : "text-[#B6C2CF] hover:bg-white/5"
            }`}
          >
            <span className="material-symbols-outlined text-base sm:text-lg">filter_list</span>
            <span className="hidden sm:inline">Filter</span>
            {activeCount > 0 && (
              <span className="bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeCount}
              </span>
            )}
          </button>

          {/* Filter panel — full-screen on mobile, dropdown on tablet+ */}
          {showFilters && (
            <>
              {/* Mobile backdrop */}
              <div className="fixed inset-0 bg-black/50 z-[99] sm:hidden" onClick={() => setShowFilters(false)} />
              <div className="fixed inset-x-0 bottom-0 top-auto sm:absolute sm:right-0 sm:left-auto sm:bottom-auto sm:top-full sm:mt-2 w-full sm:w-72 md:w-80 bg-[#282E33] border-t sm:border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl z-[100] p-4 sm:p-4 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                  {/* Drag handle for mobile */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/20 rounded-full sm:hidden" />
                  <h3 className="text-[#FFFFFF] font-bold text-sm">Filter cards</h3>
                  <button onClick={() => setShowFilters(false)} className="text-[#B6C2CF] hover:text-[#FFFFFF] p-1 hover:bg-white/10 rounded-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                {activeCount > 0 && (
                  <button
                    onClick={() => {
                      onClearFilters?.();
                      setShowFilters(false);
                    }}
                    className="w-full mb-4 py-2 text-xs text-[#579DFF] hover:underline font-bold text-left"
                  >
                    Clear all filters
                  </button>
                )}

                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#B6C2CF] tracking-widest block mb-2">Labels</span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {allLabels.map((label) => (
                      <button
                        key={label.id}
                        onClick={() => onFilterChange("labelId", filters.labelId === label.id ? "" : label.id)}
                        className={`h-7 sm:h-6 px-3 sm:px-2.5 rounded-lg sm:rounded text-xs font-medium transition-all flex items-center gap-1.5 ${
                          filters.labelId === label.id ? "ring-2 ring-white scale-105 shadow-lg" : "opacity-80 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: label.color, color: "#fff", textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
                      >
                        {label.name}
                        {filters.labelId === label.id && <span className="material-symbols-outlined text-[10px]">check</span>}
                      </button>
                    ))}
                    {allLabels.length === 0 && <span className="text-xs text-[#B6C2CF]/50 italic">No labels created yet</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-[#B6C2CF] tracking-widest block mb-2">Members</span>
                  <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                    {allMembers.map((member) => (
                      <button
                        key={member.id}
                        onClick={() => onFilterChange("memberId", filters.memberId === member.id ? "" : member.id)}
                        className={`w-full flex items-center gap-3 p-2 sm:p-1.5 rounded-lg hover:bg-white/5 transition-colors ${
                          filters.memberId === member.id ? "bg-primary/20 text-primary-light" : "text-white/80"
                        }`}
                      >
                        <div className="w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-[#44546F] flex items-center justify-center text-[10px] font-bold text-[#FFFFFF]">
                          {member.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                        </div>
                        <span className="text-sm sm:text-xs font-medium">{member.name}</span>
                        {filters.memberId === member.id && (
                          <span className="material-symbols-outlined text-xs ml-auto text-[#579DFF]">check</span>
                        )}
                      </button>
                    ))}
                    {allMembers.length === 0 && <span className="text-xs text-text-subtle/50 italic">No members created yet</span>}
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#B6C2CF] tracking-widest block mb-2">Due Date</span>
                  <input
                    type="date"
                    value={filters.dueDate || ""}
                    onChange={(e) => onFilterChange("dueDate", e.target.value)}
                    className="w-full bg-[#22272B] border border-white/10 rounded-lg p-2.5 sm:p-2 text-sm sm:text-xs text-[#FFFFFF] outline-none focus:ring-2 focus:ring-[#579DFF]/30 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <button className="bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 transition-colors shadow-sm">
          <span className="material-symbols-outlined text-xs sm:text-sm">person_add</span>
          <span className="hidden sm:inline">Share</span>
        </button>
        <span className="material-symbols-outlined text-[#B6C2CF] text-lg sm:text-xl cursor-pointer hover:bg-white/5 rounded-lg p-1.5 transition-colors">
          more_horiz
        </span>
      </div>
    </div>
  );
}
