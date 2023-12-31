import { prisma } from "../../database"
import { createRentSchema } from "./rentSchema"

const today = new Date("December 17, 1995 03:24:00")

export async function getAvailableCarsInInterval(since: Date, until: Date) {
    const cars = prisma.car.findMany({
        
        where: {
            rent: {
                NOT: {
                    AND: [
                        {
                            locatedAt: {
                                lte: since
                            },
                        },
                        {
                            devolutionTime: {
                                gte: until
                            }
                        }
                    ]
                }
            }
        }
    })

    return cars
}

export async function createRent(params: createRentSchema) {
    
    const {userId,carId, ...rentData} = params

    const userFound = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!userFound) {
        throw new Error('User not found')
    }

    const findCar = await prisma.car.findUnique({
        where: {
            id: carId
        }
    })

    if(!findCar) {
        throw new Error('Car not found')
    }
    
    const newRent = await prisma.rent.create({
        data: {
            ...rentData,
            user: {
                connect: {
                    id: userId
                }
            },
            rentedCar: {
                connect: {
                    id: carId
                }
            }
        }
    })

    return newRent
}