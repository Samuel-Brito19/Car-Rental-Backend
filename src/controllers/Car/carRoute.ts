import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, findCar, getCarsHandler } from "./carController";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/:id', {
        preHandler: [server.authenticate],
        
    }, findCar)

    server.get('/', {
        preHandler: [server.authenticate],
        
    }, getCarsHandler)

    server.post('/', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createCarSchema'),
            response: {
                200: $ref('responseCreateCarSchema')
            }
        }
    }, carRegister)
}

export default carRoutes