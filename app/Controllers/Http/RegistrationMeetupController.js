'use strict'
const Env = use('Env')
// const MeetupUser = use('App/Models/MeetupUser')
const Meetup = use('App/Models/Meetup')

class RegistrationMeetupController {
  async index ({ request, auth: { user } }) {
    const { page } = request.get()
    /*  const meetupQuery = MeetupUser.query().where('user_id', user.id)
    const meetupsUser = await meetupQuery.pluck('meetup_id')

    const registrations = await Meetup.query()
      .with('file')
      .with('subscribes')
      .with('categories')
      .whereIn('id', meetupsUser)
      .orderBy('date', 'asc')
      .paginate(page, Env.get('LIMIT_PAGINATE', 3))

    return registrations */

    const registrations = await Meetup.query()
      .select('meetups.*')
      .innerJoin('meetup_users', 'meetups.id', 'meetup_users.meetup_id')
      .where('meetup_users.user_id', user.id)
      .with('file')
      .with('subscribes')
      .with('categories')
      .orderBy('date', 'asc')
      .paginate(page, Env.get('LIMIT_PAGINATE', 3))

    return registrations
  }
}

module.exports = RegistrationMeetupController
