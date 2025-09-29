import { messages } from './messages.js'

// Très simple i18n: FR par défaut.
// Extension future possible: contexte de locale, interpolation, pluriels, etc.
export function useI18n() {
  return messages
}
