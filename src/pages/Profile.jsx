import React from 'react'
import { useUserStore } from '../store/user.js'
import { useI18n } from '../i18n/useI18n.js'

export default function Profile() {
  const t = useI18n()
  const user = useUserStore((s) => s.user)

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Profil</h1>
      <div className="rounded-lg border bg-card p-4">
        {user ? (
          <form className="grid grid-cols-1 gap-6" noValidate>
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <img src={t.app.logo} alt="Avatar" className="h-16 w-16 rounded-full object-cover ring-2 ring-primary/20" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{user.email}</p>
              </div>
            </div>

            {/* Données personnelles */}
            <section aria-labelledby="section-personal" className="rounded-xl border bg-card/60 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 9a7 7 0 0 1 14 0v1H5z"/>
                  </svg>
                </span>
                <h2 id="section-personal" className="text-base font-semibold">Données personnelles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="first_name">Prénom</label>
                  <input id="first_name" type="text" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Prénom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="last_name">Nom</label>
                  <input id="last_name" type="text" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email" className="w-full rounded-md border px-3 py-2 bg-muted text-muted-foreground" value={user.email || ''} readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="department">Département</label>
                  <input id="department" type="text" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Ex: SDIS78" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="unit">Autre spécialité</label>
                  <input id="unit" type="text" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Ex: Grimp" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="avatar">Photo de profil</label>
                  <input id="avatar" type="file" accept="image/*" className="block w-full text-sm file:mr-3 file:rounded-md file:border file:bg-background file:px-3 file:py-2 hover:file:bg-accent/50" />
                </div>
              </div>
            </section>

            {/* Données métier */}
            <section aria-labelledby="section-business" className="rounded-xl border bg-card/60 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                </span>
                <h2 id="section-business" className="text-base font-semibold">Données métier</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="role">Rôle / Grade</label>
                  <select id="role" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary">
                    <option value="">Sélectionner…</option>
                    <option value="telepilote">Télépilote</option>
                    <option value="chef">Chef d’unité</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="Pole">Pôle</label>
                  <select id="Pole" className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary">
                    <option value="">Sélectionner…</option>
                    <option value="formation">Formation</option>
                    <option value="securite">Sécurité</option>
                    <option value="donnees">Données</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="recherche">R&D</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1" htmlFor="assets">Accès aux drones / équipements</label>
                  <select id="assets" multiple className="w-full rounded-md border px-3 py-2 min-h-[6rem] focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary">
                    <option>Drone A</option>
                    <option>Drone B</option>
                    <option>Drone C</option>
                    <option>Caméra thermique</option>
                    <option>Radio longue portée</option>
                  </select>
                  <p className="mt-1 text-xs text-muted-foreground">Maintenir Ctrl/Cmd pour sélectionner plusieurs éléments.</p>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold">Compétences / Certifications</h3>
                    <span className="text-xs text-muted-foreground">(UI uniquement — logique à configurer)</span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="rounded-md border p-3 space-y-2">
                      <h4 className="text-sm font-medium">Certification Open A1/A3</h4>
                      <p className="text-xs text-muted-foreground">Détails à configurer</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" aria-label="Date de validité" />
                        <input type="number" min="0" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Rappel (jours)" aria-label="Rappel avant expiration (jours)" />
                      </div>
                    </div>
                    <div className="rounded-md border p-3 space-y-2">
                      <h4 className="text-sm font-medium">Certification A2</h4>
                      <p className="text-xs text-muted-foreground">Détails à configurer</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" aria-label="Date de validité" />
                        <input type="number" min="0" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Rappel (jours)" aria-label="Rappel avant expiration (jours)" />
                      </div>
                    </div>
                    <div className="rounded-md border p-3 space-y-2">
                      <h4 className="text-sm font-medium">Certification STS01/STS02</h4>
                      <p className="text-xs text-muted-foreground">Détails à configurer</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" aria-label="Date de validité" />
                        <input type="number" min="0" className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary" placeholder="Rappel (jours)" aria-label="Rappel avant expiration (jours)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div>
              <button type="button" className="px-4 py-2 rounded-md bg-primary text-primary-foreground shadow-sm hover:shadow-md transition">
                Enregistrer (à configurer)
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun utilisateur connecté.</p>
        )}
      </div>
    </section>
  )
}
