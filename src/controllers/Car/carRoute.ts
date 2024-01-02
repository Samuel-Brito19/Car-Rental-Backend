import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, findCars } from "./carController";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/', {
        preHandler: [server.authenticate],
        
    }, findCars)

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