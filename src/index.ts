import Fastify, { FastifyReply, FastifyRequest } from 'fastify'
import userRoutes from './controllers/User/userRoute'
import cors from '@fastify/cors'
import { userSchemas } from './controllers/User/userSchema'
import fjwt, { JWT } from '@fastify/jwt'
import { carSchema } from './controllers/Car/carSchema'
import carRoutes from './controllers/Car/carRoute'
import { rentSchemas } from './controllers/RentCar/rentSchema'
import rentRoutes from './controllers/RentCar/rentRoute'


declare module "fastify" {
  interface FastifyRequest{
    jwt: JWT
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

function buildServer() {

  const fastify = Fastify({
    logger: true
  })
  
  fastify.register(cors, {
    origin: '*',
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

  fastify.addHook("preHandler", (req, res, next) => {
    req.jwt = fastify.jwt
    return next()
  })

  for(const schema of [...userSchemas, ...carSchema, ...rentSchemas]) {
    fastify.addSchema(schema)
  }

  fastify.register(userRoutes, {prefix: '/users'})
  fastify.register(carRoutes, {prefix: '/cars'})
  fastify.register(rentRoutes, {prefix: '/'})

  return fastify

}

export default buildServer