import { FastifyReply, FastifyRequest } from "fastify";
import { createRentSchema } from "./rentSchema";
import { getAvailableCarsInInterval } from "./rentService";

export async function findAvailableCars(request: FastifyRequest<{Querystring: createRentSchema}>, reply: FastifyReply) {
    
    const {locatedAt, devolutionTime} = request.query

    try {

        const cars = await getAvailableCarsInInterval(locatedAt, devolutionTime)

        return cars
        
    } catch (error) {
        console.log(error)

        return reply.code(500).send(error)
    }
}


