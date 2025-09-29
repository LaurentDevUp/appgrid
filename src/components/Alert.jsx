import React from 'react'

export function Alert({ variant = 'info', children, className = '', role = 'status' }) {
  const styles = {
    info: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800',
    success: 'bg-green-50 text-green-900 border-green-200 dark:bg-green-950 dark:text-green-100 dark:border-green-800',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800',
    error: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800'
  }
  return (
    <div role={role} className={`rounded-md border p-3 text-sm ${styles[variant] || styles.info} ${className}`}>
      {children}
    </div>
  )
}
