import * as Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    table.uuid("id").primary();
    table.string("name");
    table.string("username");
    table.string("email");
    table.string("password");
    table.timestamp("created_at");
    table.timestamp("last_updated_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("users");
}
