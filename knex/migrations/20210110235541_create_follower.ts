import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("followers", (table: Knex.TableBuilder) => {
    table.uuid("id").primary();
    table.uuid("user1");
    table.uuid("user2");
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("followers");
}
