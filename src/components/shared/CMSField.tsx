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
  type?: "text" | "number" | "textarea" | "select";
  options?: string[];
  className?: string;
  inputClassName?: string;
  label?: string;
  isNumeric?: boolean;
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
}: CMSFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = (val?: string | number) => {
    const finalVal = val !== undefined ? val : tempValue;
    onUpdate(isNumeric ? Number(finalVal) : finalVal);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  if (isEditing && canEdit) {
    if (type === "select") {
      return (
        <div className={cn("flex items-center gap-2 w-full", className)}>
          <Select
            value={String(tempValue)}
            onValueChange={(val) => handleSave(val)}
          >
            <SelectTrigger className={cn("h-8 text-xs bg-gray-800 border-primary/30", inputClassName)}>
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
      <div className={cn("flex items-center gap-2 w-full", className)}>
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
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className={cn("h-8 text-xs bg-gray-800 border-primary/30", inputClassName)}
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
      onClick={() => canEdit && setIsEditing(true)}
    >
      <span className={cn("truncate", type === "textarea" && "whitespace-pre-wrap truncate-none")}>{value}</span>
      {canEdit && (
        <PencilIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
      )}
    </div>
  );
};
