import fastify, { FastifyInstance } from "fastify";
import registerUserHandler, { loginHandler } from "./userController";
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

    server.post('/Login', {}, loginHandler)
}

export default userRoutes