/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('upcoming_trips', (table) => {
        table.increments('id').primary();
        table.string('city').notNullable();
        table.string('country').notNullable();
        table.integer('month').notNullable();
        table.integer('year').notNullable();
        table.string('hotel');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('upcoming_trips');
}
