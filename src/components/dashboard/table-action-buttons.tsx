"use client";
import React from "react";
import { IconEye, IconPencil, IconTrash, IconHeart, IconShare } from "@tabler/icons-react";

interface TableActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onHeart?: () => void;
  onShare?: () => void;
  viewColor?: string;
  editColor?: string;
  deleteColor?: string;
  heartColor?: string;
  shareColor?: string;
  isHeartFilled?: boolean;
}

export const TableActionButtons = ({
  onView,
  onEdit,
  onDelete,
  onHeart,
  onShare,
  viewColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  editColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  deleteColor = "text-red-500 hover:text-red-400 border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10",
  heartColor = "text-white/40 hover:text-[#E31B23] border-white/10 hover:border-[#E31B23]/30 bg-white/5 hover:bg-[#E31B23]/10",
  shareColor = "text-white/40 hover:text-white border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10",
  isHeartFilled = false,
}: TableActionButtonsProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      {onView && (
        <button 
          onClick={onView}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${viewColor}`}
        >
          <IconEye size={18} />
        </button>
      )}
      
      {onHeart && (
        <button 
          onClick={onHeart}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${heartColor}`}
        >
          <IconHeart size={18} fill={isHeartFilled ? "currentColor" : "none"} />
        </button>
      )}

      {onShare && (
        <button 
          onClick={onShare}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${shareColor}`}
        >
          <IconShare size={18} />
        </button>
      )}
      
      {onEdit && (
        <button 
          onClick={onEdit}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${editColor}`}
        >
          <IconPencil size={18} />
        </button>
      )}

      {onDelete && (
        <button 
          onClick={onDelete}
          className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl border transition-all hover:scale-105 ${deleteColor}`}
        >
          <IconTrash size={18} />
        </button>
      )}
    </div>
  );
};
