import { createServerFn } from '@tanstack/react-start'
import { charactersDb } from '@/db-characters'

export const searchCharacters = createServerFn({ method: 'GET' })
  .inputValidator((input: string) => input)
  .handler(async ({ data }) => {
    const raw = data.trim()
    if (raw.length < 2) return []

    const query = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()

    const results = await charactersDb.characters.findMany({
      where: {
        name: { contains: query },
      },
      select: {
        guid: true,
        name: true,
        race: true,
        class: true,
        level: true,
        online: true,
      },
      take: 10,
    })

    return results
  })

export const getCharacter = createServerFn({ method: 'GET' })
  .inputValidator((input: number) => input)
  .handler(async ({ data }) => {
    const character = await charactersDb.characters.findUnique({
      where: { guid: data },
      select: {
        guid: true,
        name: true,
        race: true,
        class: true,
        level: true,
        gender: true,
        online: true,
        totalHonorPoints: true,
        totalKills: true,
        arenaPoints: true,
        money: true,
        totaltime: true,
        zone: true,
        health: true,
        power1: true,
      },
    })

    if (!character) {
      throw new Error('Character not found')
    }

    return character
  })
