'use strict'
const User = use('App/Models/User')
class UserController {
  async store ({ request, auth }) {
    const data = request.only(['username', 'email', 'password'])
    await User.create(data)

    const token = await auth.attempt(data.email, data.password)
    const user = await User.query()
      .setVisible(['id', 'username', 'email', 'name'])
      .where('email', data.email)
      .with(['preferences'])
      .first()
    return { ...token, user }
  }

  async update ({ request, response, auth: { user } }) {
    try {
      const { preferences, ...data } = request.only([
        'password',
        'username',
        'preferences',
        'password_confirmation'
      ])

      console.log(data)

      if (!data.password) {
        delete data.password
      }

      delete data.password_confirmation

      user.merge(data)
      await user.save()

      if (preferences && preferences.length > 0) {
        await user.preferences().sync(preferences)
        await user.load('preferences')
        await user.load('mySubscribes')
      }

      return user
    } catch (err) {
      return response.status(400).send({
        error: { message: 'Erro ao atualizar seu perfil' }
      })
    }
  }
}

module.exports = UserController
