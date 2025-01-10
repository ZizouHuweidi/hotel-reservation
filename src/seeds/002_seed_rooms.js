/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('rooms').del();

  // Insert sample data
  await knex('rooms').insert([
    { id: 1, number: '101', name: 'Deluxe Room' },
    { id: 2, number: '102', name: 'Suite' },
    { id: 3, number: '103', name: 'Standard Room' },
    { id: 4, number: '201', name: 'Penthouse Suite' },
    { id: 5, number: '202', name: 'Family Room' },
  ]);
};
