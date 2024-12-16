"use client";
import { useProgress } from "@/lib/hooks/progressBar";
import React, { createContext } from "react";

export const ProgressBarContext = createContext(null);

const ProgressBar = ({ children }) => {
  const progress = useProgress();

  return (
    <ProgressBarContext.Provider value={progress}>
      {progress.state !== "initial" && (
      <div
        className="fixed top-0 z-50 h-1 bg-gradient-to-r from-blue-500 to-blue-300 duration-300 transition-all ease-in-out"
        style={{ width: `${progress.value}%` }}
      />
      )}
      {children}
    </ProgressBarContext.Provider>
  );
};
export default ProgressBar;