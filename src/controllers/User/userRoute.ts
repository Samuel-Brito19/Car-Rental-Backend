import fastify, { FastifyInstance } from "fastify";
import registerUserHandler from "./userController";
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
}

export default userRoutes