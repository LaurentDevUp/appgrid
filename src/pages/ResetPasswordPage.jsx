import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, Shield, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const schema = z.object({
  password: z.string().min(8, { message: 'Au moins 8 caractères' }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Les mots de passe ne correspondent pas'
})

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' }
  })

  useEffect(() => {
    // Vérifier si on a un token de récupération dans l'URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const type = hashParams.get('type')
    
    if (type !== 'recovery' || !accessToken) {
      setError('Lien de réinitialisation invalide ou expiré')
    }
  }, [])

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    
    const { error } = await supabase.auth.updateUser({
      password: values.password
    })
    
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    
    setSuccess(true)
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 3000)
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Shield className="w-9 h-9 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Nouveau mot de passe</h1>
            <p className="text-muted-foreground">
              Choisissez un mot de passe sécurisé pour votre compte
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-6 flex flex-col items-center gap-4 text-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
                <div>
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-400">Mot de passe modifié !</h4>
                  <p className="text-sm text-green-700 dark:text-green-500 mt-2">
                    Votre mot de passe a été mis à jour avec succès. Vous allez être redirigé vers la page de connexion...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Nouveau mot de passe
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

                <div className="rounded-xl bg-primary/10 border border-primary/20 p-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Votre mot de passe doit contenir :</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Au moins 8 caractères
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Une combinaison de lettres et chiffres (recommandé)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Des caractères spéciaux pour plus de sécurité (recommandé)
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Modification en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Réinitialiser le mot de passe</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                <a href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Retour à la connexion
                </a>
              </p>
            </>
          )}
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
              Sécurisez votre compte
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Choisissez un mot de passe robuste pour protéger vos données et vos opérations de vol.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: 'Protection renforcée',
                description: 'Vos données sont chiffrées de bout en bout'
              },
              {
                icon: Lock,
                title: 'Mot de passe sécurisé',
                description: 'Utilisez une combinaison unique et complexe'
              },
              {
                icon: CheckCircle,
                title: 'Accès immédiat',
                description: 'Connectez-vous dès la réinitialisation'
              }
            ].map((feature, idx) => {
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

          <div className="pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/70">
              Conseil : utilisez un gestionnaire de mots de passe pour générer et stocker des mots de passe sécurisés.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
