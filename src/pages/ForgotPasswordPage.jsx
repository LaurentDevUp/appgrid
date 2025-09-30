import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, ArrowRight, Shield, KeyRound } from 'lucide-react'
import { supabase } from '../lib/supabase.js'

const schema = z.object({
  email: z.string().email({ message: 'Email invalide' })
})

export default function ForgotPasswordPage() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: '' }
  })

  const onSubmit = async (values) => {
    setError('')
    setLoading(true)
    setSuccess(false)
    
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSuccess(true)
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-card">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <KeyRound className="w-9 h-9 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Mot de passe oublié</h1>
            <p className="text-muted-foreground">
              Entrez votre adresse email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {success ? (
            <div className="space-y-6">
              <div className="rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-4 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-green-900 dark:text-green-400">Email envoyé !</h4>
                  <p className="text-sm text-green-700 dark:text-green-500 mt-1">
                    Vérifiez votre boîte mail. Si vous ne recevez pas d'email dans quelques minutes, vérifiez vos spams.
                  </p>
                </div>
              </div>

              <a
                href="/login"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/70 transition-all group"
              >
                <span>Retour à la connexion</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ) : (
            <>
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

                {error && (
                  <div className="rounded-xl bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 p-4 text-sm text-red-700 dark:text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le lien</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Vous vous souvenez de votre mot de passe ?{' '}
                <a href="/login" className="font-semibold text-primary hover:text-primary/80 transition-colors">
                  Se connecter
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
              Récupération sécurisée
            </h2>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Nous vous enverrons un lien sécurisé pour réinitialiser votre mot de passe. Le lien expire après 1 heure.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: 'Sécurité maximale',
                description: 'Lien unique à usage unique'
              },
              {
                icon: Mail,
                title: 'Email vérifié',
                description: 'Envoyé uniquement à votre adresse enregistrée'
              },
              {
                icon: KeyRound,
                title: 'Réinitialisation simple',
                description: 'Créez un nouveau mot de passe en quelques clics'
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
              Besoin d'aide ? Contactez notre support à{' '}
              <a href="mailto:support@appgrid.fr" className="font-semibold text-primary-foreground hover:underline">
                support@appgrid.fr
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
