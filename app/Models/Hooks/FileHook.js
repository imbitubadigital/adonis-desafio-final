'use strict'
const Helpers = use('Helpers')
const FileHook = (exports = module.exports = {})

FileHook.deleteFile = async fileInstance => {
  const { file } = fileInstance
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
