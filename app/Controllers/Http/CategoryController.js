'use strict';

const Category = use('App/Models/Category');

class CategoryController {
  async categories() {
    return await Category.all();
  }
}

module.exports = CategoryController;
