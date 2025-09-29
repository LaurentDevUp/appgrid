import React from 'react'
import { useUserStore } from '../store/user.js'
import { useI18n } from '../i18n/useI18n.js'

export default function Dashboard() {
  const t = useI18n()
  const user = useUserStore((s) => s.user)
  return (
    <section>
      <h1 className="text-2xl font-semibold">{t.dashboard.title}</h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Carte d'accueil étirée */}
        <div className="rounded-lg border bg-card p-4 h-full md:col-span-2 lg:col-span-2">
          <p>{t.dashboard.welcome} {user?.email}</p>
          <p className="text-sm text-muted-foreground">{t.dashboard.protected}</p>
        </div>
        {/* Blocs libres pour futurs éléments */}
        <div className="rounded-lg border bg-card p-4 h-32">Bloc libre</div>
        <div className="rounded-lg border bg-card p-4 h-32">Bloc libre</div>
        <div className="rounded-lg border bg-card p-4 h-32 lg:col-span-3">Bloc libre</div>
      </div>
    </section>
  )
}
