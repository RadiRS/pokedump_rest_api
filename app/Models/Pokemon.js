'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Pokemon extends Model {
  types() {
    return this.belongsToMany('App/Models/DetailType');
  }

  category() {
    return this.belongsTo('App/Models/Category');
  }
}

module.exports = Pokemon;
