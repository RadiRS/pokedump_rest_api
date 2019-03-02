'use strict';

const Route = use('Route');

Route.group(() => {
  // Route Pokemons
  Route.get('pokemons', 'PokemonController.pokemons');
  Route.post('pokemons', 'PokemonController.store');
  Route.get('pokemons/:id', 'PokemonController.show');
  Route.patch('pokemons/:id', 'PokemonController.update');
  Route.delete('pokemons/:id', 'PokemonController.delete');

  // Route User
  Route.get('user', 'UserController.self').middleware('auth');
  Route.patch('user/:id', 'UserController.update');

  // Route Auth
  Route.post('signin', 'UserController.signin');
  Route.post('signup', 'UserController.signup');
}).prefix('api/v1');
