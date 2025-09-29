import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/useI18n.js'

export default function AuthedLayout() {
  const t = useI18n()
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path
  const sideItemCls = (active) => `block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground ${active ? 'bg-accent text-accent-foreground' : ''}`
  const bottomItemCls = (active) => `flex flex-col items-center justify-center py-2 ${active ? 'text-primary' : ''} hover:bg-accent hover:text-accent-foreground`

  return (
    <div className="md:grid md:grid-cols-[240px_1fr] md:gap-6">
      {/* Sidebar desktop */}
      <aside className="hidden md:block">
        <div className="sticky top-4">
          <nav aria-label="Menu principal" className="rounded-lg border bg-card p-3">
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/dashboard" className={sideItemCls(isActive('/dashboard'))} aria-current={isActive('/dashboard') ? 'page' : undefined}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z"/>
                    </svg>
                    Tableau de bord
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className={sideItemCls(isActive('/profile'))} aria-current={isActive('/profile') ? 'page' : undefined}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 9a7 7 0 0 1 14 0v1H5z"/>
                    </svg>
                    Profil
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className={sideItemCls(false)}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                    </svg>
                    Missions
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className={sideItemCls(false)}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 9a7 7 0 0 1 14 0v1H5z"/>
                    </svg>
                    Équipe
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className={sideItemCls(false)}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M7 2h10a2 2 0 0 1 2 2v12l-5 5H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 16h3l-3 3v-3z"/>
                    </svg>
                    Matériel
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className={sideItemCls(false)}>
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm8-6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                    </svg>
                    Paramètres
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Contenu */}
      <section className="pb-16 md:pb-0">
        {/* Bottom bar mobile */}
        <nav aria-label="Navigation mobile" className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t bg-background">
          <ul className="grid grid-cols-5 text-xs">
            <li>
              <Link to="/dashboard" className={bottomItemCls(isActive('/dashboard'))} aria-current={isActive('/dashboard') ? 'page' : undefined}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z"/>
                </svg>
                <span className="sr-only">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/profile" className={bottomItemCls(isActive('/profile'))} aria-current={isActive('/profile') ? 'page' : undefined}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 9a7 7 0 0 1 14 0v1H5z"/>
                </svg>
                <span className="sr-only">Profil</span>
              </Link>
            </li>
            <li>
              <a href="#" className={bottomItemCls(false)}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span className="sr-only">Missions</span>
              </a>
            </li>
            <li>
              <a href="#" className={bottomItemCls(false)}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a2 2 0 0 1 2 2v12l-5 5H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 16h3l-3 3v-3z"/>
                </svg>
                <span className="sr-only">Matériel</span>
              </a>
            </li>
            <li>
              <a href="#" className={bottomItemCls(false)}>
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm8-6H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                </svg>
                <span className="sr-only">Paramètres</span>
              </a>
            </li>
          </ul>
        </nav>

        {/* Outlet pour les pages */}
        <Outlet />
      </section>
    </div>
  )
}
