import { FastifyInstance } from "fastify";
import { $ref } from "./carSchema";
import { carRegister, findCars } from "./carController";
import { createCar } from "./carService";

async function carRoutes(server:FastifyInstance) {
    
    server.get('/cars', {
        preHandler: [server.authenticate]
    }, findCars)

    server.post('/cars', {
        preHandler: [server.authenticate]
    }, carRegister)
}

