'use strict'
const Env = use('Env')
const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', {
        size: Env.get('SIZE_FILE_UPLOAD', '2mb')
      })
      const fileNewName = `${Date.now()}${Math.random()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: fileNewName })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: fileNewName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      return file
    } catch (err) {
      return response
        .status(400)
        .send({ error: { message: 'Falha ao realizar upload do arquivo ' } })
    }
  }

  async show ({ params, response }) {
    const file = await File.find(params.id)
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async update ({ params, request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', {
        size: Env.get('SIZE_FILE_UPLOAD', '2mb')
      })
      const fileNewName = `${Date.now()}${Math.random()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: fileNewName })

      if (!upload.moved()) {
        throw upload.error()
      }

      const data = {
        file: fileNewName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      }

      const file = await File.findOrFail(params.id)
      file.merge(data)
      file.save()

      return file
    } catch (err) {
      return response
        .status(400)
        .send({ error: { message: 'Falha ao realizar upload do arquivo ' } })
    }
  }

  async destroy ({ params, request, response }) {
    const file = await File.find(params.id)
    if (file) {
      await file.delete()
    }
  }
}

module.exports = FileController
