import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.innerWidth < 1024 // Collapsed by default on mobile
  );
  const [isDarkMode, setIsDarkMode] = useState(true); // Always true for this app
  
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <UIContext.Provider
      value={{
        isSidebarCollapsed,
        toggleSidebar,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};
