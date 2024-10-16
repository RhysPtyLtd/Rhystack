// app/page.tsx
"use client";

import { useState, ReactNode } from "react";

type TaskItem = {
  id: number;
  content: ReactNode; // Allows both text and components
  completed: boolean;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      content:
        "Pull and run the Rhystack repo (you've already done this, give yourself a tick 🥳)",
      completed: false,
    },
    { id: 2, content: "Step 2: Initialize Git", completed: false },
    // Example of adding a custom component between tasks
    {
      id: 3,
      content: (
        <div className="bg-blue-100 p-4 rounded">
          <p>This is an info component with some extra guidance.</p>
        </div>
      ),
      completed: false,
    },
    { id: 4, content: "Step 3: Set up Tailwind CSS", completed: false },
    {
      id: 5,
      content: <span>This is in a span tag</span>,
      completed: false,
    },
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
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Checklist</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4 flex items-start">
              {typeof task.content === "string" ? (
                <>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 text-blue-500 rounded mt-1"
                  />
                  <span
                    className={`ml-3 text-lg ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.content}
                  </span>
                </>
              ) : (
                // Render non-string content directly, such as a component
                <div className="w-full">{task.content}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
