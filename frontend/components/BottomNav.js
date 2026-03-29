"use client";

export default function BottomNav({ onToggleBoardSwitcher }) {
  return (
    <div className="flex justify-center px-2 sm:px-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6 safe-bottom">
      <div className="w-full max-w-[28rem] sm:max-w-[34rem] md:max-w-none md:w-auto flex items-center justify-around sm:justify-between md:justify-start bg-[#1D2125]/95 backdrop-blur-xl rounded-2xl p-1 sm:p-1.5 md:p-2 shadow-[0_12px_48px_rgba(0,0,0,0.4)] border border-white/10 ring-1 ring-white/5 transition-all duration-300">
        <button className="flex-1 md:flex-none min-w-0 px-2 sm:px-4 lg:px-5 py-2.5 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-white/5 rounded-xl transition-all group">
          <span className="material-symbols-outlined text-xl sm:text-xl group-hover:scale-110 transition-transform">inbox</span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Inbox</span>
        </button>
        <button className="flex-1 md:flex-none min-w-0 px-2 sm:px-4 lg:px-5 py-2.5 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-white/5 rounded-xl transition-all group">
          <span className="material-symbols-outlined text-xl sm:text-xl group-hover:scale-110 transition-transform">calendar_month</span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">Planner</span>
        </button>
        <div className="hidden md:block h-5 sm:h-6 w-[1px] bg-white/10 mx-1 sm:mx-2"></div>
        <button 
          onClick={onToggleBoardSwitcher}
          className="flex-1 md:flex-none min-w-0 px-2 sm:px-4 lg:px-5 py-2.5 sm:py-2.5 flex items-center justify-center gap-1.5 sm:gap-2 text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-white/5 rounded-xl transition-all group"
        >
          <span className="material-symbols-outlined text-xl sm:text-xl group-hover:scale-110 transition-transform">view_sidebar</span>
          <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Switch Board</span>
        </button>
      </div>
    </div>
  );
}
