import { IconPdf } from "@tabler/icons-react";
import { Dock, DockIcon } from "lucide-react";
import React from "react";

const DocSection = () => {
  return (
    <div className="py-20">
      <div className="container">
        <h3 className="text-center font-heading text-xl sm:text-4xl mb-10">
          Docs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="border p-5 rounded-xl flex bg-cardBg items-center gap-3 justify-center">
            <Dock />
            GAMES-REPORTS-16276JPG
          </div>
          <div className="border p-5 rounded-xl flex bg-cardBg items-center gap-3 justify-center">
            <Dock />
            GAMES-REPORTS-16276JPG
          </div>
          <div className="border p-5 rounded-xl flex bg-cardBg items-center gap-3 justify-center">
            <Dock />
            GAMES-REPORTS-16276JPG
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocSection;
