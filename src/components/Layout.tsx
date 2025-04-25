
import React from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";
import { Link, useLocation } from "react-router-dom";
import { Settings, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language } = useSettings();
  const { t } = useTranslation(language);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto py-4 px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-foreground flex items-center gap-2">
            <CheckSquare className="h-6 w-6 text-todo-primary" />
            <span>{t("appTitle")}</span>
          </Link>
          <nav>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className={location.pathname === "/settings" ? "text-primary" : ""}
            >
              <Link to="/settings" aria-label={t("settings")}>
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-6 px-4 md:px-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
