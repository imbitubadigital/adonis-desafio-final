'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetupPreferenceSchema extends Schema {
  up () {
    this.create('meetup_preferences', table => {
      table.increments()
      table
        .integer('preference_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('preferences')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('meetup_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('meetups')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('meetup_preferences')
  }
}

module.exports = MeetupPreferenceSchema
