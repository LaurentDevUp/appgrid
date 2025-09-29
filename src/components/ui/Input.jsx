import React from 'react'

export const Input = React.forwardRef(function Input({ className = '', ...props }, ref) {
  const base = 'flex h-11 w-full rounded-xl border bg-background px-3 py-2 text-sm text-foreground shadow-sm ring-offset-background placeholder:text-muted-foreground dark:placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
  return <input ref={ref} className={`${base} ${className}`} {...props} />
})
