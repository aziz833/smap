export function formatDateFR(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: '2-digit' })
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export function daysBetween(aIso, bIso) {
  const a = new Date(aIso)
  const b = new Date(bIso)
  const ms = b.getTime() - a.getTime()
  return Math.ceil(ms / (1000 * 60 * 60 * 24))
}

export function initialsFromName(name) {
  const parts = String(name || '').trim().split(' ').filter(Boolean)
  const a = parts[0]?.[0] ?? 'S'
  const b = parts[1]?.[0] ?? 'M'
  return (a + b).toUpperCase()
}

export function hashToHue(str) {
  let h = 0
  const s = String(str || '')
  for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) % 360
  return h
}
