/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('historic_places', (table) => {
        table.increments('id').primary();
        table.string('city').notNullable();
        table.string('country').notNullable();
        table.string('description').notNullable();
        table.string("month_year", 7).notNullable();
        table.string('score').notNullable();
        table.string('hotel');
        table.timestamps(true, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('historic_places');
}
