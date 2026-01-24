"use client";

import { useRouter } from "next/navigation";
import React, { useContext, useSyncExternalStore } from "react";

type UserMode = "freelancer" | "employer";

interface UserModeContext {
  mode: UserMode;
  setMode: (mode: UserMode) => void;
  toggleMode: () => void;
  isFreelancer: boolean;
  isEmployer: boolean;
}

export const UserModeContext = React.createContext<UserModeContext | undefined>(
  undefined,
);

interface UserModeProviderProps {
  children: React.ReactNode;
  defaultMode?: UserMode;
}

// Create a store factory to use defaultMode
function createUserModeStore(defaultMode: UserMode) {
  return {
    listeners: new Set<() => void>(),
    defaultMode,

    getSnapshot(): UserMode {
      if (typeof window === "undefined") return this.defaultMode;
      const savedMode = localStorage.getItem("userMode") as UserMode | null;
      return savedMode &&
        (savedMode === "freelancer" || savedMode === "employer")
        ? savedMode
        : this.defaultMode;
    },

    getServerSnapshot(): UserMode {
      return this.defaultMode;
    },

    subscribe(listener: () => void) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    },

    setMode(mode: UserMode) {
      localStorage.setItem("userMode", mode);
      document.cookie = `userMode=${mode}; path=/; max-age=31536000`;
      this.listeners.forEach((listener) => listener());
    },
  };
}

export function UserModeProvider({
  children,
  defaultMode = "freelancer",
}: UserModeProviderProps) {
  const router = useRouter();

  // Create store with the provided defaultMode
  const store = React.useMemo(
    () => createUserModeStore(defaultMode),
    [defaultMode],
  );

  const mode = useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getSnapshot(),
    () => store.getServerSnapshot(),
  );

  const setMode = (newMode: UserMode) => {
    store.setMode(newMode);
    router.refresh();
  };

  const toggleMode = () => {
    const newMode = mode === "freelancer" ? "employer" : "freelancer";
    setMode(newMode);
  };

  const value: UserModeContext = {
    mode,
    setMode,
    toggleMode,
    isFreelancer: mode === "freelancer",
    isEmployer: mode === "employer",
  };

  return (
    <UserModeContext.Provider value={value}>
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);
  if (context === undefined) {
    throw new Error("useUserMode must be used within a UserModeProvider");
  }
  return context;
}
