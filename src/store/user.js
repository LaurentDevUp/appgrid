import { create } from 'zustand'

// Store utilisateur (Zustand)
// - user: objet utilisateur Supabase
// - session: session Supabase
// - setAuth: met à jour user + session
export const useUserStore = create((set) => ({
  user: null,
  session: null,
  setAuth: (user, session) => set({ user, session })
}))
