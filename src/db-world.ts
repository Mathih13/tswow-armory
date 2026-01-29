import { PrismaClient } from './generated/prisma-world/client.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb({
  host: 'localhost',
  port: 3306,
  user: 'tswow',
  password: 'password',
  database: 'default.dataset.world.dest',
  connectionLimit: 5,
})

declare global {
  var __prismaWorld: PrismaClient | undefined
}

export const worldDb =
  globalThis.__prismaWorld || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prismaWorld = worldDb
}
