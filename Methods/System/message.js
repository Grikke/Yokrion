const color = require("./color");
const fs = require("fs")

function getDate() {
    let day = new Date().getDate() >= 10 ? new Date().getDate() : "0" + new Date().getDate()
    let month = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1)
    let year = new Date().getFullYear()
    return `${day}/${month}/${year}`
}
function getTime() {
    let hours = new Date().getHours() >= 10 ? new Date().getHours() : "0" + (new Date().getHours())
    let minutes = new Date().getMinutes() >= 10 ? new Date().getMinutes(): "0" + new Date().getMinutes()
    let seconds = new Date().getSeconds() >= 10 ? new Date().getSeconds() : "0" + new Date().getSeconds()
    return `${hours}:${minutes}:${seconds}`
}

module.exports = {
    getDate,
    getTime,
    message: function(msg) {
        process.stdin.write('\033c');
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdin.write(msg+"\n\n");
    },
    logUpload: function(msg) {
        msg = " - " + msg.trim()
        msg += " : " + getDate() + " at " + getTime()
        let fullPath = `logs/${new Date().getFullYear()}/uploads`
        if (!fs.existsSync("logs"))
            fs.mkdirSync("logs")
        if (!fs.existsSync(`logs/${new Date().getFullYear()}`))
            fs.mkdirSync(`logs/${new Date().getFullYear()}`)
        if (!fs.existsSync(fullPath))
            fs.writeFileSync(fullPath, "|| Start of Logs (Downloads) ||", "utf8")
        let content = fs.readFileSync(fullPath, {encoding: "utf8"}) + "\n"
        fs.writeFileSync(fullPath, content+msg, "utf8")
    },
    logServer: function(msg) {
        msg = " - " + msg.trim()
        msg += " : " + getDate() + " at " + getTime()
        let fullPath = `logs/${new Date().getFullYear()}/server`
        if (!fs.existsSync("logs"))
            fs.mkdirSync("logs")
        if (!fs.existsSync(`logs/${new Date().getFullYear()}`))
            fs.mkdirSync(`logs/${new Date().getFullYear()}`)
        if (!fs.existsSync(fullPath))
            fs.writeFileSync(fullPath, `|| Start of Logs (Server) for ${new Date().getFullYear()} ||`, "utf8")
        let content = fs.readFileSync(fullPath, {encoding: "utf8"}) + "\n"
        fs.writeFileSync(fullPath, content+msg, "utf8")
    },
    logError: function(msg) {
        msg = " - " + msg.trim()
        msg += " : " + getTime()
        let errorPath = `errors/${new Date().getFullYear()}/error-${getDate()}`
        if (!fs.existsSync("logs"))
            fs.mkdirSync("logs")
        if (!fs.existsSync("logs/errors"))
            fs.mkdirSync("logs/errors")
        if (!fs.existsSync(`logs/errors/${new Date().getFullYear()}`))
            fs.mkdirSync(`logs/errors/${new Date().getFullYear()}`)
        if (!fs.existsSync(`logs/${errorPath}`))
            fs.writeFileSync(`logs/${errorPath}`, `|| Start of Logs (Server) for ${getDate()} ||`, "utf8")
        let content = fs.readFileSync(`logs/${errorPath}`, {encoding: "utf8"}) + "\n"
        fs.writeFileSync(`logs/${errorPath}`, content+msg, "utf8")
    },
    color
}