import React from 'react'
import { User, Briefcase, Award, Calendar, MapPin, Mail, Camera, Save, Clock, AlertCircle } from 'lucide-react'
import { useUserStore } from '../store/user.js'
import { useI18n } from '../i18n/useI18n.js'

export default function Profile() {
  const t = useI18n()
  const user = useUserStore((s) => s.user)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Profil</h1>
            <p className="text-muted-foreground mt-1">Gérez vos informations personnelles et professionnelles</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
            <Save className="w-5 h-5" />
            Enregistrer
          </button>
        </div>

        {user ? (
          <>
            {/* Card principale avec avatar */}
            <div className="bg-card rounded-2xl shadow-xl overflow-hidden border">
              <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
                  <div className="flex items-end gap-4">
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-2xl bg-card p-2 shadow-xl border">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-xl object-cover" />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center">
                            <User className="w-16 h-16 text-primary" />
                          </div>
                        )}
                      </div>
                      <button className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="pb-2">
                      <h2 className="text-2xl font-bold text-foreground">Jean Dupont</h2>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-3 text-sm">
                    <div className="px-4 py-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg font-medium">
                      ✓ Profil actif
                    </div>
                    <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                      Télépilote certifié
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille de sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations personnelles */}
              <div className="bg-card rounded-2xl shadow-lg border p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Informations personnelles</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        placeholder="Jean"
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        placeholder="Dupont"
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full pl-12 pr-4 py-3 rounded-xl border bg-muted text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      placeholder="+33 6 12 34 56 78"
                      className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Informations professionnelles */}
              <div className="bg-card rounded-2xl shadow-lg border p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Informations professionnelles</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Département / Organisation
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="SDIS 78"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Rôle / Grade
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none">
                        <option value="">Sélectionner...</option>
                        <option value="telepilote">Télépilote</option>
                        <option value="chef">Chef d'unité</option>
                        <option value="instructeur">Instructeur</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Pôle
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none">
                        <option value="">Sélectionner...</option>
                        <option value="formation">Formation</option>
                        <option value="securite">Sécurité</option>
                        <option value="donnees">Données</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="recherche">R&D</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Date d'entrée
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="date"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Spécialité
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Grimp"
                        className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-card rounded-2xl shadow-lg border p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Certifications & Compétences</h3>
                    <p className="text-sm text-muted-foreground">Gérez vos certifications et dates de validité</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  + Ajouter une certification
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Open A1/A3', status: 'valid', days: 245 },
                  { name: 'A2', status: 'valid', days: 180 },
                  { name: 'STS-01/02', status: 'warning', days: 28 }
                ].map((cert, idx) => (
                  <div key={idx} className="group relative rounded-xl border-2 hover:border-primary/50 p-5 space-y-4 transition-all hover:shadow-lg bg-card">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{cert.name}</h4>
                        <div className={`inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-lg text-xs font-medium ${
                          cert.status === 'valid' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {cert.status === 'valid' ? '✓' : '⚠'} {cert.days}j restants
                        </div>
                      </div>
                      {cert.status === 'warning' && (
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Date de validité
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 text-sm rounded-lg border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1">
                          Rappel (jours avant)
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="30"
                            className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border bg-background focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Heures de vol', value: '247h', icon: Clock },
                { label: 'Missions', value: '142', icon: MapPin },
                { label: 'Certifications', value: '3', icon: Award },
                { label: 'Ancienneté', value: '3 ans', icon: Calendar }
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-card rounded-xl shadow-md border p-5 space-y-2 hover:shadow-lg transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Aucun utilisateur connecté.</p>
        )}
      </div>
    </div>
  )
}
