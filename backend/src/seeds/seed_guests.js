/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('guests').del();

  // Insert sample data
  await knex('guests').insert([
    { name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '0987654321' },
    { name: 'Alice Brown', email: 'alice.brown@example.com', phone: '1122334455' },
    { name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '6677889900' },
    { name: 'Charlie Lee', email: 'charlie.lee@example.com', phone: '2233445566' },
  ]);
};
