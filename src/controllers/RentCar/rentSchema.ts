import { buildJsonSchemas } from 'fastify-zod'
import {z} from 'zod'

const rentCore = {
    locatedAt: z.date(),
    devolutionTime: z.date(),
    userId: z.number(),
    carId: z.number()
}

const createRent = z.object({
    ...rentCore
})

const responseRent = z.object({
    id: z.number(),
    ...rentCore
})

export type createRentSchema = z.infer<typeof createRent>
export type responseRentSchema = z.infer<typeof responseRent>

export const {schemas: rentSchemas, $ref} = buildJsonSchemas({
    createRent,
    responseRent
}, { $id: "MySchema" })
