"use client";

import { useState } from "react";

export default function KanbanCard({ 
  card,
  listId,
  onDragStart,
  onDragEnd,
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
  onDeleteChecklistItem
}) {
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const [newLabelName, setNewLabelName] = useState("");
  const [newLabelColor, setNewLabelColor] = useState("#0079bf"); // Trello Blue
  const [isCreatingMember, setIsCreatingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newItemContent, setNewItemContent] = useState("");
  const [activeChecklistId, setActiveChecklistId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(card.title || "");
  const [editDesc, setEditDesc] = useState(card.description || "");
  const [editDueDate, setEditDueDate] = useState(card.dueDate ? new Date(card.dueDate).toISOString().split('T')[0] : "");

  const handleSave = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    onUpdateCard?.(card.id, { 
      title: editTitle.trim(), 
      description: editDesc.trim(),
      dueDate: editDueDate || null
    });
    setIsEditing(false);
  };

  const handleArchive = () => {
    if (window.confirm("Are you sure you want to archive this card? It will be hidden from the board.")) {
      onArchiveCard?.(card.id);
      setIsEditing(false);
    }
  };

  const toggleLabel = (labelId) => {
    const isAssigned = card.labels?.some(l => l.labelId === labelId);
    if (isAssigned) {
      onRemoveLabel?.(card.id, labelId);
    } else {
      onAddLabel?.(card.id, labelId);
    }
  };

  const handleCreateLabelLocal = async (e) => {
    e.preventDefault();
    if (!newLabelName.trim()) return;
    const label = await onCreateLabel?.(newLabelName.trim(), newLabelColor);
    if (label) {
      onAddLabel?.(card.id, label.id);
      setNewLabelName("");
      setIsCreatingLabel(false);
    }
  };

  const toggleMember = (memberId) => {
    const isAssigned = card.members?.some(m => m.memberId === memberId);
    if (isAssigned) {
      onRemoveMember?.(card.id, memberId);
    } else {
      onAssignMember?.(card.id, memberId);
    }
  };

  const handleCreateMemberLocal = async (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    const member = await onCreateMember?.(newMemberName.trim());
    if (member) {
      onAssignMember?.(card.id, member.id);
      setNewMemberName("");
      setIsCreatingMember(false);
    }
  };

  return (
    <>
      <div
        draggable
        onDragStart={(e) => {
          e.stopPropagation();
          onDragStart(e, card.id);
        }}
        onDragEnd={(e) => {
          onDragEnd?.(e);
        }}
        onClick={() => setIsEditing(true)}
        className="group relative bg-[#22272B] hover:bg-[#2C333A] rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 shadow-[0_1px_1px_rgba(0,0,0,0.5),0_1px_4px_rgba(0,0,0,0.3)] border border-white/5 cursor-pointer transition-all active:scale-[0.98] mb-1.5 sm:mb-2"
      >
        {/* Card labels bar on front */}
        {card.labels && card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1 font-sans">
            {card.labels.map((cl) => (
              <div
                key={cl.labelId}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleLabelNames?.();
                }}
                className={`rounded-full shadow-sm transition-all flex items-center px-1.5 ${
                  showLabelNames ? "h-4 min-w-[32px]" : "h-1.5 w-8"
                }`}
                style={{ backgroundColor: cl.label?.color || '#555' }}
                title={cl.label?.name}
              >
                {showLabelNames && (
                  <span className="text-[10px] text-white font-bold leading-none truncate">
                    {cl.label?.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Card title */}
        <p className="text-[12px] sm:text-sm text-[#FFFFFF] font-medium leading-snug whitespace-normal break-words group-hover:text-[#579DFF] transition-colors">
          {card.title}
        </p>

        {/* Card metadata row */}
        <div className="flex items-center justify-between gap-2 mt-1.5 sm:mt-2 font-sans">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            {card.description && (
              <span className="material-symbols-outlined text-[#B6C2CF] text-[11px] sm:text-xs opacity-80">subject</span>
            )}
            {card.dueDate && (
              <span className="text-[10px] sm:text-xs text-[#B6C2CF] flex items-center gap-0.5 opacity-90 whitespace-nowrap">
                <span className="material-symbols-outlined text-[11px] sm:text-xs">schedule</span>
                {new Date(card.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>

          {/* Members */}
          {card.members && card.members.length > 0 && (
            <div className="flex -space-x-1">
              {card.members.map((cm) => (
                <div
                  key={cm.member?.id || cm.memberId}
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#44546F] flex items-center justify-center text-[8px] text-[#FFFFFF] font-bold border border-[#1D2125] shadow-sm transform hover:scale-110 transition-all"
                  title={cm.member?.name}
                >
                  {(cm.member?.name || "?").slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-stretch sm:items-center sm:justify-center modal-backdrop p-0 sm:p-4 md:p-6 lg:p-8 backdrop-blur-md bg-black/50" onClick={() => setIsEditing(false)}>
          <div className="bg-[#282E33] border-0 sm:border sm:border-white/10 rounded-none sm:rounded-2xl shadow-2xl w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[90vw] md:w-[80vw] md:max-w-xl lg:max-w-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-[#22272B] shrink-0">
              <h3 className="text-lg font-bold text-[#FFFFFF] flex items-center gap-2">
                <span className="material-symbols-outlined">edit_document</span>
                Edit Card
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#B6C2CF] hover:text-[#FFFFFF] transition-colors p-1 hover:bg-white/5 rounded">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSave} className="p-3 sm:p-4 flex flex-col gap-4">
              {/* Labels Picker */}
              <div className="mb-2">
                <label className="text-xs font-bold text-[#B6C2CF] uppercase tracking-wider mb-2 block">Labels</label>
                <div className="flex flex-wrap gap-2">
                  {allLabels.map((label) => {
                    const isSelected = card.labels?.some(l => l.labelId === label.id);
                    return (
                      <div key={label.id} className="relative group/label">
                        <button
                          key={label.id}
                          type="button"
                          onClick={() => toggleLabel(label.id)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all border flex items-center justify-between gap-2 ${
                            isSelected 
                              ? "bg-opacity-100 border-white/20 text-white" 
                              : "bg-opacity-20 border-transparent text-on-surface-variant hover:bg-opacity-30"
                          }`}
                          style={{ 
                            backgroundColor: isSelected ? label.color : `${label.color}33`,
                            borderColor: isSelected ? 'rgba(255,255,255,0.3)' : 'transparent'
                          }}
                        >
                          {label.name}
                          {isSelected && <span className="material-symbols-outlined text-xs">check</span>}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete label "${label.name}" globally?`)) {
                              onDeleteLabel?.(label.id);
                            }
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover/label:opacity-100 transition-opacity shadow-lg"
                        >
                          <span className="material-symbols-outlined text-[8px] font-bold">close</span>
                        </button>
                      </div>
                    );
                  })}
                    <button
                      type="button"
                      onClick={() => setIsCreatingLabel(!isCreatingLabel)}
                      className="px-3 py-1 rounded text-xs font-semibold border border-dashed border-white/20 text-[#B6C2CF] hover:bg-white/5 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Create New
                    </button>
                  </div>
                  
                  {isCreatingLabel && (
                    <div className="mt-3 p-3 bg-[#22272B] border border-white/10 rounded-xl shadow-sm flex flex-col gap-2">
                      <input
                        className="w-full bg-[#1D2125] text-[#FFFFFF] text-xs rounded p-2 outline-none border border-white/10"
                        placeholder="Label name..."
                        value={newLabelName}
                        onChange={e => setNewLabelName(e.target.value)}
                        autoFocus
                      />
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1 overflow-x-auto pb-1 custom-scrollbar">
                        {["#0079bf", "#70b500", "#ff9f1a", "#eb5a46", "#c377e0", "#00c2e0", "#51e898", "#ff78cb"].map(color => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setNewLabelColor(color)}
                            className={`w-5 h-5 rounded-full shrink-0 border-2 transition-all ${newLabelColor === color ? "border-white scale-110" : "border-transparent"}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                      <div className="flex justify-end gap-2 mt-1">
                        <button type="button" onClick={() => setIsCreatingLabel(false)} className="text-[10px] text-[#B6C2CF] hover:text-[#FFFFFF] uppercase font-bold">Cancel</button>
                        <button type="button" onClick={handleCreateLabelLocal} className="bg-[#579DFF] hover:bg-[#85B8FF] px-3 py-1 rounded text-[10px] text-[#1D2125] uppercase font-bold transition-colors shadow-sm">Create</button>
                      </div>
                    </div>
                  )}
                </div>
  
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#B6C2CF] uppercase tracking-wider">Title</label>
                  <input
                    autoFocus
                    className="w-full bg-[#22272B] text-[#FFFFFF] text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#579DFF]/30 border border-white/10 shadow-sm"
                    value={editTitle}
                    onChange={e => setEditTitle(e.target.value)}
                    placeholder="Card title..."
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#B6C2CF] uppercase tracking-wider">Description</label>
                  <textarea
                    className="w-full bg-[#22272B] text-[#FFFFFF] text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#579DFF]/30 border border-white/10 shadow-sm min-h-[100px] custom-scrollbar"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)}
                    placeholder="Add a more detailed description..."
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#B6C2CF] uppercase tracking-wider">Due Date</label>
                  <input
                    type="date"
                    className="w-full bg-[#22272B] text-[#FFFFFF] text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#579DFF]/30 border border-white/10 shadow-sm [color-scheme:dark]"
                    value={editDueDate}
                    onChange={e => setEditDueDate(e.target.value)}
                  />
                </div>
  
                <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={handleArchive} className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 px-3 py-1.5 rounded transition-colors text-sm font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    Archive
                  </button>
                  <button type="button" onClick={() => {
                    if (window.confirm("Permanently delete this card?")) {
                      onDeleteCard?.(card.id);
                      setIsEditing(false);
                    }
                  }} className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded transition-colors text-sm font-medium flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                    Delete
                  </button>
                </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-1.5 bg-[#596773] hover:bg-[#6B7A87] text-[#FFFFFF] rounded font-medium text-sm transition-colors">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-1.5 bg-[#579DFF] hover:bg-[#85B8FF] text-[#1D2125] rounded font-medium text-sm transition-colors shadow-lg">
                      Save Changes
                    </button>
                  </div>
              </div>
            </form>

            <div className="p-3 sm:p-4 border-t border-white/10 bg-[#22272B] flex flex-col gap-4">
              {/* Members Picker */}
              <div>
                <label className="text-xs font-bold text-[#B6C2CF] uppercase tracking-wider mb-2 block">Members</label>
                <div className="flex flex-wrap gap-2">
                  {allMembers.map((member) => {
                    const isAssigned = card.members?.some(m => m.memberId === member.id);
                    return (
                      <div key={member.id} className="relative group/member">
                        <button
                          type="button"
                          onClick={() => toggleMember(member.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                            isAssigned 
                              ? "bg-primary border-white" 
                              : "bg-surface-container-highest border-transparent text-text-subtle hover:bg-white/10"
                          }`}
                          title={member.name}
                        >
                          {member.name.slice(0, 2).toUpperCase()}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete member "${member.name}" globally?`)) {
                              onDeleteMember?.(member.id);
                            }
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-3.5 h-3.5 flex items-center justify-center opacity-0 group-hover/member:opacity-100 transition-opacity shadow-lg"
                        >
                          <span className="material-symbols-outlined text-[8px] font-bold">close</span>
                        </button>
                      </div>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setIsCreatingMember(!isCreatingMember)}
                    className="w-8 h-8 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center text-[#B6C2CF] hover:bg-white/5 transition-all"
                    title="Add new member"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
  
                {isCreatingMember && (
                  <div className="mt-3 p-3 bg-[#22272B] border border-white/10 rounded-xl shadow-sm flex flex-col gap-2">
                    <input
                      className="w-full bg-[#1D2125] text-[#FFFFFF] text-xs rounded p-2 outline-none border border-white/10"
                      placeholder="Member name..."
                      value={newMemberName}
                      onChange={e => setNewMemberName(e.target.value)}
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setIsCreatingMember(false)} className="text-[10px] text-[#B6C2CF] hover:text-[#FFFFFF] uppercase font-bold">Cancel</button>
                      <button type="button" onClick={handleCreateMemberLocal} className="bg-[#579DFF] hover:bg-[#85B8FF] px-3 py-1 rounded text-[10px] text-[#1D2125] uppercase font-bold transition-colors shadow-sm">Add</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            {/* Checklists Section */}
            <div className="p-3 sm:p-4 border-t border-white/10 flex flex-col gap-6">
              {card.checklists?.map((checklist) => {
                const total = checklist.items?.length || 0;
                const completed = checklist.items?.filter(it => it.completed).length || 0;
                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

                return (
                  <div key={checklist.id} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[#B6C2CF]">task_alt</span>
                      <h3 className="font-bold text-[#FFFFFF] flex-1">Checklist</h3>
                      <button 
                        onClick={() => {/* add delete checklist logic if needed */}}
                        className="text-[#B6C2CF] hover:text-[#FFFFFF] text-xs font-bold uppercase p-1 hover:bg-white/5 rounded"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-[#B6C2CF] min-w-[30px]">{percent}%</span>
                      <div className="flex-1 h-1.5 bg-[#596773] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#579DFF] transition-all duration-300" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-col gap-1">
                      {checklist.items?.map((item) => (
                        <div key={item.id} className="group/item flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors">
                          <button 
                            onClick={() => onToggleChecklistItem?.(card.id, checklist.id, item.id, !item.completed)}
                            className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              item.completed ? "bg-primary border-primary" : "border-white/20 hover:border-white/40"
                            }`}
                          >
                            {item.completed && <span className="material-symbols-outlined text-[10px] text-white font-bold">check</span>}
                          </button>
                          <span className={`text-sm flex-1 ${item.completed ? "text-[#596773] line-through italic" : "text-[#FFFFFF]"}`}>
                            {item.content}
                          </span>
                          <button 
                            onClick={() => onDeleteChecklistItem?.(card.id, checklist.id, item.id)}
                            className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
                          >
                            <span className="material-symbols-outlined text-xs text-text-subtle">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Item Form */}
                    {activeChecklistId === checklist.id ? (
                      <div className="flex flex-col gap-2 scale-in-center animate-in fade-in zoom-in duration-200">
                        <textarea
                          className="w-full bg-[#22272B] text-[#FFFFFF] text-sm rounded-lg p-3 outline-none border border-white/10 placeholder:text-[#B6C2CF]/50 resize-none shadow-sm"
                          placeholder="Add an item..."
                          rows={2}
                          value={newItemContent}
                          onChange={e => setNewItemContent(e.target.value)}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              if (newItemContent.trim()) {
                                onAddChecklistItem?.(card.id, checklist.id, newItemContent.trim());
                                setNewItemContent("");
                              }
                            }}
                            className="bg-primary hover:bg-primary-hover px-4 py-1.5 rounded-lg text-xs text-white font-bold transition-colors"
                          >
                            Add
                          </button>
                          <button 
                            onClick={() => {
                              setActiveChecklistId(null);
                              setNewItemContent("");
                            }}
                            className="px-4 py-1.5 rounded-lg text-xs text-text-subtle font-bold hover:bg-white/5 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setActiveChecklistId(checklist.id)}
                        className="self-start px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-text-subtle font-bold transition-all ml-7"
                      >
                        Add an item
                      </button>
                    )}
                  </div>
                );
              })}

              {(!card.checklists || card.checklists.length === 0) && (
                <button 
                  onClick={() => onAddChecklist?.(card.id)}
                  className="flex items-center gap-2 text-[#B6C2CF] hover:text-[#FFFFFF] transition-colors p-2 hover:bg-white/5 rounded-lg w-fit"
                >
                  <span className="material-symbols-outlined text-sm">add_task</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Add Checklist</span>
                </button>
              )}
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
