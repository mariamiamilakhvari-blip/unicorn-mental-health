export type MockUser = { name: string; email: string }

export function getUser(): MockUser | null {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem('unicorn_user') || 'null') } catch { return null }
}

export function setUser(user: MockUser) {
  localStorage.setItem('unicorn_user', JSON.stringify(user))
}

export function clearUser() {
  ['unicorn_user', 'unicorn_onboarded', 'unicorn_profile', 'unicorn_permissions', 'unicorn_smartwatch']
    .forEach(k => localStorage.removeItem(k))
}

export function isOnboarded(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('unicorn_onboarded') === 'true'
}

export function setOnboarded() {
  localStorage.setItem('unicorn_onboarded', 'true')
}
