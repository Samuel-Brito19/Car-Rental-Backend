import { FastifyInstance } from "fastify";
import createUserHandler from "./userController";

async function userRoutes (server: FastifyInstance) {
    server.post('/', createUserHandler)
}

export default userRoutes