'use strict';

const Route = use('Route');

Route.group(() => {
  // Route Pokemons
  Route.get('pokemons', 'PokemonController.index');
  Route.get('pokemons/:id', 'PokemonController.show');
  Route.post('pokemons', 'PokemonController.store');
  Route.patch('pokemons/:id', 'PokemonController.update');
  Route.delete('pokemons/:id', 'PokemonController.delete');

  // Route Categories
  Route.get('categories', 'CategoryController.categories');

  // Route Types
  Route.get('types', 'TypeController.types');

  // Route User
  Route.get('user', 'UserController.self').middleware('auth');
  Route.patch('user/:id', 'UserController.update');

  // Route Auth
  Route.post('signin', 'UserController.signin');
  Route.post('signup', 'UserController.signup');

  // Route Upload
  Route.post('upload', 'UploadFileController.store');
  Route.get('image/:path', 'UploadFileController.show');
}).prefix('api/v1');
