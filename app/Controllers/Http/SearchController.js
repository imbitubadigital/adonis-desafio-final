'use strict'
const Meetup = use('App/Models/Meetup/')
class SearchController {
  async index ({ params }) {
    if (params.term.length < 2) return
    const terms = params.term.toLowerCase()
    const meetups = await Meetup.query()
      .where('title', 'LIKE', `%${terms}%`)
      .orWhere('slug', 'LIKE', `%${terms}%`)
      .with('file')
      .with('categories')
      .with('subscribes')
      .fetch()
    return meetups
  }
}

module.exports = SearchController
