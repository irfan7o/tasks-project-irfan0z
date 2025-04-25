
import React from "react";
import { format } from "date-fns";
import { Check, Trash2, Edit, Flag, FlagOff } from "lucide-react";
import { useTasks, Task } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit }) => {
  const { toggleTaskCompleted, toggleTaskImportant, deleteTask, categories } = useTasks();
  const { language } = useSettings();
  const { t } = useTranslation(language);

  const handleDelete = () => {
    deleteTask(task.id);
    toast.success(t("taskDeleted"));
  };

  const isOverdue = task.dueDate && new Date() > task.dueDate && !task.completed;

  // Get the icon for the category
  const getCategoryIcon = () => {
    const category = categories.find(c => c.id === task.category);
    return category ? category.icon : "📝";
  };

  return (
    <div className={`task-card animate-fade-in ${task.completed ? "opacity-70" : ""}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => toggleTaskCompleted(task.id)}
          className="mt-1.5"
        />
        
        <div className="flex-grow">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 
                className={`font-medium text-base ${task.completed ? "line-through text-muted-foreground" : ""}`}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`text-sm mt-1 ${task.completed ? "text-muted-foreground" : ""}`}>
                  {task.description}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => toggleTaskImportant(task.id)}
              >
                {task.important ? (
                  <Flag className="h-4 w-4 text-red-500" />
                ) : (
                  <FlagOff className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <span 
                className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-secondary"
              >
                <span className="mr-1">{getCategoryIcon()}</span>
                {t(task.category)}
              </span>
              
              {task.dueDate && (
                <span 
                  className={`text-xs ${
                    isOverdue ? "text-red-500 font-medium" : "text-muted-foreground"
                  }`}
                >
                  {format(task.dueDate, "MMM d, HH:mm")}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
