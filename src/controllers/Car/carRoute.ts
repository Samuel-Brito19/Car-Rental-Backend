import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, findCar } from "./carController";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/:id', {
        preHandler: [server.authenticate],
        
    }, findCar)

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