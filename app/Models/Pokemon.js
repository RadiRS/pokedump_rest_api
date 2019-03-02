'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Pokemon extends Model {
  types() {
    return this.hasMany('App/Models/Type');
  }

  category() {
    return this.hasOne('App/Models/Category');
  }
}

module.exports = Pokemon;
