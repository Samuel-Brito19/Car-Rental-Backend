import { prisma } from "../../database";
import { carCore } from "./carSchema";

export async function getCars() {
    

    return await prisma.car.findMany({
        select: {
            id: true,
            name: true,
            model: true,
            doors: true,
            color: true,
            type: true,
            carChange: true,
            link: true,
            price: true
        }
    })
}

export async function createCar(params: carCore) {

    const car = await prisma.car.create({
        data: {...params}
    })

    return car
}
