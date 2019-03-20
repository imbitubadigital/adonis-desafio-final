'use strict'
const Antl = use('Antl')
const { rule } = use('Validator')
class ImageUpload {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      file: 'file|file_ext:png,jpg|file_size:2mb|file_types:image'
    }
    /*  return {
      file: [
        rule('file_ext', 'png,jpg'),
        rule('file_size', '2mb'),
        rule('file_types', 'image')
      ]
    } */
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    return {
      'file_ext': 'A Imagem deve ser png ou jpg',
      'file.file_size': 'Size',
      'file.file_types': 'tttttt'
    }
  }
}

module.exports = ImageUpload
