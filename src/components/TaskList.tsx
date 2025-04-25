
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useTasks, Task } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const handleAddTask = () => {
    setTaskToEdit(undefined);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsTaskFormOpen(false);
    setTaskToEdit(undefined);
  };

  // Sort tasks: important first, then by due date, then by creation date
  const sortedTasks = [...tasks].sort((a, b) => {
    // Completed tasks go to the bottom
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    
    // Sort by importance
    if (a.important !== b.important) return a.important ? -1 : 1;
    
    // Sort by due date if both have due dates
    if (a.dueDate && b.dueDate) return a.dueDate.getTime() - b.dueDate.getTime();
    
    // Tasks with due dates come before tasks without due dates
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;
    
    // Sort by creation date
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t("appTitle")}</h1>
        <Button 
          onClick={handleAddTask}
          className="todo-button-primary"
        >
          <Plus className="h-5 w-5 mr-1" />
          {t("addTask")}
        </Button>
      </div>

      <div className="space-y-3">
        {sortedTasks.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>{t("noTasks")}</p>
          </div>
        ) : (
          sortedTasks.map((task) => (
            <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
          ))
        )}
      </div>

      <TaskForm
        task={taskToEdit}
        isOpen={isTaskFormOpen}
        onClose={handleCloseForm}
      />
    </div>
  );
};

export default TaskList;
