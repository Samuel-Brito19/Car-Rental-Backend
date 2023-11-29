import { prisma } from "../../database";
import { createUserSchema } from "./userSchema";


export async function createUser(params:createUserSchema) {
    const user = await prisma.user.create({
        data: params
    })
}