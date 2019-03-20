'use strict'
// const Env = use('Env')
const moment = require('moment')
const Mail = use('Mail')

class SubscribeEmail {
  static get concurrency () {
    return 1
  }

  static get key () {
    return 'SubscribeEmail-job'
  }

  async handle ({ meetup, subscriber, author, subscribeCreated }) {
    const subscribeData = `${moment(subscribeCreated).format(
      'DD/MM/YYYY'
    )} às ${moment(subscribeCreated).format('HH:mm')} horas`
    const meetupDate = `${moment(meetup.date).format('DD/MM/YYYY')} às ${moment(
      meetup.date
    ).format('HH:mm')} horas`
    await Mail.send(
      ['emails.subscribe'],
      {
        subscribeData,
        meetupTitle: meetup.title,
        meetupDate,
        meetupLocation: meetup.location,
        subscribeEmail: subscriber.email,
        subscribeName: subscriber.username,
        authorName: author.username,
        authorEmail: author.email
      },
      message => {
        message
          .to(author.email)
          .from('empresa@teste.com', 'Minha Empresa')
          .subject(`Nova inscrição no evento ${meetup.title}`)
      }
    )
  }
}

module.exports = SubscribeEmail
