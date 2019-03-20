'use strict'

const Route = use('Route')

Route.post('session', 'SessionController.store').validator('Session')
Route.post('users', 'UserController.store').validator('UserStore')
Route.get('preferences', 'PreferenceController.index')

Route.get('/files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store').validator('ImageUpload')
  Route.put('/files/:id', 'FileController.update').validator('ImageUpload')
  Route.delete('files/:id', 'FileController.destroy')
  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(
      new Map([
        [['meetups.store'], ['MeetupCreate']],
        [['meetups.update'], ['MeetupUpdate']]
      ])
    )

  Route.put('users', 'UserController.update').validator('UserUpdate')
  Route.put('my-preferences', 'UserPreferenceController.update').validator(
    'Preference'
  )
  Route.get('my-preferences', 'UserPreferenceController.index')
  Route.post('subscribes', 'MeetupUserController.store').validator('subscribe')
  Route.get('registrations', 'RegistrationMeetupController.index')
  Route.get('nexts', 'NextMeetupController.index')
  Route.get('recommendeds', 'recommendedMeetupController.index')
  Route.get('search/:term', 'SearchController.index')
}).middleware('auth')
