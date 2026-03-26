import React from "react";
import { twMerge } from "tailwind-merge";
import { LogOut, Map, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useAuth } from "src/shared/model/auth-context";

type HeaderProps = {
  className?: string;
  bodyClassName?: string;
};

export const Header: React.FC<HeaderProps> = ({ className, bodyClassName }) => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <header
      className={twMerge(
        "fixed left-0 top-0 w-full px-0 py-2 bg-blue-500 shrink-0 z-50",
        className,
      )}
    >
      <div
        className={twMerge(
          "container flex justify-start md:justify-between flex-wrap gap-2",
          bodyClassName,
        )}
      >
        <nav className="flex gap-2 items-center">
          <Link
            to="/"
            className={twMerge(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
              location.pathname === "/"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white",
            )}
          >
            <Map className="w-4 h-4" />
            <span className="hidden sm:inline">Карта</span>
          </Link>
          <Link
            to="/parse-pdf"
            className={twMerge(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium",
              location.pathname === "/parse-pdf"
                ? "bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white",
            )}
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Парсер PDF</span>
          </Link>
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          title="Вийти"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Вийти</span>
        </button>
      </div>
    </header>
  );
};
