# AppGrid

Application React 18 (Vite) avec Tailwind v4, Zustand, TanStack Query, React Hook Form + Zod, et Supabase. UI moderne avec thème clair/sombre.

## Prérequis

- Node.js >= 22 ("engines" dans `package.json`)

## Installation

```bash
npm install
```

## Variables d’environnement

Copiez `.env.example` en `.env.local` et renseignez:

```
VITE_SUPABASE_URL=... // URL du projet Supabase
VITE_SUPABASE_ANON_KEY=... // clé anonyme
```

## Scripts

- `npm run dev` — démarre Vite en dev
- `npm run build` — build de production
- `npm run preview` — prévisualisation du build
- `npm run test` — tests unitaires (Vitest)

## Structure

```
src/
  components/
    ThemeToggle.jsx
    ui/
      Button.jsx
      Card.jsx
      Input.jsx
  forms/
    loginSchema.js
    useLoginForm.js
  lib/
    queryClient.js
    store.js
    supabase.js
  pages/
    Dashboard.jsx
    Login.jsx
  __tests__/
    smoke.test.jsx
```

## Notes

- Thème sombre via classe `dark` sur `<html>`, mémorisé en `localStorage`.
- Auth Supabase email/mot de passe via `supabase.auth.signInWithPassword`.
- `ProtectedRoute` dans `src/App.jsx` sécurise `/dashboard`.
- Tailwind CSS v4 avec `@tailwindcss/postcss`. Styles de base + variables CSS inspirées de shadcn/ui.

## Déploiement

Le build produit un site statique (Vite). Servez le contenu du dossier `dist/` derrière un CDN.

## Sécurité

### Supabase RLS (Row Level Security)
- Activez RLS sur chaque table exposée à l’API Supabase.
- Écrivez des policies explicites basées sur l’identité (`auth.uid()`) et les rôles.
- Évitez toute table sans RLS si accessible depuis le client.

Exemple (table `profiles` liée à l’utilisateur):

```sql
alter table public.profiles enable row level security;

-- Lecture: un utilisateur ne lit que sa ligne
create policy "read_own_profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

-- Écriture: un utilisateur ne modifie que sa ligne
create policy "update_own_profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
```

Exemple (table `missions` des équipes drones, accès restreint):

```sql
alter table public.missions enable row level security;

-- Lecture: membre de l’équipe affectée ou chef d’agrès
create policy "read_team_missions"
on public.missions for select
to authenticated
using (
  exists (
    select 1 from public.mission_members mm
    where mm.mission_id = missions.id and mm.user_id = auth.uid()
  )
  or
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'chef_agres'
  )
);

-- Écriture: uniquement chef d’agrès
create policy "update_by_chef"
on public.missions for update
to authenticated
using (
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'chef_agres'
  )
)
with check (
  exists (
    select 1 from public.user_roles ur
    where ur.user_id = auth.uid() and ur.role = 'chef_agres'
  )
);
```

Référez-vous à la doc Supabase pour des patterns avancés (policies par colonnes, accès lecture seule, etc.).

### Validation côté serveur
- Même si la validation Zod est faite côté client, considérez une validation côté serveur (Edge Functions Supabase ou backend dédié) pour toute écriture critique.
- Exemple d’Edge Function (pseudo-code):

```js
// Valider payload avec Zod côté serveur AVANT d’appeler PostgREST
import { z } from 'zod'
const MissionSchema = z.object({ titre: z.string().min(3), date: z.string(), zone: z.string() })

export default async function handler(req) {
  const body = await req.json()
  const parse = MissionSchema.safeParse(body)
  if (!parse.success) return new Response('Invalid payload', { status: 400 })
  // Vérifier le user depuis le JWT (Authorization header)
  // Appliquer règles métier, puis écrire en DB via Supabase service role (jamais côté client)
}
```

### Rate limiting
- Pour éviter les abus (login bruteforce, POST massifs), appliquez un rate-limit côté serveur/CDN.
- Options:
  - Edge Function + KV/Redis avec jeton par IP/user.
  - Reverse proxy/CDN (Cloudflare, Fastly) avec règles par chemin (`/auth/*`, `/api/*`).
- Exemple d’algorithme (token bucket) appliqué par `ip+route`.

### Secrets et variables d’environnement
- Ne commitez jamais de secrets. Le client utilise uniquement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (clé anonyme publique).
- Les clés sensibles (service_role, webhooks, etc.) ne doivent jamais être exposées au client. Placez-les uniquement côté serveur/Edge.
- Fichiers `.env*` sont ignorés par Git (voir `.gitignore`). Utilisez un coffre-fort (1Password, Doppler, Vault) pour partager les secrets.

### Checklist rapide
- [ ] RLS activé sur toutes les tables publiques
- [ ] Policies testées pour lecture/écriture selon rôle (télépilote, chef d’agrès)
- [ ] Aucune clé sensible exposée côté client
- [ ] Validation serveur pour opérations critiques
- [ ] Rate-limit en place sur routes sensibles
- [ ] Journaux et alertes en cas d’erreurs 4xx/5xx anormales

### Références
- Supabase RLS Policies: https://supabase.com/docs/guides/auth/row-level-security
- Supabase Edge Functions: https://supabase.com/docs/guides/functions
- OWASP Cheat Sheets (AuthN/AuthZ, Rate Limiting): https://cheatsheetseries.owasp.org/
