/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.dropColumn('month_year');
        table.integer('month').notNullable();
        table.integer('year').notNullable();
    });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.table('historic_places', (table) => {
        table.dropColumn('month');
        table.dropColumn('year');
        table.string('month_year').notNullable();
    });
}
