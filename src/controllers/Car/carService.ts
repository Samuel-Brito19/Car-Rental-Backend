import { prisma } from "../../database";
import { carCore } from "./carSchema";

export async function getCar(id: number) {
    const paramCarId = id

    return await prisma.car.findUnique({
        where: {
            id: Number(paramCarId)
        }
    })
}

export async function createCar(params: carCore) {

    const car = await prisma.car.create({
        data: {...params}
    })

    return car
}
