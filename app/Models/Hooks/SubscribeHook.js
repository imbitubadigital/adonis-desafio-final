'use strict'
const MeetupUser = use('App/Models/MeetupUser')
const Kue = use('Kue')
const Job = use('App/Jobs/SubscribeEmail')
const SubscribeHook = (exports = module.exports = {})

SubscribeHook.sendSubscribeEmail = async subscribeItem => {
  const { id } = subscribeItem
  const subscribe = await MeetupUser.find(id)
  const subscribeCreated = subscribe.created_at
  const meetup = await subscribe.meetup().fetch()
  const subscriber = await subscribe.user().fetch()
  const author = await meetup.user().fetch()
  Kue.dispatch(
    Job.key,
    { meetup, subscriber, author, subscribeCreated },
    { attempts: 3 }
  )
}
