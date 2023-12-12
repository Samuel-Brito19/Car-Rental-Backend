import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const carCore = {
    name: z.string(),
    model: z.string(),
    doors: z.number(),
    color: z.string(),
    type: z.string(),
    carChange: z.string(),
    hasAir: z.boolean(),
    link: z.string()
}

const createCarSchema = z.object({
    ...carCore
})

const responseCreateCarSchema = z.object({
    id: z.number(),
    ...carCore
})


export type carCore = z.infer<typeof createCarSchema>

export type responseCar = z.infer<typeof responseCreateCarSchema>

export const {schemas: carSchema, $ref} = buildJsonSchemas({
    createCarSchema,
    responseCreateCarSchema

})