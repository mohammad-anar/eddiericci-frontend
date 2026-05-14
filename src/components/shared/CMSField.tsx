"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X, PencilIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CMSFieldProps {
  value: string | number;
  onUpdate: (newValue: string | number) => void;
  canEdit: boolean;
  type?: "text" | "number" | "textarea" | "select" | "date" | "combobox";
  options?: string[];
  className?: string;
  inputClassName?: string;
  label?: string;
  isNumeric?: boolean;
  editTrigger?: "click" | "doubleClick";
  hideIcon?: boolean;
  style?: React.CSSProperties;
}

export const CMSField = ({
  value,
  onUpdate,
  canEdit,
  type = "text",
  options = [],
  className,
  inputClassName,
  isNumeric = false,
  editTrigger = "click",
  hideIcon = false,
  style,
}: CMSFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = (val?: string | number) => {
    const finalVal = val !== undefined ? val : tempValue;
    onUpdate(isNumeric ? Number(finalVal) : finalVal);
    setIsEditing(false);
    setSearchTerm("");
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isEditing && canEdit) {
    if (type === "combobox") {
      return (
        <div className={cn("relative flex flex-col gap-1 w-full z-50", className)} style={style}>
          <div className="flex items-center gap-2">
            <Input
              value={searchTerm || String(tempValue)}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}
              autoFocus
            />
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-9 left-0 w-full max-h-40 overflow-y-auto bg-gray-900 border border-gray-800 rounded shadow-xl z-[100]">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt}
                  className="px-3 py-2 text-xs hover:bg-primary/20 cursor-pointer text-white"
                  onClick={() => handleSave(opt)}
                >
                  {opt}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-xs text-gray-500">No results</div>
            )}
          </div>
        </div>
      );
    }

    if (type === "select") {
      return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
          <Select
            value={String(tempValue)}
            onValueChange={(val) => handleSave(val)}
          >
            <SelectTrigger className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800 text-white">
              {options.map((opt) => (
                <SelectItem key={opt} value={opt} className="text-xs hover:bg-primary/20">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className={cn("flex items-center gap-2 w-full", className)} style={style}>
        {type === "textarea" ? (
          <Textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={cn("text-xs bg-gray-800 border-primary/30 min-h-[100px]", inputClassName)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancel();
            }}
          />
        ) : (
          <Input
            type={type}
            value={
              type === "date" && String(tempValue).includes("/")
                ? String(tempValue).split("/").reverse().join("-")
                : tempValue
            }
            onChange={(e) => {
              let val = e.target.value;
              if (type === "date" && val.includes("-")) {
                val = val.split("-").reverse().join("/");
              }
              setTempValue(val);
            }}
            className={cn("h-8 text-xs bg-gray-800 border-primary/30 min-w-20", inputClassName)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
          />
        )}
        <div className="flex flex-col gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-green-500 hover:text-green-400 hover:bg-green-500/10"
            onClick={() => handleSave()}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-red-500 hover:text-red-400 hover:bg-red-500/10"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2 transition-all duration-200",
        canEdit && "cursor-pointer hover:bg-white/5 rounded px-1 -mx-1",
        className
      )}
      style={style}
      onClick={() => canEdit && editTrigger === "click" && setIsEditing(true)}
      onDoubleClick={() => canEdit && editTrigger === "doubleClick" && setIsEditing(true)}
    >
      <span className={cn("truncate", type === "textarea" && "whitespace-pre-wrap truncate-none")}>{value}</span>
      {canEdit && !hideIcon && (
        <PencilIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
      )}
    </div>
  );
};
