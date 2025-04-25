
import React from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import Layout from "@/components/Layout";
import { Moon, Sun, Indonesian, English, Chinese } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useSettings();
  const { t } = useTranslation(language);

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">{t("settings")}</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("themeLabel")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {theme === "light" ? (
                    <Sun className="h-5 w-5 mr-2 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 mr-2 text-blue-400" />
                  )}
                  <span>
                    {theme === "light" ? t("lightMode") : t("darkMode")}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? t("darkMode") : t("lightMode")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("languageLabel")}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={language}
                onValueChange={(value) => setLanguage(value as "en" | "id" | "zh")}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="lang-en" />
                  <Label htmlFor="lang-en" className="flex items-center">
                    <English className="h-4 w-4 mr-2" />
                    {t("english")} 🇺🇸
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="id" id="lang-id" />
                  <Label htmlFor="lang-id" className="flex items-center">
                    <Indonesian className="h-4 w-4 mr-2" />
                    {t("indonesian")} 🇮🇩
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="zh" id="lang-zh" />
                  <Label htmlFor="lang-zh" className="flex items-center">
                    <Chinese className="h-4 w-4 mr-2" />
                    {t("chinese")} 🇨🇳
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
