import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '../lib/supabase.js'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.jsx'
import { Alert } from '../components/Alert.jsx'
import { useI18n } from '../i18n/useI18n.js'

// Schéma Zod d'inscription: email valide, password >= 8, confirmPassword identique
const SignUpSchema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Au moins 8 caractères' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les mots de passe ne correspondent pas'
})

export default function SignUpPage() {
  const t = useI18n()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // Redirection avec message d'information
    window.location.assign('/login?signup=success')
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 md:px-6">
      <div className="w-full max-w-md md:max-w-lg">
        <Card className="shadow-md md:shadow-lg bg-white dark:bg-white text-gray-900 dark:text-gray-900">
          <CardHeader className="text-center items-center">
            <img
              src={t.app.logo}
              alt="Logo AppGrid"
              className="mx-auto mb-4 h-32 md:h-40 lg:h-48 w-auto"
            />
            <CardTitle>{t.signup.title}</CardTitle>
            <CardDescription>{t.signup.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            {error ? (
              <Alert variant="error" role="alert" className="mb-4">{error}</Alert>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6" noValidate>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="email">{t.signup.emailLabel}</label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.signup.emailPlaceholder}
                  aria-invalid={!!formState.errors.email}
                  aria-describedby={formState.errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {formState.errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="password">{t.signup.passwordLabel}</label>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!formState.errors.password}
                  aria-describedby={formState.errors.password ? 'password-error' : undefined}
                  {...register('password')}
                />
                {formState.errors.password && (
                  <p id="password-error" className="mt-1 text-sm text-red-600">{formState.errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="confirmPassword">{t.signup.confirmPasswordLabel}</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  aria-invalid={!!formState.errors.confirmPassword}
                  aria-describedby={formState.errors.confirmPassword ? 'confirm-password-error' : undefined}
                  {...register('confirmPassword')}
                />
                {formState.errors.confirmPassword && (
                  <p id="confirm-password-error" className="mt-1 text-sm text-red-600">{formState.errors.confirmPassword.message}</p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full md:h-12 md:px-6">
                {loading ? t.signup.submitting : t.signup.submit}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {t.signup.loginHint}{' '}
              <a className="underline hover:no-underline" href="/login">{t.signup.loginLink}</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
