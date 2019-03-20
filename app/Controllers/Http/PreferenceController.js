'use strict'
const Preference = use('App/Models/Preference')
class PreferenceController {
  async index ({ request, auth }) {
    console.log(auth.user)
    //  const usu = auth.user.id
    const preferences = await Preference.all()
    return preferences
  }
}

module.exports = PreferenceController
