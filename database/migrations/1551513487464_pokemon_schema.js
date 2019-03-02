'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PokemonSchema extends Schema {
  up() {
    this.create('pokemons', table => {
      table.increments();
      table.string('name').notNullable();
      table.string('image_url').notNullable();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories');
      table.string('latitude').notNullable();
      table.string('longitude').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('pokemons');
  }
}

module.exports = PokemonSchema;
