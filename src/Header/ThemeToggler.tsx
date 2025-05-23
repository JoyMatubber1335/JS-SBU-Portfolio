"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      aria-label="Toggle Theme"
      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition duration-150 ease-in-out hover:text-primary dark:text-gray-400 dark:hover:text-white"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (
        <>
          {/* Sun icon for dark mode (shows when in dark mode) */}
          <svg
            className={`${
              theme === "dark" ? "block" : "hidden"
            } h-5 w-5`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>

          {/* Moon icon for light mode (shows when in light mode) */}
          <svg
            className={`${
              theme === "dark" ? "hidden" : "block"
            } h-5 w-5`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        </>
      )}
    </button>
  );
}; 