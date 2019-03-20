'use strict'
const Helpers = use('Helpers')
const File = use('App/Models/File')
const FileUpdateHook = (exports = module.exports = {})

FileUpdateHook.updateFile = async fileInstance => {
  const { id } = fileInstance
  const { file } = await File.find(id)
  if (file) {
    try {
      const filePath = Helpers.tmpPath(`uploads/${file}`)
      const fs = Helpers.promisify(require('fs'))
      if (fs.existsSync(filePath)) {
        await fs.unlink(filePath)
      }
    } catch (err) {
      // console.error(err)
    }
  }
}
