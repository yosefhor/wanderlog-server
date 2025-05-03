/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.text('description').notNullable().alter();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.string('description').notNullable().alter();
    });
}