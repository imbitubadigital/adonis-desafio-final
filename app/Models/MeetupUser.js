'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MeetupUser extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'SubscribeHook.sendSubscribeEmail')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = MeetupUser
