'use strict'

const MeetupUser = use('App/Models/MeetupUser')
class MeetupUserController {
  async store ({ request, response, auth: { user } }) {
    try {
      const id = request.input('id')
      const isSubscribe = await MeetupUser.query()
        .where('user_id', user.id)
        .where('meetup_id', id)
        .first()

      if (!isSubscribe) {
        await MeetupUser.create({
          user_id: user.id,
          meetup_id: id
        })

        const meetup = await MeetupUser.query()
          .with('meetup.file')
          .with('meetup.categories')
          .with('meetup.subscribes')
          .where('user_id', user.id)
          .where('meetup_id', id)
          .fetch()

        return meetup
      }

      return response.status(400).send({
        error: { message: 'Você já está inscrito!' }
      })
    } catch (err) {
      return response.status(400).send({
        error: { message: 'Erro ao realizar inscrição ' + err }
      })
    }
  }
}

module.exports = MeetupUserController
