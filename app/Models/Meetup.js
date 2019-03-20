'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meetup extends Model {
  static boot () {
    super.boot()
    //  this.addHook('beforeDelete', 'FileHook.deleteFile')
    // this.addHook('beforeDelete', 'FileHook.deleteFile')
    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'title' // IMPORTENTE slug -> nome do campo do slug | title -> nome do campo que será a base do slug
      },
      strategy: 'dbIncrement',
      disabledUpdats: false // NESTE CASO O SLUG SO SERÁ criado no create e nao no update
    })
  }

  file () {
    return this.hasOne('App/Models/File', 'image_id', 'id')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  subscribes () {
    return this.belongsToMany('App/Models/User').pivotModel(
      'App/Models/MeetupUser'
    )
  }
 
  categories () {
    return this.belongsToMany('App/Models/Preference').pivotModel(
      'App/Models/MeetupPreference'
    )
  }
}

module.exports = Meetup
