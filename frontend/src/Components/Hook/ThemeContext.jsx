import React, { createContext, useContext, useState, useLayoutEffect } from 'react';

// Create a context for the theme
const ThemeContext = createContext();

// Create a provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useLayoutEffect(() => {
    document.querySelector('body').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  return useContext(ThemeContext);
}