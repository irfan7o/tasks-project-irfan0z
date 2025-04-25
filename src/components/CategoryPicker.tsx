
import React, { useState } from "react";
import { Check, Plus } from "lucide-react";
import { TaskCategory } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface CategoryPickerProps {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
  categories: Array<{ id: string; label: string; icon: string }>;
  onAddCategory: (category: { id: string; label: string; icon: string }) => void;
}

const EMOJI_OPTIONS = [
  "📝", "🏋️", "🏃", "💼", "🎨", "🎓", "📚", "🎯", "🎮", "🛒", 
  "🏠", "🍔", "☕", "🎬", "🎵", "🚗", "💰", "👨‍💻", "📅", "📱"
];

export const CategoryPicker: React.FC<CategoryPickerProps> = ({ 
  value, 
  onChange, 
  categories, 
  onAddCategory 
}) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(EMOJI_OPTIONS[0]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newId = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    onAddCategory({
      id: newId,
      label: newCategoryName,
      icon: selectedIcon,
    });
    
    onChange(newId);
    setNewCategoryName("");
    setSelectedIcon(EMOJI_OPTIONS[0]);
    setIsAddingCategory(false);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            type="button"
            variant={value === category.id ? "default" : "outline"}
            className={`flex items-center justify-start h-12 ${
              value === category.id ? "border-primary" : ""
            }`}
            onClick={() => onChange(category.id)}
          >
            <span className="mr-2">{category.icon}</span>
            <span>{t(category.label)}</span>
            {value === category.id && (
              <Check className="ml-auto h-4 w-4" />
            )}
          </Button>
        ))}
        
        <Button
          type="button"
          variant="outline"
          className="flex items-center justify-center h-12 border-dashed"
          onClick={() => setIsAddingCategory(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("addCategory")}
        </Button>
      </div>

      <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("addNewCategory")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">{t("categoryName")}</Label>
              <Input
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder={t("enterCategoryName")}
              />
            </div>
            
            <div className="space-y-2">
              <Label>{t("chooseIcon")}</Label>
              <div className="grid grid-cols-5 gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <Button
                    key={emoji}
                    type="button"
                    variant={selectedIcon === emoji ? "default" : "outline"}
                    className={`h-10 w-10 p-0 text-xl ${
                      selectedIcon === emoji ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedIcon(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingCategory(false)}
              >
                {t("cancel")}
              </Button>
              <Button 
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
              >
                {t("add")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
