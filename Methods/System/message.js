const color = require("./color");
const fs = require("fs")

function getDate() {
    let day = new Date().getDate() >= 10 ? new Date().getDate() : "0" + new Date().getDate()
    let month = new Date().getMonth() + 1 >= 10 ? new Date().getMonth() + 1 : "0" + (new Date().getMonth() + 1)
    let year = new Date().getFullYear()
    return `${day}/${month}/${year}`
}
function getTime() {
    let hours = new Date().getHours() + 2 >= 10 ? new Date().getHours() + 2 : "0" + (new Date().getHours() + 2)
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
        if (!fs.existsSync("logs"))
            fs.mkdirSync("logs")
        if (!fs.existsSync("logs/uploads"))
            fs.writeFileSync("logs/uploads", "|| Start of Logs (Downloads) ||", "utf8")
        let content = fs.readFileSync("logs/uploads", {encoding: "utf8"}) + "\n"
        fs.writeFileSync("logs/uploads", content+msg, "utf8")
    },
    logServer: function(msg) {
        msg = " - " + msg.trim()
        msg += " : " + getDate() + " at " + getTime()
        if (!fs.existsSync("logs"))
            fs.mkdirSync("logs")
        if (!fs.existsSync("logs/server"))
            fs.writeFileSync("logs/server", "|| Start of Logs (Server) ||", "utf8")
        let content = fs.readFileSync("logs/server", {encoding: "utf8"}) + "\n"
        fs.writeFileSync("logs/server", content+msg, "utf8")
    },
    color
}