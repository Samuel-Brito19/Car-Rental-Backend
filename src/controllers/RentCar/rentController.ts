import { FastifyReply, FastifyRequest } from "fastify";
import { rentAvailableCars } from "./rentService";
import { createRentSchema } from "./rentSchema";

export async function findRents() {
    const rent = await rentAvailableCars()

    return rent
}

