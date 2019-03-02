'use strict';

/*
|--------------------------------------------------------------------------
| PokemonSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const pokemon = await Factory.model('App/Models/Pokemon').create();
const type = await Factory.model('App/Models/Type').make();
const category = await Factory.model('App/Models/Category').make();

class PokemonSeeder {
  async run() {
    await Factory.model('App/Models/Pokemon').makeMany(3);
    await pokemon.posts().save(type);
    await pokemon.posts().save(category);
  }
}

module.exports = PokemonSeeder;
