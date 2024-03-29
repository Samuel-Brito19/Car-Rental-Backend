import { FastifyReply, FastifyRequest } from "fastify";
import { carCore, responseCar } from "./carSchema";
import { createCar, getCar, sendAllCars } from "./carService";

export async function carRegister(request: FastifyRequest<{
    Body: carCore}>,
    reply: FastifyReply) {

        const body = request.body

        try {
            const car = await createCar(body)

            return reply.code(200).send(car)
        } catch (error) {
            console.log(error)
            
            return reply.code(500).send(error)
        }
}

export async function findCar(request: FastifyRequest<{
    Params: responseCar}>,
    reply: FastifyReply) {
    
        const {id} = request.params
    
        try {
            const car = await getCar(id)
    
            return reply.code(200).send(car)
        } catch (error) {
            console.log(error)
                
            return reply.code(500).send(error)
        }
}

export async function getCarsHandler() {
    const cars = await sendAllCars()
    return cars
}
