const raceNames: Record<number, string> = {
  1: 'Human',
  2: 'Orc',
  3: 'Dwarf',
  4: 'Night Elf',
  5: 'Undead',
  6: 'Tauren',
  7: 'Gnome',
  8: 'Troll',
  10: 'Blood Elf',
  11: 'Draenei',
}

const classNames: Record<number, string> = {
  1: 'Warrior',
  2: 'Paladin',
  3: 'Hunter',
  4: 'Rogue',
  5: 'Priest',
  6: 'Death Knight',
  7: 'Shaman',
  8: 'Mage',
  9: 'Warlock',
  11: 'Druid',
}

const classColors: Record<number, string> = {
  1: 'text-amber-800',
  2: 'text-pink-300',
  3: 'text-green-500',
  4: 'text-yellow-400',
  5: 'text-gray-100',
  6: 'text-red-500',
  7: 'text-blue-400',
  8: 'text-cyan-300',
  9: 'text-purple-400',
  11: 'text-orange-400',
}

const allianceRaces = new Set([1, 3, 4, 7, 11])

export function getRaceName(id: number): string {
  return raceNames[id] ?? 'Unknown'
}

export function getClassName(id: number): string {
  return classNames[id] ?? 'Unknown'
}

export function getClassColor(id: number): string {
  return classColors[id] ?? 'text-gray-400'
}

export function getFaction(raceId: number): 'Alliance' | 'Horde' {
  return allianceRaces.has(raceId) ? 'Alliance' : 'Horde'
}

export function formatPlaytime(totalSeconds: number): string {
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const parts: string[] = []
  if (days > 0) parts.push(`${days}d`)
  if (hours > 0) parts.push(`${hours}h`)
  parts.push(`${minutes}m`)
  return parts.join(' ')
}
