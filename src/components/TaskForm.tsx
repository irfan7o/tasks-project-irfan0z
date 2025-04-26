
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X, Flag } from "lucide-react";
import { useTasks, Task } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CategoryPicker } from "@/components/CategoryPicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface TaskFormProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, isOpen, onClose }) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const { addTask, updateTask, categories, addCategory } = useTasks();

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [category, setCategory] = useState(task?.category || "work");
  const [dueDate, setDueDate] = useState<Date | null>(task?.dueDate || null);
  const [important, setImportant] = useState(task?.important || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    if (task) {
      updateTask(task.id, {
        title,
        description,
        category,
        dueDate,
        important,
      });
    } else {
      addTask({
        title,
        description,
        category,
        dueDate,
        important,
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? t("editTask") : t("addTask")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("taskTitle")} *</Label>
            <Input
              id="title"
              placeholder={t("enterTaskTitle")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("taskDescription")}</Label>
            <Textarea
              id="description"
              placeholder={t("enterTaskDescription")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">{t("taskCategory")}</Label>
            <CategoryPicker
              value={category}
              onChange={setCategory}
              categories={categories}
              onAddCategory={addCategory}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">{t("taskDueDate")}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP HH:mm") : <span>{t("selectDueDate")}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate || undefined}
                  onSelect={(date) => setDueDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
                {dueDate && (
                  <div className="p-3 border-t border-border">
                    <div className="mb-2 text-sm font-medium text-foreground">{t("selectTime")}</div>
                    <div className="relative isolate">
                      <Input
                        type="time"
                        value={dueDate ? format(dueDate, "HH:mm") : ""}
                        onChange={(e) => {
                          if (dueDate && e.target.value) {
                            const [hours, minutes] = e.target.value.split(":");
                            const newDate = new Date(dueDate);
                            newDate.setHours(parseInt(hours));
                            newDate.setMinutes(parseInt(minutes));
                            setDueDate(newDate);
                          }
                        }}
                        className="w-full pointer-events-auto bg-background text-foreground border-input focus:ring-ring z-10"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-muted text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDueDate(null);
                        }}
                      >
                        <X className="h-4 w-4 mr-1" />
                        {t("cancel")}
                      </Button>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="important"
              checked={important}
              onCheckedChange={setImportant}
            />
            <Label htmlFor="important" className="flex items-center">
              <Flag className="h-4 w-4 mr-2 text-red-500" />
              {t("taskImportant")}
            </Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button type="submit" className="todo-button-primary">
              {t("save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
