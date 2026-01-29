import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './prisma/characters.prisma',
  datasource: {
    url: env('CHARACTERS_DATABASE_URL'),
  },
})
