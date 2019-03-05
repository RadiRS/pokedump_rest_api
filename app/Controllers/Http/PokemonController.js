'use strict';

const Database = use('Database');
const { validate } = use('Validator');
const DataGrid = use('DataGrid');
const Pokemon = use('App/Models/Pokemon');
const DetailType = use('App/Models/DetailType');

class PokemonController {
  // Get data pokemons
  async index({ params, request }) {
    const config = {
      query() {
        return Pokemon.query()
          .with('category')
          .with('types');
      },

      sortable: {
        id: 'id',
        name: 'name',
        created: 'created_at'
      },

      searchable: ['name'],

      filterable: {
        name: 'name'
      }
    };

    return await DataGrid.paginate(config);
  }

  // Get detail pokemon
  async show({ params: { id } }) {
    return await Pokemon.query()
      .where('id', id)
      .with('category')
      .with('types')
      .fetch();
  }

  // Add data pokemon
  async store({ request, response }) {
    const {
      name,
      image_url,
      latitude,
      longitude,
      user_id,
      category_id,
      type_ids
    } = request.post();

    const pokemonData = {
      name,
      image_url,
      latitude,
      longitude,
      user_id,
      category_id
    };

    const rules = {
      name: 'required',
      image_url: 'required',
      type_ids: 'required',
      category_id: 'required',
      latitude: 'required',
      longitude: 'required'
    };

    const messages = {
      'name.required': 'Name is required',
      'image_url.required': 'Image is required',
      'type_ids.required': 'Type is required',
      'category_id.required': 'Category is required',
      'latitude.required': 'Location   is required',
      'longitude.required': 'Location is required'
    };

    const validation = await validate(request.all(), rules, messages);

    if (validation.fails()) {
      return response
        .status(400)
        .json({ message: validation._errorMessages[0].message });
    }

    const pokemon = await Pokemon.create(pokemonData);

    const pokemonTypesData = type_ids.map(type_id => ({
      pokemon_id: pokemon.id,
      type_ids: type_id
    }));

    const pokemonTypes = await DetailType.createMany(pokemonTypesData);

    return pokemonTypes;

    // try {
    //   return await Pokemon.create(pokemonData);
    // } catch (error) {
    //   return { error };
    // }
  }

  // Delete data pokemen
  async delete({ params: { id } }) {
    const data = await Pokemon.find(id);
    await data.delete();
    return {
      message: 'Deleted succes',
      id
    };
  }
}

module.exports = PokemonController;
