import { FastifyReply, FastifyRequest, fastify } from "fastify";
import { createUser, findUserEmail, findUsers } from "./userService";
import { createUserSchema, loginInput } from "./userSchema";
import { compare } from "bcrypt";

export async function registerUserHandler(request: FastifyRequest<{
    Body: createUserSchema
}>, 
    reply: FastifyReply) {
    
    const body = request.body

    try {
        const user = await createUser(body)

        return reply.code(200).send({
            id: user.id,
            name: user.name,
            email: user.email
        })
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
        const accessToken = request.jwt.sign({
            id: user?.id
        },{
            expiresIn: '7d'
        })
        return reply.code(200).send({
            accessToken,
            user: {
              id: user?.id,
              email: user?.email,
            },
          });
    }
    return reply.code(401).send({
        message: "Invalid email or password!"
    })

    
}

export async function getUsersHandler() {
    const users = await findUsers()

    return users
}

