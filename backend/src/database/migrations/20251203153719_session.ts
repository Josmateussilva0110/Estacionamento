import type { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("session", table => {
    table.string("sid").primary()     
    table.json("sess").notNullable()   
    table.timestamp("expired", { useTz: true }).notNullable()
  })

  await knex.schema.alterTable("session", table => {
    table.index("expired", "IDX_session_expired")
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("session")
}
