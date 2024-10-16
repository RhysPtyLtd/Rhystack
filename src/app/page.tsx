"use client";

import { useState, ReactNode } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ExternalLink from "./components/ExternalLink";

type TaskItem = {
  id: number;
  content: ReactNode;
  steps?: string[];
  completed: boolean;
  hasCheckbox?: boolean;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 1,
      content:
        "Pull and run the Rhystack repo (you've already done this, give yourself a tick 🥳)",
      completed: false,
      hasCheckbox: true,
    },
    {
      id: 2,
      content: (
        <div>
          Create or sign in to your{" "}
          <ExternalLink href="https://aws.amazon.com/">
            AWS account
          </ExternalLink>
        </div>
      ),
      completed: false,
      hasCheckbox: true,
    },
    {
      id: 3,
      content: (
        <div className="bg-blue-100 p-4 rounded">
          <p>This is an info component with some extra guidance.</p>
        </div>
      ),
      completed: false,
      hasCheckbox: false,
    },
    {
      id: 4,
      content: "Step 3: Set up Tailwind CSS",
      completed: false,
      hasCheckbox: true,
    },
    {
      id: 5,
      content: <span>This is in a span tag</span>,
      completed: false,
      hasCheckbox: false,
    },
  ]);

  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const toggleTask = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleExpand = (taskId: number) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Checklist</h1>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mb-4">
              <div className="flex items-center w-full">
                {/* Render the checkbox only if the task has it */}
                {task.hasCheckbox && (
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="h-5 w-5 text-blue-500 rounded"
                  />
                )}
                {task.steps ? (
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className={`flex-grow flex items-center justify-between ${
                      task.hasCheckbox ? "ml-3" : ""
                    } p-2 hover:bg-gray-100 rounded`}
                  >
                    <span
                      className={`text-lg ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.content}
                    </span>
                    {expandedTask === task.id ? (
                      <FiChevronUp size={24} />
                    ) : (
                      <FiChevronDown size={24} />
                    )}
                  </button>
                ) : (
                  <span
                    className={`ml-3 text-lg ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.content}
                  </span>
                )}
              </div>

              {expandedTask === task.id && task.steps && (
                <ul className="ml-10 mt-2 list-disc text-gray-600">
                  {task.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
