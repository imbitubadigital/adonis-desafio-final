'use strict'

/*
|--------------------------------------------------------------------------
| PrefereceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const Preference = use('App/Models/Preference')
class PrefereceSeeder {
  async run () {
    await Preference.create({ name: 'Front-end' })
    await Preference.create({ name: 'Back-end' })
    await Preference.create({ name: 'Mobile' })
    await Preference.create({ name: 'DevOps' })
    await Preference.create({ name: 'Marketing' })
  }
}

module.exports = PrefereceSeeder
