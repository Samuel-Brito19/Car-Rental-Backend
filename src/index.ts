import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from './database'
import userRoutes from './controllers/User/userRoute'
import { userSchemas } from './controllers/User/userSchema'
import fjwt from '@fastify/jwt'


declare module "fastify" {
  export interface FastifyInstance {
    authenticate: any;
  }
}


export const fastify = Fastify({
  logger: true
})

fastify.register(fjwt, {secret:`${process.env.SECRET_JWT}`})

fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.send(error)
  }
})

fastify.get('/check', async function handler (request, reply) {
    return { hello: 'world' }
  })
  

  const start = async () => {

    for(const schema of userSchemas) {
      fastify.addSchema(schema)
    }

    fastify.register(userRoutes, {prefix: '/users'})
    try {
      await fastify.listen({ port: 3000 })
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
