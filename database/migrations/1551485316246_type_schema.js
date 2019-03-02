'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TypeSchema extends Schema {
  up() {
    this.create('types', table => {
      table.increments();
      table.string('name').notNullable();
      table
        .integer('pokemon_id')
        .unsigned()
        .references('id')
        .inTable('pokemons');
      table.timestamps();
    });
  }

  down() {
    this.drop('types');
  }
}

module.exports = TypeSchema;
