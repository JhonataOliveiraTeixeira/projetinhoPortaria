import {knex as setupknex, Knex} from "knex"

export const config: Knex.Config = {
    client:"sqlite",
    connection:{
        filename: "./db/app.db"
    },
    useNullAsDefault:true,
    migrations:{
        extension:"ts",
        directory: "./db/migrations",
    }
}

export const knexx = setupknex(config)