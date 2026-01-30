import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Search, Shield, Swords } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { searchCharacters } from '@/server/characters'
import { getClassName, getClassColor, getRaceName } from '@/lib/wow-utils'

export const Route = createFileRoute('/')({ component: HomePage })

type CharacterResult = Awaited<ReturnType<typeof searchCharacters>>[number]

function HomePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CharacterResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const doSearch = useCallback(async (value: string) => {
    if (value.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }
    setIsLoading(true)
    try {
      const data = await searchCharacters({ data: value })
      setResults(data)
      setIsOpen(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300)
    return () => clearTimeout(timer)
  }, [query, doSearch])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function selectCharacter(guid: number) {
    setIsOpen(false)
    navigate({ to: '/character/$guid', params: { guid: String(guid) } })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => (i < results.length - 1 ? i + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => (i > 0 ? i - 1 : results.length - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      selectCharacter(results[activeIndex].guid)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="flex-1 flex items-start justify-center px-6 pt-[10vh] text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-red-500/5 to-amber-500/5" />
        <div className="relative max-w-4xl w-full mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-amber-400" />
            <Swords className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight">
            Armory
          </h1>
          <p className="text-lg text-gray-400 mb-10">
            Search for characters on the realm
          </p>

          <div ref={containerRef} className="relative max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActiveIndex(-1)
                }}
                onFocus={() => {
                  if (results.length > 0) setIsOpen(true)
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search characters..."
                className="pl-10 h-12 bg-slate-800 border-slate-600 text-white placeholder:text-gray-500 text-lg"
              />
            </div>

            {isOpen && (
              <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl overflow-hidden">
                {isLoading ? (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    Searching...
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    No characters found
                  </div>
                ) : (
                  results.map((char, i) => (
                    <button
                      key={char.guid}
                      onClick={() => selectCharacter(char.guid)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                        i === activeIndex
                          ? 'bg-slate-700'
                          : 'hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`font-semibold ${getClassColor(char.class)}`}
                        >
                          {char.name}
                        </span>
                        <span className="text-sm text-gray-400">
                          {getRaceName(char.race)} {getClassName(char.class)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-300">
                          Level {char.level}
                        </span>
                        {char.online === 1 && (
                          <span className="w-2 h-2 rounded-full bg-green-400" />
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
