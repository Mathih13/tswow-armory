import { PrismaClient } from './generated/prisma-characters/client.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'tswow',
  password: 'password',
  database: 'default.realm.characters',
  connectionLimit: 5,
})

declare global {
  var __prismaCharacters: PrismaClient | undefined
}

export const charactersDb =
  globalThis.__prismaCharacters || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prismaCharacters = charactersDb
}
