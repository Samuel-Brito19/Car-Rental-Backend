import buildServer from "./index";

const fastify = buildServer()

async function main() {
 
    try {
        await fastify.listen({ port: 3000 })

        console.log('Server ready at http://localhost:3000')
    } catch (error) {
        console.log('oi')
        process.exit(1)
    }
}

main()