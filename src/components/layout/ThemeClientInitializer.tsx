
"use client";

import { useEffect } from 'react';

export default function ThemeClientInitializer() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Mark as mounted to potentially help child components avoid hydration mismatches
    // if they also check for theme.
    document.documentElement.setAttribute('data-theme-initialized', 'true');
  }, []);

  return null; // This component does not render any UI
}
