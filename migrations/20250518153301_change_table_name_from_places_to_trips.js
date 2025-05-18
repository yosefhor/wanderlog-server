export function up(knex) {
    return knex.schema.renameTable('historic_places', 'historic_trips');
  }
  
  export function down(knex) {
    return knex.schema.renameTable('historic_trips', 'historic_places');
  }
  