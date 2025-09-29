import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'
import { Button } from '../components/ui/Button.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.jsx'
import { useI18n } from '../i18n/useI18n.js'
import { Alert } from '../components/Alert.jsx'

// Schéma Zod: email valide et mot de passe >= 8 caractères
const schema = z.object({
  email: z.string().email({ message: 'Email invalide' }),
  password: z.string().min(8, { message: 'Au moins 8 caractères' })
})

export default function LoginPage() {
  const t = useI18n()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    // Redirection après succès
    navigate('/dashboard', { replace: true })
  }

  const signupSuccess = useMemo(() => {
    const sp = new URLSearchParams(window.location.search)
    return sp.get('signup') === 'success'
  }, [])

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
            <CardTitle>{t.login.title}</CardTitle>
            <CardDescription>{t.login.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {signupSuccess && (
              <Alert variant="info" className="mb-4">
                Vérifie ta boîte mail pour confirmer ton compte.
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 md:space-y-6" noValidate>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="email">{t.login.emailLabel}</label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.login.emailPlaceholder}
                  aria-invalid={!!formState.errors.email}
                  aria-describedby={formState.errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {formState.errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">{formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="password">{t.login.passwordLabel}</label>
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
              {error ? <p className="text-sm text-red-600" role="alert">{error}</p> : null}
              <Button type="submit" disabled={loading} className="w-full md:h-12 md:px-6">
                {loading ? t.login.submitting : t.login.submit}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              {t.login.signupHint}{' '}
              <a className="underline hover:no-underline" href="/signup">{t.login.signupLink}</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
