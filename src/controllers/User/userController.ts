import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserEmail } from "./userService";
import { createUserSchema, loginInput } from "./userSchema";
import { compare } from "bcrypt";
import { fastify } from "../..";

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

export async function loginHandler(request: FastifyRequest<{
    Body: loginInput
}>, reply: FastifyReply) {
    
    const body = request.body

    const user = await findUserEmail(body.email)

    if(!user) {
        reply.code(500).send({
            message: 'User not found!'
        })
    }

    const validPassword = compare(body.password, user!.password)

    if(!validPassword) {
        return reply.code(500).send({massage: 'Invalid password!'})
    }

    if(await validPassword) {
        return {accessToken: fastify.jwt.sign({
            id: user?.id
        },{
            expiresIn: '7d'
        })}
    }

    
}

export default registerUserHandler