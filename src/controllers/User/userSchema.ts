import {z} from 'zod'
import {buildJsonSchemas } from 'fastify-zod'


const userCore = {
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    id: z.number(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }),
})

const createUserNoPassword = z.object({
    ...userCore,

})

export type createUserSchema = z.infer<typeof createUserSchema>

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserNoPassword
})