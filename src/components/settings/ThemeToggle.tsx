"use client";

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  // Initialize state from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply the theme on initial mount
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    localStorage.setItem('theme', newIsDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };

  if (!mounted) {
    // Render a placeholder to avoid layout shift and hydration mismatch
    return (
      <div className="flex items-center space-x-2 h-9 w-[90px]">
        <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
        <div className="w-11 h-6 bg-muted rounded-full animate-pulse" />
        <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 transition-colors ${!isDarkMode ? 'text-amber-500' : 'text-muted-foreground'}`} />
      <Switch
        id="theme-toggle-switch"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default ThemeToggle;
