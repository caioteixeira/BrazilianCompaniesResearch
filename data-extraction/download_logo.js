const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

async function downloadLogo (ticker) {  
  const url = `https://cors.bridged.cc/https://bastter-images.b-cdn.net/acao/${ticker}.gif`
  const path = Path.resolve(__dirname, '../static/logos', `${ticker}.gif`)
  const writer = Fs.createWriteStream(path)

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: {
        'Origin': 'https://bastter.com'
    }
  })

  response.data.pipe(writer)

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

module.exports = downloadLogo;