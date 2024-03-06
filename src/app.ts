import buildServer from "./index";

const fastify = buildServer()

async function main() {
 
    try {
        const PORT = process.env.PORT || 3000
        await fastify.listen({ port: Number(PORT) })

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

main()