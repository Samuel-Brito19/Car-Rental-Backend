import { FastifyReply, FastifyRequest } from "fastify";
import { createRentSchema } from "./rentSchema";
import { createRent, getAvailableCarsInInterval } from "./rentService";

export async function findAvailableCars(request: FastifyRequest<{Querystring: createRentSchema}>, reply: FastifyReply) {
    
    const {locatedAt, devolutionTime} = request.query

    try {

        console.log(locatedAt, devolutionTime)

        const cars = await getAvailableCarsInInterval(locatedAt, devolutionTime)

        return cars

        
    } catch (error) {
        console.log(error)
        console.log('test')

        return reply.code(500).send(error)
    }
}

export async function createNewRent(request: FastifyRequest<{Body: createRentSchema}>, reply: FastifyReply) {
    
    const body = request.body

    try {
        const carRent = await createRent(body)

        return reply.code(200).send(carRent)
    } catch (error) {
        console.log(error)
            
        return reply.code(500).send(error)
    }
 
}


