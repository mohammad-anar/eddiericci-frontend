"use client";

import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  value: number;
}

interface SkillCategory {
  category: string;
  color: string;
  skills: Skill[];
  borderColor: string;
}

const skillCategories: SkillCategory[] = [
  {
    category: "Technical",
    color: "#0077FF",
    borderColor: "border-l-blue-500",
    skills: [
      { name: "Ball Control", value: 90 },
      { name: "Dribbling", value: 85 },
      { name: "Short Passing", value: 92 },
      { name: "Long Passing", value: 88 },
      { name: "Crossing", value: 82 },
      { name: "Shooting", value: 78 },
      { name: "Finishing", value: 75 },
      { name: "Long Shots", value: 80 },
    ],
  },
  {
    category: "Tactical",
    color: "#00FF62",
    borderColor: "border-l-green-500",
    skills: [
      { name: "Positioning", value: 88 },
      { name: "Vision", value: 91 },
      { name: "Anticipation", value: 86 },
      { name: "Composition", value: 84 },
      { name: "Teamwork", value: 89 },
      { name: "Work Rate", value: 87 },
      { name: "Decisions", value: 85 },
      { name: "Concentration", value: 83 },
    ],
  },
  {
    category: "Physical",
    color: "#FF1010",
    borderColor: "border-l-red-500",
    skills: [
      { name: "Acceleration", value: 78 },
      { name: "Sprint Speed", value: 76 },
      { name: "Stamina", value: 85 },
      { name: "Strength", value: 72 },
      { name: "Balance", value: 83 },
      { name: "Agility", value: 81 },
      { name: "Reactions", value: 86 },
      { name: "Jumping", value: 70 },
    ],
  },
  {
    category: "Mental",
    color: "#ffffff",
    borderColor: "border-l-yellow-500",
    skills: [
      { name: "Aggression", value: 65 },
      { name: "Interceptions", value: 74 },
      { name: "Att. Position", value: 87 },
      { name: "Leadership", value: 79 },
      { name: "Bravery", value: 73 },
      { name: "Determination", value: 88 },
      { name: "Flair", value: 85 },
      { name: "Influence", value: 82 },
    ],
  },
];

export function SkillsAttributes() {
  return (
    <div className="container mt-20">
      <h1 className="text-4xl font-light text-center font-heading mb-8 text-foreground tracking-wide">
        SKILLS ATTRIBUTES
      </h1>

      <div className="border border-border bg-slate-300/10 rounded-2xl p-8">
        <div className="grid grid-cols-4 gap-8">
          {skillCategories.map((category) => (
            <div key={category.category} className={`space-y-4 pl-6`}>
              <h2 className={`text-xl border-l-4 font-heading ${
                        category.category === "Technical"
                          ? "border-blue"
                          : category.category === "Physical"
                            ? "border-red"
                            : category.category === "Tactical"
                              ? "border-primary"
                              : "border-yellow"
                      } pl-4  text-foreground`}>
                {category.category}
              </h2>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-semibold text-gray-300">
                        {skill.value}
                      </span>
                    </div>
                    <Progress
                      value={skill.value}
                      className={`h-2 ${
                        category.category === "Technical"
                          ? "[&>div]:bg-blue"
                          : category.category === "Physical"
                            ? "[&>div]:bg-red"
                            : category.category === "Tactical"
                              ? "[&>div]:bg-primary"
                              : "[&>div]:bg-yellow"
                      }`}
                      style={{ background: "#ffffff" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
