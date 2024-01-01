import { FastifyInstance } from "fastify";
import { createNewRent, findAvailableCars } from "./rentController";
import { $ref } from "./rentSchema";

async function rentRoutes(server:FastifyInstance) {
    server.get('/available', {
        preHandler: [server.authenticate],
        schema: {
            querystring: {
                locatedAt: {type: 'string'},
                devolutionTime: {type: 'string'}
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