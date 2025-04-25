
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export type TaskCategory = "gym" | "run" | "work" | "design" | string;

export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  dueDate: Date | null;
  completed: boolean;
  important: boolean;
  createdAt: Date;
}

interface TaskContextType {
  tasks: Task[];
  categories: CategoryItem[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "completed">) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompleted: (id: string) => void;
  toggleTaskImportant: (id: string) => void;
  addCategory: (category: CategoryItem) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

const DEFAULT_CATEGORIES: CategoryItem[] = [
  { id: "gym", label: "gym", icon: "🏋️" },
  { id: "run", label: "run", icon: "🏃" },
  { id: "work", label: "work", icon: "💼" },
  { id: "design", label: "design", icon: "🎨" },
];

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks, (key, value) => {
          if (key === "dueDate" || key === "createdAt") {
            return value ? new Date(value) : null;
          }
          return value;
        });
      } catch (error) {
        console.error("Failed to parse saved tasks:", error);
        return [];
      }
    }
    return [];
  });

  const [categories, setCategories] = useState<CategoryItem[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      try {
        return JSON.parse(savedCategories);
      } catch (error) {
        console.error("Failed to parse saved categories:", error);
        return DEFAULT_CATEGORIES;
      }
    }
    return DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks, (key, value) => {
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      })
    );
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added successfully");
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const toggleTaskCompleted = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleTaskImportant = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const addCategory = (category: CategoryItem) => {
    // Check if category with this ID already exists
    if (categories.some(c => c.id === category.id)) {
      toast.error("Category already exists");
      return;
    }

    setCategories((prevCategories) => [...prevCategories, category]);
    toast.success("Category added successfully");
  };

  const value = {
    tasks,
    categories,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompleted,
    toggleTaskImportant,
    addCategory,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
