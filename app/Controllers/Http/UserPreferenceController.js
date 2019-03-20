'use strict'
const UserPreference = use('App/Models/UserPreference')
class UserPreferenceController {
  async index ({ auth: { user } }) {
    const prefereces = UserPreference.query().where('user_id', user.id)
    const myPreference = await prefereces.pluck('preference_id')
    return { myPreference, user }
  }

  async update ({ request, response, auth: { user } }) {
    try {
      const preferences = request.input('preferences')

      if (preferences && preferences.length > 0) {
        await user.preferences().sync(preferences)
        await user.load('preferences')
      }
      return user
    } catch (er) {
      return response.status(400).send({
        error: { message: 'Erro ao atualizar seu preferência do usuário' }
      })
    }
  }
}

module.exports = UserPreferenceController
