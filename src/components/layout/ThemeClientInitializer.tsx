
"use client";

import { useEffect } from 'react';

export default function ThemeClientInitializer() {
  useEffect(() => {
    // Theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.classList.add('dark');
    }

    // High Contrast
    const highContrast = localStorage.getItem('highContrast') === 'true';
    document.documentElement.classList.toggle('high-contrast', highContrast);

    // Reduce Motion
    const reduceMotion = localStorage.getItem('reduceMotion') === 'true';
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    
    // Font Size
    const fontSize = localStorage.getItem('fontSize') || 'medium';
    document.documentElement.style.fontSize = fontSize === 'small' ? '14px' : fontSize === 'large' ? '18px' : '16px';


  }, []);

  return null;
}
