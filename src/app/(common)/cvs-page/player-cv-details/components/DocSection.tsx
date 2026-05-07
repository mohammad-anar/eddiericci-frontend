"use client";
import { IconPdf } from "@tabler/icons-react";
import { Dock, DockIcon } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const DocSection = ({ editable = false }: { editable?: boolean }) => {
  const [docs, setDocs] = useState([
    { id: 1, title: "GAMES-REPORTS-16276JPG" },
    { id: 2, title: "GAMES-REPORTS-16276JPG" },
    { id: 3, title: "GAMES-REPORTS-16276JPG" },
  ]);

  const handleUpdate = (id: number, value: string) => {
    setDocs(prev => prev.map(doc => doc.id === id ? { ...doc, title: value } : doc));
  };

  return (
    <div className="py-20">
      <div className="container">
        <h3 className="text-center font-heading text-wrap text-xl sm:text-4xl mb-10">
          Docs / Game Reports / Evaluations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docs.map((doc) => (
            <div key={doc.id} className="border p-5 rounded-xl flex bg-cardBg items-center gap-3 justify-center">
              <Dock />
              {editable ? (
                <Input 
                  value={doc.title} 
                  onChange={(e) => handleUpdate(doc.id, e.target.value)}
                  className="h-8 text-xs bg-transparent border-none text-center"
                />
              ) : (
                doc.title
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocSection;
