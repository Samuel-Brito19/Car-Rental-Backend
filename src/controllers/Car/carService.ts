import { prisma } from "../../database";

export async function findCars() {

    return await prisma.car.findMany({
        select: {
        name: true,
        model: true,
        doors: true,
        color: true,
        type: true,
        carChange: true,
        hasAir: true,
        link: true
        }
    })
}