"use client";

import { useState } from "react";
import KanbanCard from "./KanbanCard";

const LIST_STYLES = [
  "bg-[#101214] border border-white/10 shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
  "bg-[#161A1D] border border-white/10 shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
  "bg-[#1D2125] border border-white/10 shadow-[0_4px_8px_rgba(0,0,0,0.3)]",
];

export default function KanbanList({ 
  list, 
  index, 
  cards, 
  onAddCard, 
  onDropCard, 
  onUpdateList, 
  onDeleteList, 
  onUpdateCard,
  onDeleteCard,
  onArchiveCard,
  allLabels = [],
  onAddLabel,
  onRemoveLabel,
  onCreateLabel,
  onDeleteLabel,
  showLabelNames,
  onToggleLabelNames,
  allMembers = [],
  onAssignMember,
  onRemoveMember,
  onCreateMember,
  onDeleteMember,
  onAddChecklist,
  onAddChecklistItem,
  onToggleChecklistItem,
  onDeleteChecklistItem,
  onListDragStart,
  onListDrop
}) {
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [listDragOver, setListDragOver] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // List edit state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(list.title);
  
  // List settings state
  const [showSettings, setShowSettings] = useState(false);

  const listStyle = LIST_STYLES[index % LIST_STYLES.length];

  // Colorful Header Logic
  const getHeaderStyle = (title) => {
    const t = title.toLowerCase();
    if (t.includes('done')) return "bg-[#E2B203] text-[#1D2125]";
    if (t.includes('progress')) return "bg-[#4BCE97] text-[#1D2125]";
    return "bg-[#1D2125] text-[#FFFFFF]";
  };

  const headerStyle = getHeaderStyle(list.title);

  const handleUpdateTitle = () => {
    setIsEditingTitle(false);
    if (editTitleValue.trim() && editTitleValue.trim() !== list.title) {
      onUpdateList?.(list.id, editTitleValue.trim());
    } else {
      setEditTitleValue(list.title);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') handleUpdateTitle();
    if (e.key === 'Escape') {
      setEditTitleValue(list.title);
      setIsEditingTitle(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this list?")) {
      onDeleteList?.(list.id);
    }
    setShowSettings(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddCard(list.id, newTitle.trim(), newDescription.trim(), newDueDate);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
    setShowInput(false);
  };

  // Card drag handlers
  const handleCardDragStart = (e, cardId) => {
    e.stopPropagation(); // Don't trigger list drag
    e.dataTransfer.setData("dragType", "card");
    e.dataTransfer.setData("cardId", cardId);
    e.dataTransfer.setData("sourceListId", list.id);
    e.dataTransfer.effectAllowed = "move";
    // Add a class to the dragged element for z-index boost
    e.target.classList.add("card-is-dragging");
  };

  const handleCardDragEnd = (e) => {
    e.target.classList.remove("card-is-dragging");
  };

  const handleDragOver = (e, cardIndex) => {
    e.preventDefault();
    setDragOverIndex(cardIndex);
  };

  const handleDrop = (e, destIndex) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverIndex(null);
    setListDragOver(false);
    
    // Check if this is a list drag
    const dragType = e.dataTransfer.getData("dragType");
    if (dragType === "list") {
      onListDrop?.(e, index);
      return;
    }

    // Card drag
    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("sourceListId");
    if (!cardId || !sourceListId) return;
    onDropCard(cardId, sourceListId, list.id, destIndex);
  };

  const handleDragLeave = (e) => {
    // Only clear if we're leaving the container, not entering a child
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverIndex(null);
    }
  };

  // List-level drag handlers
  const handleListDragStart = (e, listIndex) => {
    setIsDragging(true);
    onListDragStart(e, listIndex);
  };

  const handleListDragEnd = () => {
    setIsDragging(false);
  };

  const handleListDrop = (e) => {
    e.preventDefault();
    setListDragOver(false);
    setDragOverIndex(null);
    
    const dragType = e.dataTransfer.getData("dragType");
    if (dragType === "list") {
      onListDrop?.(e, index);
      return;
    }

    // Card dropped on list container
    const cardId = e.dataTransfer.getData("cardId");
    const sourceListId = e.dataTransfer.getData("sourceListId");
    if (!cardId || !sourceListId) return;
    onDropCard(cardId, sourceListId, list.id, cards.length);
  };

  return (
    <div 
      className={`kanban-list-container w-[75vw] max-w-[16rem] sm:w-[16rem] sm:max-w-none md:w-[17rem] lg:w-72 shrink-0 flex flex-col h-fit max-h-[calc(100vh-250px)] sm:max-h-[calc(100vh-230px)] md:max-h-[calc(100vh-210px)] lg:max-h-[calc(100vh-190px)] rounded-xl md:rounded-2xl ${listStyle} transition-all duration-300 ${listDragOver ? 'ring-2 ring-[#0055CC]/50 translate-y-[-4px]' : ''} ${isDragging ? 'opacity-50' : ''} snap-start`}
      draggable
      onDragStart={(e) => handleListDragStart(e, index)}
      onDragEnd={handleListDragEnd}
      onDragOver={(e) => { e.preventDefault(); setListDragOver(true); }}
      onDragLeave={() => setListDragOver(false)}
      onDrop={handleListDrop}
    >
      {/* List header */}
      <div className={`flex items-center justify-between p-2 md:p-2.5 mb-1 group cursor-grab active:cursor-grabbing rounded-t-xl md:rounded-t-2xl ${headerStyle} transition-all duration-300`}>
        {isEditingTitle ? (
          <input
            autoFocus
            className="w-full bg-white text-[#172B4D] text-xs sm:text-sm font-bold rounded px-2 py-1 outline-none ring-2 ring-[#0055CC]/30 border border-black/10 shadow-sm"
            value={editTitleValue}
            onChange={(e) => setEditTitleValue(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={handleTitleKeyDown}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3 className={`text-xs sm:text-sm font-bold truncate max-w-[180px] cursor-pointer`} onClick={(e) => { e.stopPropagation(); setIsEditingTitle(true); }}>{list.title}</h3>
        )}

        <div className="flex items-center gap-1 ml-1.5 sm:ml-2 relative">
          <button onClick={() => setShowSettings(!showSettings)} className="p-1 hover:bg-black/10 rounded transition-colors">
            <span className="material-symbols-outlined text-base sm:text-lg">more_horiz</span>
          </button>
          
          {/* Settings Popup */}
          {showSettings && (
            <div className="absolute top-full right-0 mt-1 w-36 sm:w-40 bg-[#282E33] border border-white/10 rounded-lg shadow-xl z-[60] overflow-hidden py-1">
              <button 
                onClick={handleDelete}
                className="w-full text-left px-3 py-2 text-xs text-[#F87168] hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span className="font-bold">Delete List</span>
                <span className="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards container */}
      <div
        className="flex flex-col gap-1.5 md:gap-2 overflow-y-auto overflow-x-visible custom-scrollbar flex-1 min-h-[8px] px-1.5 sm:px-2"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDragOver(e, cards.length);
        }}
        onDragLeave={handleDragLeave}
        onDrop={(e) => {
          e.stopPropagation();
          handleDrop(e, cards.length);
        }}
      >
        {cards.map((card, ci) => (
          <div
            key={card.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDragOver(e, ci);
            }}
            onDrop={(e) => {
              e.stopPropagation();
              handleDrop(e, ci);
            }}
          >
            {dragOverIndex === ci && (
              <div className="h-1 bg-[#579DFF]/40 rounded-full mb-1 transition-all"></div>
            )}
            <KanbanCard 
              card={card}
              listId={list.id}
              onDragStart={handleCardDragStart}
              onDragEnd={handleCardDragEnd}
              onUpdateCard={onUpdateCard}
              onDeleteCard={onDeleteCard}
              onArchiveCard={onArchiveCard}
              allLabels={allLabels}
              onAddLabel={onAddLabel}
              onRemoveLabel={onRemoveLabel}
              onCreateLabel={onCreateLabel}
              onDeleteLabel={onDeleteLabel}
              showLabelNames={showLabelNames}
              onToggleLabelNames={onToggleLabelNames}
              allMembers={allMembers}
              onAssignMember={onAssignMember}
              onRemoveMember={onRemoveMember}
              onCreateMember={onCreateMember}
              onDeleteMember={onDeleteMember}
              onAddChecklist={onAddChecklist}
              onAddChecklistItem={onAddChecklistItem}
              onToggleChecklistItem={onToggleChecklistItem}
              onDeleteChecklistItem={onDeleteChecklistItem}
            />
          </div>
        ))}
        {dragOverIndex === cards.length && (
          <div className="h-1 bg-[#579DFF]/40 rounded-full transition-all"></div>
        )}
      </div>

      {/* Footer: Add Card */}
      <div className="p-1.5 sm:p-2 border-t border-white/5">
        {showInput ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 p-2 bg-[#22272B] rounded-xl border border-white/10 shadow-inner">
            <div className="flex flex-col gap-2 bg-[#1D2125] p-2 rounded-lg border border-white/10 shadow-sm transition-all focus-within:ring-2 focus-within:ring-[#579DFF]/30">
              <input
                autoFocus
                className="w-full bg-transparent text-[#FFFFFF] text-xs sm:text-sm font-medium outline-none placeholder:text-[#B6C2CF]/40"
                placeholder="Enter a title for this card..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <textarea
                className="w-full bg-transparent text-[#B6C2CF] text-[11px] sm:text-xs outline-none resize-none placeholder:text-[#B6C2CF]/30 min-h-[40px] custom-scrollbar"
                placeholder="Add a description..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <input
                type="date"
                className="w-full bg-transparent text-[#B6C2CF] text-[10px] uppercase font-bold outline-none [color-scheme:dark]"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="px-3 sm:px-4 py-1.5 bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] rounded-lg font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#579DFF]/10"
              >
                Add card
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInput(false);
                  setNewTitle("");
                  setNewDescription("");
                  setNewDueDate("");
                }}
                className="text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-white/5 p-1.5 rounded-md transition-colors"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">close</span>
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center gap-2 p-2 text-[#B6C2CF] hover:text-[#FFFFFF] hover:bg-white/5 rounded-lg transition-all group border border-transparent hover:border-white/5"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl group-hover:scale-110 transition-transform">add</span>
            <span className="text-xs sm:text-sm font-bold">Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
}
