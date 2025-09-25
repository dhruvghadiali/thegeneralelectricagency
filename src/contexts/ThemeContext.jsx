import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => null,
  toggleTheme: () => null,
})

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children, defaultTheme = 'light', ...props }) => {
  const [theme, setTheme] = useState(() => {
    // Safely get theme from localStorage or use default
    if (typeof window !== 'undefined') {
      try {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
          return storedTheme
        }
      } catch (error) {
        console.warn('Failed to read theme from localStorage:', error)
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      if (['light', 'dark', 'system'].includes(newTheme)) {
        try {
          localStorage.setItem('theme', newTheme)
          setTheme(newTheme)
        } catch (error) {
          console.warn('Failed to save theme to localStorage:', error)
          setTheme(newTheme) // Still set theme even if localStorage fails
        }
      }
    },
    toggleTheme: () => {
      const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
      try {
        localStorage.setItem('theme', newTheme)
        setTheme(newTheme)
      } catch (error) {
        console.warn('Failed to save theme to localStorage:', error)
        setTheme(newTheme) // Still set theme even if localStorage fails
      }
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
