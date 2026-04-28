"use client";
import React from "react";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";

interface TableActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  viewColor?: string;
  editColor?: string;
  deleteColor?: string;
}

export const TableActionButtons = ({
  onView,
  onEdit,
  onDelete,
  viewColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  editColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  deleteColor = "text-red-500 hover:text-red-400 border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10",
}: TableActionButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {onView && (
        <button 
          onClick={onView}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${viewColor}`}
        >
          <IconEye size={18} />
        </button>
      )}
      
      {onEdit && (
        <button 
          onClick={onEdit}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${editColor}`}
        >
          <IconPencil size={18} />
        </button>
      )}

      {onDelete && (
        <button 
          onClick={onDelete}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${deleteColor}`}
        >
          <IconTrash size={18} />
        </button>
      )}
    </div>
  );
};
