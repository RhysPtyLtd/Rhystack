// app/page.tsx
"use client";
import { useState } from "react";

export default function HomePage() {
  const [tasks, setTasks] = useState([
    { id: 1, task: "Step 1: Create a Next.js App", completed: false },
    { id: 2, task: "Step 2: Initialize Git", completed: false },
    { id: 3, task: "Step 3: Set up Tailwind CSS", completed: false },
    { id: 4, task: "Step 4: Build a checklist", completed: false },
  ]);

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Checklist</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 text-blue-500 rounded"
              />
              <span
                className={`ml-3 text-lg ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.task}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
