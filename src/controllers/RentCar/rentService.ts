import { prisma } from '../../database'
import { createRentSchema } from './rentSchema'

export async function getAvailableCarsInInterval(since: Date, until: Date) {
  const cars = prisma.car.findMany({
    where: {
      rent: {
        NOT: {
          AND: [
            {
              locatedAt: {
                lte: since,
              },
            },
            {
              devolutionTime: {
                gte: until,
              },
            },
          ],
        },
      },
    },
  })

  return cars
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
