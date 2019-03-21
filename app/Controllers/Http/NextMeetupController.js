'use strict'
const Env = use('Env')
// const MeetupUser = use('App/Models/MeetupUser')
const Meetup = use('App/Models/Meetup')

class NextMeetupController {
  async index ({ request, auth: { user } }) {
    const { page } = request.get()

    /* const meetupQuery = MeetupUser.query().where('user_id', user.id)
    const nexts = await meetupQuery.pluck('meetup_id')

    const nextsMeetups = await Meetup.query()
      .with('file')
      .with('subscribes')
      .with('categories')
      .whereNotIn('id', nexts)
      .orderBy('date', 'asc')
      .paginate(page, Env.get('LIMIT_PAGINATE', 3))

    return nextsMeetups */

    const nextsMeetups = await Meetup.query()
      .select('meetups.*')
      .fullOuterJoin('meetup_users', function () {
        this.on('meetups.id', 'meetup_users.meetup_id')
        this.on('meetup_users.user_id', user.id)
      })
      .whereNull('meetup_users.meetup_id')
      .whereNotNull('meetups.id')
      .with('file')
      .with('subscribes')
      .with('categories')
      .orderBy('date', 'asc')
      .paginate(page, Env.get('LIMIT_PAGINATE', 3))

    return nextsMeetups
  }
}

module.exports = NextMeetupController
