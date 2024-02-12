import { prisma } from "../../database"
import { createRentSchema } from "./rentSchema"


export async function getAvailableCarsInInterval(since: Date, until: Date) {
    const cars = prisma.car.findMany({
        
        where: {
            rents: {
                every: {
                    OR: [
                        {
                            locatedAt: {
                                gt: until,
                            },
                        },
                        {
                            devolutionTime: {
                                lt: since,
                            },
                        },
                    ],
                },
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
        console.log(carId)
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

export async function getUserRents(id : number) {
    
    const paramsId = id

    // const userFound = await prisma.user.findUnique({
    //     where: {
    //         id: paramsId,
    //         email: true
    //     }
    // })

    // if(!userFound) {
    //     throw new Error('User not found')
    // }
    
    const userRents = await prisma.rent.findMany({
        where: {
            userId: paramsId
        }
    })

    return userRents
}