import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, findCars } from "./carController";
import { createCar } from "./carService";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/cars', {
        schema: {
            body: $ref('carCore'),
            response: {
                200: $ref('carCore')
            }
        }
    }, findCars)

    server.post('/cars', {
        schema: {
            body: $ref('carCore'),
            response: {
                200: $ref('carCore')
            }
        }
    }, carRegister)
}

