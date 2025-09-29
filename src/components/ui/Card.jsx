import React from 'react'

export function Card({ className = '', ...props }) {
  return <div className={`card p-6 ${className}`} {...props} />
}

export function CardHeader({ className = '', ...props }) {
  return <div className={`mb-4 ${className}`} {...props} />
}

export function CardTitle({ className = '', ...props }) {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
}

export function CardDescription({ className = '', ...props }) {
  return <p className={`text-sm text-muted-foreground ${className}`} {...props} />
}

export function CardContent({ className = '', ...props }) {
  return <div className={`space-y-4 ${className}`} {...props} />
}

export function CardFooter({ className = '', ...props }) {
  return <div className={`mt-6 flex items-center justify-end gap-2 ${className}`} {...props} />
}
