'use strict'
const Antl = use('Antl')
class UserStore {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users',
      password: 'required|min:6'
    }
  }

  get messages () {
    return Antl.forLocale('pt').list('validation')
  }
}

module.exports = UserStore
