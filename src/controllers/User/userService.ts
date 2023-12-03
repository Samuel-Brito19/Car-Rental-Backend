import { hash } from "bcrypt";
import { prisma } from "../../database";
import { createUserSchema } from "./userSchema";


export async function createUser(params:createUserSchema) {
    const {password} = params

    const hashPassword = await hash(password,8)
    
    const user = await prisma.user.create({
        data: {...params, password: hashPassword}
    })

    return user
}

export async function findUserEmail(email: string) {

    return prisma.user.findUnique({where: {
        email,
    }})
}

export async function findUsers() {
    return await prisma.user.findMany()
}