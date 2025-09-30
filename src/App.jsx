import React, { useEffect } from 'react'
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import Profile from './pages/Profile.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import ResetPasswordPage from './pages/ResetPasswordPage.jsx'
import AuthedLayout from './layouts/AuthedLayout.jsx'
import { useUserStore } from './store/user.js'
import { supabase } from './lib/supabase.js'
import { ThemeToggle } from './components/ThemeToggle.jsx'
import { useI18n } from './i18n/useI18n.js'

function ProtectedRoute({ children }) {
  const user = useUserStore((s) => s.user)
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const t = useI18n()
  const navigate = useNavigate()
  const setAuth = useUserStore((s) => s.setAuth)
  const user = useUserStore((s) => s.user)

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setAuth(session?.user ?? null, session)
      if (session?.user) {
        const path = window.location.pathname
        if (path === '/' || path === '/login' || path === '/signup') {
          navigate('/dashboard', { replace: true })
        }
      } else {
        // Laisser l'utilisateur naviguer librement (ex: /login, /signup).
        // L'accès à /dashboard est protégé par <ProtectedRoute>.
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [setAuth, navigate])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold" aria-label={t.app.title}>
            <img src={t.app.logo} alt="" className="h-10 w-10 rounded-full" aria-hidden />
            <span>{t.app.title}</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/profile" className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground" aria-label="Profil" title="Profil">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm-7 9a7 7 0 0 1 14 0v1H5z"/>
              </svg>
              <span className="hidden sm:inline ml-2">Profil</span>
            </Link>
            <ThemeToggle />
            {user ? (
              <button
                className="px-3 py-1 rounded-md bg-primary text-primary-foreground"
                onClick={async () => { await supabase.auth.signOut() }}
                aria-label={t.app.logout}
              >
                {t.app.logout}
              </button>
            ) : null}
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-4 md:px-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route element={<ProtectedRoute><AuthedLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
        </Routes>
      </main>
    </div>
  )
}
