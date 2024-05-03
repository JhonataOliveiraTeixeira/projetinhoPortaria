import fastify from "fastify";
import { env } from "./env";
import { add_person } from "./routes/add_person";

const app = fastify()

app.register(add_person,{
    prefix:'person'
})

app.listen({
    port: env.PORT,
}).then(()=>{
    console.log("HTTP server running")
})