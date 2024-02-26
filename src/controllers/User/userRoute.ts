import fastify, { FastifyInstance } from "fastify";
import {registerUserHandler, loginHandler, getUsersHandler} from "./userController";
import { $ref } from "./userSchema";

async function userRoutes (server: FastifyInstance) {
    server.post('/',{
        schema: {
            body: $ref('createUserSchema'),
            response: {
                200: $ref('createUserNoPassword')
            }
        }, 
        
    }, registerUserHandler)

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            
        }
    }, loginHandler)

    server.get('/', {
        preHandler: [server.authenticate]
    },getUsersHandler)
}

export default userRoutes