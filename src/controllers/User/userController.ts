import { FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "./userService";
import { createUserSchema } from "./userSchema";

async function registerUserHandler(request: FastifyRequest<{
    Body: createUserSchema
}>, 
    reply: FastifyReply) {
    
    const body = request.body

    try {
        const user = await createUser(body)

        return reply.code(200).send(user)
    } catch (error) {
        console.log(error)
        return reply.code(500).send(error)
    }
}

export default registerUserHandler