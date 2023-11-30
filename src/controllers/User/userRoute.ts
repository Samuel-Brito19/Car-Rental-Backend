import { FastifyInstance } from "fastify";
import createUserHandler from "./userController";
import { $ref } from "./userSchema";

async function userRoutes (server: FastifyInstance) {
    server.post('/',{
        schema: {
            body: $ref('createUserSchema'),
            response: {
                200: $ref('createUserNoPassword')
            }
        }
    }, createUserHandler)
}

export default userRoutes