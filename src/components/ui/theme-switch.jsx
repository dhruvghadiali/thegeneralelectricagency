import { Check, Moon, Settings, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/useTheme'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const activeTheme = theme === 'system' ? 'light' : theme

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const selectTheme = (nextTheme) => {
    setTheme(nextTheme)
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((value) => !value)}
        className="h-9 w-9 rounded-full text-secondary hover:bg-secondary hover:text-primary"
        title="Theme settings"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <Settings className="h-4 w-4" />
        <span className="sr-only">Open theme settings</span>
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 top-11 z-[10000] min-w-36 rounded-xl border border-white/20 bg-white/95 p-1.5 text-gray-900 shadow-xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-100"
          role="menu"
        >
          <button
            type="button"
            onClick={() => selectTheme('light')}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            role="menuitem"
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
            {activeTheme === 'light' && <Check className="ml-auto h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => selectTheme('dark')}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            role="menuitem"
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
            {activeTheme === 'dark' && <Check className="ml-auto h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}
