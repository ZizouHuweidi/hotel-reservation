/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('reservations').del();

    // Insert sample data
    await knex('reservations').insert([
        {
            id: 1,
            guest_id: 1,
            room_id: 1,
            start_date: '2024-12-01',
            end_date: '2024-12-05',
        },
        {
            id: 2,
            guest_id: 2,
            room_id: 2,
            start_date: '2024-12-10',
            end_date: '2024-12-15',
        },
        {
            id: 3,
            guest_id: 3,
            room_id: 3,
            start_date: '2024-12-20',
            end_date: '2024-12-25',
        },
        {
            id: 4,
            guest_id: 4,
            room_id: 4,
            start_date: '2025-01-01',
            end_date: '2025-01-07',
        },
        {
            id: 5,
            guest_id: 5,
            room_id: 5,
            start_date: '2025-01-10',
            end_date: '2025-01-15',
        },
    ]);
};
