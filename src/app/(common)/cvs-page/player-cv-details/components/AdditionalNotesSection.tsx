"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const AdditionalNotesSection = ({ editable = false }: { editable?: boolean }) => {
  const [notes, setNotes] = useState(`Marcus Silva is a highly skilled attacking midfielder ⚽ with exceptional vision 👀, precise passing 🎯, and strong tactical intelligence 🧠.

Versatile across multiple midfield positions, he remains a reliable asset to any squad.

Calm under pressure and consistent in chance creation, he has maintained top-level performance throughout his career.

Currently open to transfer opportunities with top European clubs 🌍 and available for immediate first-team integration.

Medical reports indicate excellent physical condition 💪 with no recurring injuries.`);

  return (
    <div className="mt-20">
      <div className="container bg-cardBg p-8 rounded-xl ">
        <h4 className="text-xl text-primary lg:text-2xl mb-5">
          Additional Notes
        </h4>
        <div className="space-y-5">
          {editable ? (
            <Textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-64 bg-transparent border-gray-700 text-foreground"
            />
          ) : (
            notes.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalNotesSection;
