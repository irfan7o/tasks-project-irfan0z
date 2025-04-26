
import React, { useState } from "react";
import { Plus, Check, Keyboard, KeyboardMusic } from "lucide-react";
import { TaskCategory } from "@/contexts/TaskContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryPickerProps {
  value: TaskCategory;
  onChange: (category: TaskCategory) => void;
  categories: Array<{ id: string; label: string; icon: string }>;
  onAddCategory: (category: { id: string; label: string; icon: string }) => void;
}

const EMOJI_OPTIONS = [
  "📝", "🎹", "🎮", "⌨️", "🎛️", 
  "🖥️", "💻", "📱", "🎚️", "🔤"
];

// Added keyboard icon options
const ICON_OPTIONS = [
  { name: "Keyboard", component: <Keyboard className="h-5 w-5" /> },
  { name: "KeyboardMusic", component: <KeyboardMusic className="h-5 w-5" /> },
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
  const [useEmojiIcons, setUseEmojiIcons] = useState(true);
  const [selectedKeyboardIcon, setSelectedKeyboardIcon] = useState(ICON_OPTIONS[0].name);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    
    const newId = newCategoryName.toLowerCase().replace(/\s+/g, "-");
    onAddCategory({
      id: newId,
      label: newCategoryName,
      icon: useEmojiIcons ? selectedIcon : selectedKeyboardIcon,
    });
    
    onChange(newId);
    setNewCategoryName("");
    setSelectedIcon(EMOJI_OPTIONS[0]);
    setSelectedKeyboardIcon(ICON_OPTIONS[0].name);
    setIsAddingCategory(false);
  };

  const selectedCategory = categories.find(cat => cat.id === value);

  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {selectedCategory ? (
                <div className="flex items-center gap-2">
                  <span className="mr-1">{selectedCategory.icon}</span>
                  <span>{t(selectedCategory.label)}</span>
                </div>
              ) : (
                t("selectCategory")
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center gap-2">
                  <span className="mr-1">{category.icon}</span>
                  <span>{t(category.label)}</span>
                </div>
              </SelectItem>
            ))}
            <div className="border-t border-muted-foreground/20 my-1 pt-1">
              <Button
                type="button"
                variant="ghost"
                className="w-full flex items-center justify-start"
                onClick={() => {
                  setIsAddingCategory(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t("addCategory")}
              </Button>
            </div>
          </SelectContent>
        </Select>
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
              <div className="flex justify-between items-center mb-2">
                <Label>{t("chooseIcon")}</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    size="sm"
                    variant={useEmojiIcons ? "default" : "outline"}
                    onClick={() => setUseEmojiIcons(true)}
                  >
                    Emoji
                  </Button>
                  <Button 
                    type="button" 
                    size="sm"
                    variant={!useEmojiIcons ? "default" : "outline"}
                    onClick={() => setUseEmojiIcons(false)}
                  >
                    Keyboard
                  </Button>
                </div>
              </div>
              
              {useEmojiIcons ? (
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
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {ICON_OPTIONS.map((icon) => (
                    <Button
                      key={icon.name}
                      type="button"
                      variant={selectedKeyboardIcon === icon.name ? "default" : "outline"}
                      className="h-10 flex justify-center items-center"
                      onClick={() => setSelectedKeyboardIcon(icon.name)}
                    >
                      {icon.component}
                    </Button>
                  ))}
                </div>
              )}
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
