'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

class File extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeDelete', 'FileHook.deleteFile')
    this.addHook('beforeUpdate', 'FileUpdateHook.updateFile')
  }

  // Criando campo virtual
  static get computed () {
    return ['url']
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }
}

module.exports = File
