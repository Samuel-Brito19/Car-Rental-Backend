import { prisma } from "../../database"
import { createRentSchema } from "./rentSchema"

const today = new Date("December 17, 1995 03:24:00")

export async function rentAvailableCars() {
    const rents = prisma.rent.findMany({
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

    return rents
}

export async function createRent(params: createRentSchema) {
    
    const {userId, ...rentData} = params

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    
    const newRent = await prisma.rent.create({
        data: {
            ...rentData,
            userId: user!.id
        }
    })
    return newRent
}