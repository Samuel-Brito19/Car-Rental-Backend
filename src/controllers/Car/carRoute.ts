import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, delCar, findCars } from "./carController";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/cars', {
        preHandler: [server.authenticate],
        schema: {
            response: {
                200: $ref('responseCreateCarSchema')
            }
        }
    }, findCars)

    server.post('/cars', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createCarSchema'),
            response: {
                200: $ref('responseCreateCarSchema')
            }
        }
    }, carRegister)

    server.delete('/cars/{id}', {
        preHandler: [server.authenticate],
        schema: {
            response: {
                200: $ref('responseCreateCarSchema')
            }
        }
    }, delCar)
}