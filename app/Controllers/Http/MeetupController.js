'use strict'
const Meetup = use('App/Models/Meetup')
const MeetupUser = use('App/Models/MeetupUser')

class MeetupController {
  async store ({ request, auth }) {
    const { categories, ...data } = request.only([
      'title',
      'description',
      'location',
      'date',
      'image_id',
      'categories'
    ])

    const meetup = await Meetup.create({ ...data, user_id: auth.user.id })

    if (categories && categories.length > 0) {
      await meetup.categories().attach(categories)
      await meetup.load('categories')
    }
    return meetup
  }

  async show ({ params }) {
    const meetup = await Meetup.query()
      .where('id', params.id)
      .with('file')
      .with('categories')
      .with('subscribes')
      .fetch()
    return meetup
  }

  async update ({ params, request, response, auth }) {
    try {
      const meetup = await Meetup.findOrFail(params.id)

      if (meetup.user_id !== auth.user.id) {
        return response.status(400).send({
          error: {
            message:
              'Desculpe! Não é permitido atualizar meetups de outro usuário!'
          }
        })
      }

      const { categories, ...data } = request.only([
        'title',
        'description',
        'location',
        'date',
        'categories'
      ])

      meetup.merge(data)
      meetup.save()

      if (categories && categories.length > 0) {
        await meetup.categories().sync(categories)
        await meetup.load('categories')
      }
      await meetup.load('file')
      await meetup.load('subscribes')

      return meetup
    } catch (err) {
      return response.status(400).send({
        error: { message: 'Erro ao atualizar meetup. Tente novamente!' }
      })
    }
  }

  async destroy ({ response, params, auth }) {
    const subscribes = await MeetupUser.query()
      .where('meetup_id', params.id)
      .first()

    if (subscribes) {
      return response.status(400).send({
        error: {
          message:
            'Você não deletar este evento porque o mesmo já possui usuários inscritos!'
        }
      })
    }

    const meetup = await Meetup.query()
      .where('id', params.id)
      .where('user_id', auth.user.id)
      .with('file')
      .with('subscribes')
      .first()
    const file = await meetup.file().fetch()

    await file.delete()
  }
}

module.exports = MeetupController
