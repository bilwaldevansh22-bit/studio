"use client";

import { useEffect } from 'react';

export default function ThemeClientInitializer() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
       document.documentElement.classList.add('dark');
    }
  }, []);

  return null;
}
