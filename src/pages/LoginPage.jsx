import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, ArrowRight, Shield, Zap, Users } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useI18n } from '../i18n/useI18n.js'

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
    navigate('/dashboard', { replace: true })
  }

  const signupSuccess = useMemo(() => {
    const sp = new URLSearchParams(window.location.search)
    return sp.get('signup') === 'success'
  }, [])

  const features = [
    {
      icon: Shield,
      title: 'Sécurisé et conforme',
      description: 'Respect des réglementations DGAC'
    },
    {
      icon: Zap,
      title: 'Rapide et efficace',
      description: 'Interface intuitive et performante'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Travaillez en équipe facilement'
    }
  ]

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-start justify-center p-8 pt-6 md:pt-10 lg:pt-12 bg-card">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <img
              src="/images/Grid310x310.png"
              alt="AppGrid"
              className="mx-auto w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-2xl shadow-lg object-contain"
            />
            <h1 className="text-3xl font-bold text-foreground">Bienvenue</h1>
            <p className="text-muted-foreground">Connectez-vous à votre compte télépilote</p>
          </div>

          {signupSuccess && (
            <div className="rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-400">Vérifiez votre boîte mail</h4>
                <p className="text-sm text-green-700 dark:text-green-500 mt-1">Un email de confirmation vous a été envoyé.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Adresse email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="votre.email@exemple.fr"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-foreground placeholder:text-muted-foreground"
                  aria-invalid={!!formState.errors.email}
                  {...register('email')}
                />
              </div>
              {formState.errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Mot de passe
                </label>
                <a href="/forgot-password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-foreground"
                  aria-invalid={!!formState.errors.password}
                  {...register('password')}
                />
              </div>
              {formState.errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-primary/40"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-foreground">
                Se souvenir de moi
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Se connecter</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Vous n'avez pas de compte ?{' '}
            <a href="/signup" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Créer un compte
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-primary-foreground leading-tight">
              Gérez vos missions de vol en toute simplicité
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Plateforme professionnelle pour télépilotes de drones. Suivez vos vols, gérez vos certifications et optimisez vos opérations.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary-foreground/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-foreground mb-1">{feature.title}</h3>
                    <p className="text-primary-foreground/70">{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
            {[
              { value: '2K+', label: 'Télépilotes' },
              { value: '15K+', label: 'Vols' },
              { value: '99.9%', label: 'Uptime' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
