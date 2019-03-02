'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DetailTypesSchema extends Schema {
  up() {
    this.create('detail_types', table => {
      table.increments();
      table
        .integer('pokemon_id')
        .unsigned()
        .references('id')
        .inTable('pokemons');
      table
        .integer('type_ids')
        .unsigned()
        .references('id')
        .inTable('types');
      table.timestamps();
    });
  }

  down() {
    this.drop('detail_types');
  }
}

module.exports = DetailTypesSchema;
