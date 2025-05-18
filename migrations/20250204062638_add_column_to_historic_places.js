/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable('historic_trips', (table) => {
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.alterTable('historic_trips', (table) => {
        table.dropColumn('user_id');
    });
}
