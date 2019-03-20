'use strict'
const Antl = use('Antl')
class Subscribe {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      id: 'required'
    }
  }

  get messages () {
    return Antl.forLocale('pt').list('validation')
  }
}

module.exports = Subscribe
