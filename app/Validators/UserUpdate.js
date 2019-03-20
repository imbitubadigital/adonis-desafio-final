'use strict'
const Antl = use('Antl')
class UserUpdate {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      username: 'required',
      password: 'required_if:password_confirmation|min:6|confirmed',
      preferences: 'required'
    }
  }

  get messages () {
    return Antl.forLocale('pt').list('validation')
  }
}

module.exports = UserUpdate
