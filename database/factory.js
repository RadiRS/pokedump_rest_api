'use strict';

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/Pokemon', faker => {
  return {
    name: faker.word({ words: 3 }),
    image_url: faker.avatar(),
    latitude: faker.latitude(),
    longitude: faker.longitude()
  };
});

Factory.blueprint('App/Models/Type', faker => {
  return {
    name: faker.word({ words: 4 })
  };
});

Factory.blueprint('App/Models/Catogory', faker => {
  return {
    name: faker.word({ words: 4 })
  };
});
