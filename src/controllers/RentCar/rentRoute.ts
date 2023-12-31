import { FastifyInstance } from "fastify";
import { findAvailableCars } from "./rentController";

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
}