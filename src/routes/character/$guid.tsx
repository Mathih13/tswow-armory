import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, Heart, Shield, Skull, Swords, Trophy, Zap } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getCharacter } from '@/server/characters'
import {
  getClassName,
  getClassColor,
  getFaction,
  getRaceName,
  formatPlaytime,
} from '@/lib/wow-utils'

export const Route = createFileRoute('/character/$guid')({
  loader: ({ params }) => getCharacter({ data: Number(params.guid) }),
  component: CharacterPage,
})

function CharacterPage() {
  const char = Route.useLoaderData()
  const faction = getFaction(char.race)
  const classColor = getClassColor(char.class)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to search
        </Link>

        <Card className="bg-slate-800/80 border-slate-700">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle
                  className={`text-3xl font-black tracking-tight ${classColor}`}
                >
                  {char.name}
                </CardTitle>
                <p className="text-gray-400 mt-1">
                  Level {char.level} {getRaceName(char.race)}{' '}
                  <span className={classColor}>
                    {getClassName(char.class)}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                {char.online === 1 && (
                  <span className="flex items-center gap-1.5 text-sm text-green-400">
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    Online
                  </span>
                )}
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    faction === 'Alliance'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {faction}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatBlock
                icon={<Heart className="w-4 h-4 text-red-400" />}
                label="Health"
                value={char.health.toLocaleString()}
              />
              <StatBlock
                icon={<Zap className="w-4 h-4 text-blue-400" />}
                label="Mana"
                value={char.power1.toLocaleString()}
              />
              <StatBlock
                icon={<Shield className="w-4 h-4 text-amber-400" />}
                label="Honor Points"
                value={char.totalHonorPoints.toLocaleString()}
              />
              <StatBlock
                icon={<Skull className="w-4 h-4 text-gray-400" />}
                label="Total Kills"
                value={char.totalKills.toLocaleString()}
              />
              <StatBlock
                icon={<Trophy className="w-4 h-4 text-yellow-400" />}
                label="Arena Points"
                value={char.arenaPoints.toLocaleString()}
              />
              <StatBlock
                icon={<Clock className="w-4 h-4 text-cyan-400" />}
                label="Time Played"
                value={formatPlaytime(char.totaltime)}
              />
              <StatBlock
                icon={<Swords className="w-4 h-4 text-amber-400" />}
                label="Money"
                value={formatMoney(char.money)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-3">
      <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
        {icon}
        {label}
      </div>
      <p className="text-white font-semibold">{value}</p>
    </div>
  )
}

function formatMoney(copper: number): string {
  const gold = Math.floor(copper / 10000)
  const silver = Math.floor((copper % 10000) / 100)
  const rem = copper % 100
  const parts: string[] = []
  if (gold > 0) parts.push(`${gold.toLocaleString()}g`)
  if (silver > 0) parts.push(`${silver}s`)
  if (rem > 0 || parts.length === 0) parts.push(`${rem}c`)
  return parts.join(' ')
}
