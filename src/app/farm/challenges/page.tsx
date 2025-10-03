"use client";

import { useState, useEffect } from "react";
import Topbar from "../../../components/Topbar";

type Challenge = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // Simulate fetching challenges
    setChallenges([
      { id: 1, title: "Plant 10 seeds", description: "Grow 10 new plants.", completed: false },
      { id: 2, title: "Irrigate field", description: "Water your farm once.", completed: false },
      { id: 3, title: "Check soil moisture", description: "Ensure soil is healthy.", completed: true },
    ]);
  }, []);

  const toggleComplete = (id: number) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar title="Farm Challenges" />
      <div className="p-4 grid gap-4">
        {challenges.map((c) => (
          <div
            key={c.id}
            className={`p-4 rounded ${c.completed ? "bg-green-600" : "bg-slate-800"} text-white cursor-pointer`}
            onClick={() => toggleComplete(c.id)}
          >
            <h3 className="font-bold">{c.title}</h3>
            <p>{c.description}</p>
            <p>Status: {c.completed ? "Completed" : "Pending"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
