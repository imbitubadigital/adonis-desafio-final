'use strict'
// const Antl = use('Antl')
const { rule } = use('Validator')
class MeetupCreate {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      title: 'required',
      description: 'required',
      location: 'required',
      image_id: 'required',
      categories: 'required',
      date: [
        rule('required'),
       // rule('date_format', 'YYYY-MM-DD HH:mm:ss'),
        rule('after', new Date())
      ]
    }
  }

  get messages () {
    return {
      'title.required': 'O titulo deve ser preenchido!',
      'description.required': 'O descrição do evento deve ser preenchida.',
      'location.required': 'O local do evento deve ser preenchido!',
      'date.required': 'A data do evento deve ser preenchida',
      'date.after':
        'A data e horário informado deve ser maior que a data e horário atual.',
      'date.date_format': 'A data do estar no formato YYYY-MM-DD HH:mm:ss',
      'image_id.required': 'Selecione uma imagem para o evento',
      'categories.required': 'Por favor selecione ao menos uma categoria!'
    }
  }
}

module.exports = MeetupCreate
