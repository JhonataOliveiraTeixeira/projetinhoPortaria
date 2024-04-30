import fastify from "fastify";
import crypto from "node:crypto"
import {knexx} from "./database"

const app = fastify()

app.get("/hello", async () => {
    const adictionPerson = await knexx('person')
    .where("session-id", 2)
    .select("*")
    return adictionPerson
    
})

app.listen({
    port:3333
}).then(()=>{
    console.log("HTTP server running")
})