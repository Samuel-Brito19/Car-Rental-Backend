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
            response: {
                200: $ref('loginResponseSchema')
            }
        }
    }, loginHandler)

    server.get('/', getUsersHandler)
}

export default userRoutes