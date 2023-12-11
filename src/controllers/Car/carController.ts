import { FastifyReply, FastifyRequest } from "fastify";
import { carCore } from "./carSchema";
import { createCar, getCars } from "./carService";

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

export async function findCars() {
    const cars = await getCars()

    return cars
}