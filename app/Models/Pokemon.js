'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Pokemon extends Model {
  // Get all data pokemons
  static getPokemons() {
    return Pokemon.query()
      .with('category')
      .with('types');
  }

  types() {
    return this.belongsToMany(
      'App/Models/Type',
      'pokemon_id',
      'type_ids'
    ).pivotModel('App/Models/DetailType');
    // .withTimestamps();
  }

  category() {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = Pokemon;
