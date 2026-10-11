import { useEffect, useMemo } from 'react'

import { ThemeContext } from './theme-context'

/**
 * Light-theme-only provider.
 *
 * Dark / system themes are intentionally disabled project-wide.
 * The `dark` class is never applied to <html>, any persisted theme
 * preference is cleared, and setTheme/toggleTheme are no-ops.
 */
const FORCED_THEME = 'light'

// `defaultTheme` is accepted and ignored so existing call sites keep working.
export const ThemeProvider = ({ children, defaultTheme: _defaultTheme, ...props }) => {
  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('dark')
    root.classList.add(FORCED_THEME)
    root.style.colorScheme = FORCED_THEME

    // Drop any stale preference saved before dark mode was removed.
    try {
      if (localStorage.getItem('theme')) {
        localStorage.removeItem('theme')
      }
    } catch {
      // localStorage unavailable — nothing to clean up.
    }
  }, [])

  const value = useMemo(
    () => ({
      theme: FORCED_THEME,
      setTheme: () => null,
      toggleTheme: () => null,
    }),
    []
  )

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
