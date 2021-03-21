const request = require('request');
var fs = require('fs');
const unzipper = require('unzipper');

const url = "http://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/FCA/DADOS/fca_cia_aberta_2020.zip"

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);
    const sendReq = request.get(url);

    // verify response code
    sendReq.on('response', (response) => {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }

        sendReq.pipe(file);
    });

    // close() is async, call cb after close completes
    file.on('finish', () => file.close(cb));

    // check for request errors
    sendReq.on('error', (err) => {
        fs.unlink(dest);
        return cb(err.message);
    });

    file.on('error', (err) => { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        return cb(err.message);
    });
};

const unzip = (zipPath, outputPath) => {
    fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: outputPath }));
  };

const zipPath = "fca.zip"
download(url, zipPath, async () => {
        await unzip(zipPath, ".data")
        console.log("success! :)"
    )})