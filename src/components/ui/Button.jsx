import React from 'react'

export function Button({ className = '', variant = 'default', size = 'default', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background disabled:opacity-50 disabled:pointer-events-none'
  const variants = {
    default: 'bg-primary text-primary-foreground hover:brightness-110 hover:shadow-md active:translate-y-[1px]',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90'
  }
  const sizes = {
    sm: 'h-9 px-3',
    default: 'h-11 px-5',
    lg: 'h-12 px-6'
  }
  const cls = `${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`
  return <button className={cls} {...props} />
}
