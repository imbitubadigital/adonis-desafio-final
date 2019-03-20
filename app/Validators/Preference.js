'use strict'
const Antl = use('Antl')
class Preference {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      preferences: 'required'
    }
  }

  get messages () {
    return Antl.forLocale('pt').list('validation')
  }
}

module.exports = Preference
