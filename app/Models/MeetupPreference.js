'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MeetupPreference extends Model {
  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = MeetupPreference
