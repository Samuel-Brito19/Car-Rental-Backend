import { FastifyInstance } from "fastify";
import { createNewRent, findAvailableCars } from "./rentController";
import { $ref } from "./rentSchema";

async function rentRoutes(server:FastifyInstance) {
    server.get('/', {
        preHandler: [server.authenticate],
        schema: {
            querystring: {
                locatedAt: {type: 'date'},
                devolutionTime: {type: 'date'}
            }
        }
    },findAvailableCars)

    server.post('/', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createRent'),
            response: {
                200: $ref('responseRent')
            }
        }
    }, createNewRent)
}

export default rentRoutes