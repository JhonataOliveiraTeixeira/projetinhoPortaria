import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("person", (table) => {
        table.uuid("id-person").primary()
        table.increments("session-id").index()
        table.text("name-person").notNullable()
        table.text("eletronic-adress").notNullable()
        table.text("call-number").notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("person")

}

