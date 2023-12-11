import {z} from 'zod'
import { buildJsonSchemas } from 'fastify-zod'

const carCore = z.object({
    name: z.string(),
    model: z.string(),
    doors: z.number(),
    color: z.string(),
    type: z.string(),
    carChange: z.string(),
    hasAir: z.boolean(),
    link: z.string()
})

export type carCore = z.infer<typeof carCore>

export const {schemas: carSchema, $ref} = buildJsonSchemas({
    carCore
})