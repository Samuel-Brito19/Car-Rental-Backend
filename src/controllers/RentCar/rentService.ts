import { prisma } from '../../database'
import { createRentSchema } from './rentSchema'

const today = new Date('December 17, 1995 03:24:00')

export async function rentAvailableCars() {
  const rents = prisma.rent.findMany({
    select: {
      id: true,
      locatedAt: true,
      devolutionTime: true,
      userId: true,
      carId: true,
    },
    where: {
      NOT: {
        locatedAt: {
          lte: today,
        },
        devolutionTime: {
          gte: today,
        },
      },
    },
  })

  return rents
}

export async function createRent(params: createRentSchema) {
  const { userId, carId, ...rentData } = params

  const userFound = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!userFound) {
    throw new Error('User not found')
  }

  // Buscar carro

  // Se não existir, lançar erro!

  const newRent = await prisma.rent.create({
    data: {
      ...rentData,
      user: {
        connect: {
          id: userId,
        },
      },
      rentedCar: {
        connect: {
          id: carId,
        },
      },
    },
  })
  return newRent
}
