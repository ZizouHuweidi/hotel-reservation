/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("reservations", (table) => {
    table.increments("id").primary(); // Auto-incrementing ID
    table
      .integer("guest_id")
      .notNullable()
      .references("id")
      .inTable("guests")
      .onDelete("CASCADE"); // Foreign key to guests
    table
      .integer("room_id")
      .notNullable()
      .references("id")
      .inTable("rooms")
      .onDelete("CASCADE"); // Foreign key to rooms
    table.date("start_date").notNullable(); // Start date of the reservation
    table.date("end_date").notNullable(); // End date of the reservation
    table.timestamps(true, true); // created_at and updated_at timestamps

    // Unique constraint to prevent overlapping reservations for the same room
    table.unique(["room_id", "start_date", "end_date"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("reservations");
};
