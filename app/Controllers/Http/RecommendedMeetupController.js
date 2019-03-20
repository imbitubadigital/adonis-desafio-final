'use strict'
const Env = use('Env')
const MeetupUser = use('App/Models/MeetupUser')
const Meetup = use('App/Models/Meetup')

const UserPreference = use('App/Models/UserPreference')
const MeetupPreference = use('App/Models/MeetupPreference')

class RecommendedMeetupController {
  async index ({ request, auth: { user } }) {
    const { page } = request.get()
 
    const meetupQuery = MeetupUser.query().where('user_id', user.id)
    const myMeetupsSubscribe = await meetupQuery.pluck('meetup_id')

    const prefereces = UserPreference.query().where('user_id', user.id)
    const myPreference = await prefereces.pluck('preference_id')

    const recommendeds = await MeetupPreference.query()     
      .whereIn('preference_id', myPreference)
      .whereNotIn('meetup_id', myMeetupsSubscribe)
      .distinct('meetup_id')    
      .pluck('meetup_id')

     const meetups = await Meetup.query()
      .with('file')
      .with('categories')
      .with('subscribes')
      .whereIn('id', recommendeds)
      .orderBy('date', 'asc')
      .paginate(page, Env.get('LIMIT_PAGINATE', 3)) 
    return meetups 
  }
}

module.exports = RecommendedMeetupController
