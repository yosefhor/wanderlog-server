/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.integer('score').notNullable().alter();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.string('score').notNullable().alter();
    });
}