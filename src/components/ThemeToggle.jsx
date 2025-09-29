import React from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = React.useState(() => document.documentElement.classList.contains('dark') ? 'dark' : 'light')

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === 'dark'}
      className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Basculer le thème"
      title="Basculer le thème"
    >
      {theme === 'dark' ? (
        <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.64 13A9 9 0 1 1 11 2.36 7 7 0 0 0 21.64 13z"/>
        </svg>
      ) : (
        <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm7-5a1 1 0 0 1 1 1h1a1 1 0 1 1 0 2h-1a1 1 0 1 1-2 0 1 1 0 0 1 1-1zm-7 6a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zM4 12a1 1 0 0 1 1-1H6a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1zm11.66 5.66a1 1 0 0 1 1.41 0l.71.71a1 1 0 0 1-1.41 1.41l-.71-.71a1 1 0 0 1 0-1.41zM6.22 6.22a1 1 0 0 1 1.41 0l.71.71A1 1 0 0 1 6.93 8.34l-.71-.71a1 1 0 0 1 0-1.41zm12.02-1.41a1 1 0 0 1 0 1.41l-.71.71a1 1 0 0 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0zM6.93 16.9a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0z"/>
        </svg>
      )}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Mode sombre' : 'Mode clair'}</span>
    </button>
  )
}
