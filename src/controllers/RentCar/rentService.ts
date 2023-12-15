import { prisma } from "../../database"
import { createRentSchema } from "./rentSchema"

const today = new Date("December 17, 1995 03:24:00")

export async function rentAvailableCars() {
    const cars = prisma.rent.findMany({
        select: {
                id: true,
                locatedAt: true,
                devolutionTime: true,
                userId: true,
                carId: true
                },
        where: {
                NOT: {
                    locatedAt: {
                        lte: today
                    },
                    devolutionTime: {
                        gte: today
                    }
                }
        }
    })

    return cars
}

