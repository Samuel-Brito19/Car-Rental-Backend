import { prisma } from "../../database";
import { carCore } from "./carSchema";

export async function getCars() {
    

    const today = new Date("December 17, 1995 03:24:00")
    


    const cars = await prisma.car.findMany({
        select: {
                id: true,
                name: true,
                model: true,
                doors: true,
                color: true,
                type: true,
                carChange: true,
                hasAir: true,
                link: true
                },
        where: {
            rent: {
                NOT: {
                    locatedAt: {
                        lte: today
                    },
                    devolutionTime: {
                        gte: today
                    }
                }
            }
        }
    })

    return cars
    // return await prisma.car.findMany({
    //     select: {
    //     id: true,
    //     name: true,
    //     model: true,
    //     doors: true,
    //     color: true,
    //     type: true,
    //     carChange: true,
    //     hasAir: true,
    //     link: true
    //     }
    // })


}

export async function createCar(params: carCore) {

    const car = await prisma.car.create({
        data: {...params}
    })

    return car
}
