import Fastify from 'fastify'
import { prisma } from './database'
import userRoutes from './controllers/User/userRoute'

const fastify = Fastify({
  logger: true
})

fastify.get('/', async function handler (request, reply) {
    return { hello: 'world' }
  })
  

  const start = async () => {

    fastify.register(userRoutes, {prefix: '/users'})
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
