import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, UserPlus, ArrowRight, Shield } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { useI18n } from '../i18n/useI18n.js'

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
    window.location.assign('/login?signup=success')
  }

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
            <h1 className="text-3xl font-bold text-foreground">Créer un compte</h1>
            <p className="text-muted-foreground">Rejoignez la plateforme télépilote</p>
          </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Mot de passe
              </label>
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none text-foreground"
                  aria-invalid={!!formState.errors.confirmPassword}
                  {...register('confirmPassword')}
                />
              </div>
              {formState.errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 mt-0.5 rounded border-border text-primary focus:ring-2 focus:ring-primary/40"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-foreground">
                J'accepte les{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  conditions d'utilisation
                </a>{' '}
                et la{' '}
                <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                  politique de confidentialité
                </a>
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
                  <span>Création en cours...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Créer mon compte</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Vous avez déjà un compte ?{' '}
            <a href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Se connecter
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground/50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-primary-foreground leading-tight">
              Rejoignez des milliers de télépilotes
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Créez votre compte gratuitement et accédez à tous les outils pour gérer vos opérations de vol professionnel.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'Gestion complète de vos vols et missions',
              'Suivi automatique des certifications',
              'Collaboration en temps réel avec votre équipe',
              'Rapports et statistiques détaillés',
              'Conformité réglementaire DGAC'
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-primary-foreground/90">{feature}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/70">
              Déjà utilisé par plus de <span className="font-bold text-primary-foreground">2000+ télépilotes</span> en France
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
