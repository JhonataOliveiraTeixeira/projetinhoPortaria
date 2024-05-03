import { FastifyInstance } from "fastify"
import { knexx } from "../database"
import {z} from "zod"


export async function add_person(app: FastifyInstance) {


    app.get('/most', async () =>{
         const persons = await knexx("person").select("*")

         return {persons}
    })


    app.delete('/excluir/:search', async (request, reply) => {

        const userNumber = request.url
        const urlSplit = userNumber.split("/")
        const id = urlSplit[urlSplit.length - 1]

        await knexx("person").where("id-person", id).delete()

        return reply.status(201).send()
    })


    app.get("/:search",async (request) => {

        const userNumber = request.url
        const urlSplit = userNumber.split("/")
        const id = urlSplit[urlSplit.length - 1]

        const users = await knexx("person").where("session-id", id).first()

        return users
    })


    app.put("/:search",async (request,reply) => {
        try{

        const userNumber = request.url
        const urlSplit = userNumber.split("/")
        const id = urlSplit[urlSplit.length - 1]

        const createPerson = z.object({
            "name-person":z.string(),
            "eletronic-adress":z.string().email(),
            "call-number":z.string().regex(/^\d{11}$/)
            
        })

        const body = createPerson.parse(request.body)

        await knexx("person")
        .where("id-person", id)
        .update({
            "name-person": body['name-person'],
            "eletronic-adress": body['eletronic-adress'],
            'call-number': body['call-number']

        })

        return reply.status(201).send()
        }catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    })


    app.post('/',async (request, reply) =>{
        try{
        const createPerson = z.object({
            "name-person":z.string(),
            "eletronic-adress":z.string().email(),
            "call-number":z.string().regex(/^\d{11}$/)
            
        })
        const body = createPerson.parse(request.body)
        await knexx("person")
        .insert({
            "id-person": crypto.randomUUID(),
            "name-person": body['name-person'],
            'eletronic-adress': body['eletronic-adress'],
            'call-number': body['call-number']
        })
    
        return reply.status(201).send()}
        catch (error) {
            console.error('Erro ao criar cliente:', error);
            throw error;
        }
    })
}