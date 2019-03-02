'use strict';

const { validate } = use('Validator');
const Database = use('Database');
const Pokemon = use('App/Models/Pokemon');

class PokemonController {
  // Get data pokemons
  async pokemons({ params, request }) {
    // console.log(params, request('limit'));
    return await Pokemon.query()
      .with('category')
      .fetch();
    // .offset(limit)
    // .limit(2);
  }

  // Get detail pokemon
  async show({ params: { id } }) {
    return await Pokemon.query()
      .where('id', id)
      // .with('types')
      .with('category')
      .fetch();
  }

  // Add data pokemon
  async store({ request, response }) {
    const rules = {
      name: 'required',
      image_url: 'required',
      // type_ids: 'required',
      category_id: 'required',
      latitude: 'required',
      longitude: 'required'
    };

    const messages = {
      'name.required': 'Name is required',
      'image_url.required': 'Image is required',
      // 'type_ids.required': 'Type is required',
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

    try {
      return await Pokemon.create(request.all());
    } catch (error) {
      return { error };
    }
  }

  // Delete data pokemen
  async delete({ params: { id } }) {
    const data = await Pokemon.find(id);
    return await data.delete();
  }
}

module.exports = PokemonController;
