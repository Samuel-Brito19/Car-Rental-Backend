import { FastifyInstance } from "fastify";
import { createNewRent, findAvailableCars, getRents } from "./rentController";
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

    server.post('/users/rent', {
        preHandler: [server.authenticate],
        schema: {
            body: $ref('createRent'),
            response: {
                200: $ref('responseRent')
            }
        }
    }, createNewRent)

    server.get('/users/:userId/rent', {
        preHandler: [server.authenticate],
        // schema: {
        //     body: $ref('createRent'),
        //     response: {
        //         200: $ref('responseRent')
        //     }
        // }
    }, getRents)
}

export default rentRoutes