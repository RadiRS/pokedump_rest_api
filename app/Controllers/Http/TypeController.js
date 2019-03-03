'use strict';

const Type = use('App/Models/Type');

class TypeController {
  async types() {
    return await Type.all();
  }
}

module.exports = TypeController;
