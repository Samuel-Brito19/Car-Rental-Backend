import Fastify from 'fastify'
import { prisma } from './database'
const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
    return { hello: 'world' }
  })
  

fastify.listen({ port: 3000 }, async error => {
    if (error) {
      fastify.log.error(error)
      await prisma.$disconnect()
      process.exit(1)
    }
  })
