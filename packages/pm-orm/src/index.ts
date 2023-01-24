import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

// event handler
prisma.$on('query', (e: Prisma.QueryEvent) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

prisma.$on('error', (e: Prisma.LogEvent) => {
  console.log('Error: ' + e.message)
  console.log('Target: ' + e.target)
})

export default prisma
export * from '@prisma/client'
