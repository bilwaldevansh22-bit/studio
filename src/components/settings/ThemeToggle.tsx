
"use client";

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDarkMode = !isDarkMode;
    setIsDarkMode(newIsDarkMode);
    if (newIsDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    // Avoid rendering toggle until client-side hydration is complete
    // to prevent mismatch with server-rendered HTML if needed
    return (
      <div className="flex items-center space-x-2">
        <div className="w-9 h-5 bg-muted rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className={`h-5 w-5 transition-colors ${!isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle dark mode"
      />
      <Moon className={`h-5 w-5 transition-colors ${isDarkMode ? 'text-primary' : 'text-muted-foreground'}`} />
    </div>
  );
};

export default ThemeToggle;
