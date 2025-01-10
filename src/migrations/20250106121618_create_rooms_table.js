/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("rooms", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("number", 10).notNullable().unique(); // Unique room number
    table.string("name", 255).notNullable(); // Room name
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("rooms");
};
