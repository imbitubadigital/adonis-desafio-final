'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Preference extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'name' // IMPORTENTE slug -> nome do campo do slug | title -> nome do campo que será a base do slug
      },
      strategy: 'dbIncrement',
      disabledUpdats: false // NESTE CASO O SLUG SO SERÁ criado no create e nao no update
    })
  }

  preferencesJoins () {
    return this.hasMany('App/Models/PreferencesMeetup')
  }
}

module.exports = Preference
