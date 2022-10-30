require('dotenv').config()
require("./Methods/Prototype/object")
require("./Methods/Prototype/string")

const System = require('./Methods/System/message')
const GenerateRoutes = require("./Methods/generator").generateRoutes
const Socket = require("./Methods/generator").Socket
const Upload = require('./Methods/Upload/file')

module.exports = {
  Log: {
    upload: System.logUpload,
    server: System.logServer,
  },
  System: {
    color: System.color,
    console: System.message,
    getDate: System.getDate,
    getTime: System.getTime,
  },
  GenerateRoutes,
  Socket,
  Upload
}