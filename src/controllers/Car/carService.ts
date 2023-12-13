import { prisma } from "../../database";
import { carCore } from "./carSchema";

export async function getCars() {
    
    const date = new Date()

    const today = date.getDate()

    const todayString = `${today}`

    const cars = await prisma.car.findMany({
        where: {
            rent: {
                NOT: {
                    locatedAt: {
                        lte: todayString
                    },
                    devolutionTime: {
                        gte: todayString
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
