import {number, string, z} from 'zod'
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
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }),
})

const createUserNoPassword = z.object({
    id: z.number(),
    ...userCore,

})

const loginSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    password: z.string()
})

const loginResponseSchema = z.object({
    accessToken: z.string()
})

export type createUserSchema = z.infer<typeof createUserSchema>

export type loginInput = z.infer<typeof loginSchema>

export const {schemas: userSchemas, $ref} = buildJsonSchemas({
    createUserSchema,
    createUserNoPassword,
    loginSchema,
    loginResponseSchema
})