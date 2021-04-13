const downloadUrl = 'https://ftp.nluug.nl/pub/vim/pc/gvim82.exe'
const logger = require('../logger/logger')
var loading = false;
module.exports = {
     setup() {
        logger.success(`Downloading Installer from ${downloadUrl}`)
        const https = require('https')
        const fs = require('fs');
        file = fs.createWriteStream('./installVIM.exe');
        loading = logger.loading()
        file.on('finish', () => {
            clearInterval(loading)
            logger.success('Download finished')
            logger.success('Starting installation')
            require('child_process').exec(__dirname +"/../../installVIM.exe", function (err, stdout, stderr) {
                if (err) {
                    return logger.error(err);
                }
                logger.success('Installation finished')
                logger.success(stdout);
            }); 
        })
        https.get(downloadUrl, resp => resp.pipe(file));
    }
}