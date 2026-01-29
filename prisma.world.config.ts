import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: './prisma/world.prisma',
  datasource: {
    url: env('WORLD_DATABASE_URL'),
  },
})
