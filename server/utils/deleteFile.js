const fs = require('fs').promises

async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath)
        console.log(`File ${filePath} has been deleted.`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = deleteFile