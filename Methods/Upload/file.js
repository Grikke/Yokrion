module.exports = function(pathname, file) {
    return new Promise((resolve, reject) => {
        let fs = require("fs")
        let uniqid = require("uniqid")
        let extension = ''
        if (file) {
            if (ext = file.originalname.split('.')[1])
                extension = `.${ext}`
            if (extension)
                avatarlocation = uniqid("fil-", extension)
            let openFile = fs.openSync(`public/${pathname}/${avatarlocation}`, "w")
            fs.write(openFile, file.buffer, (err) => {
                if (err)
                    reject(err)
                else
                    resolve(`/${pathname}/${avatarlocation}`)
            })
        }
        else
            reject(false)
    })
}