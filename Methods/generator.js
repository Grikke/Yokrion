//# Create Database #//
require("kurtion")({
    name: process.env.DB_NAME ?? 'ECMAData',
    location: `./${process.env.DB_NAME ?? 'ECMAData'}`
})

const express = require("./Prototype/express")
const multer = require("multer")
const upload = multer()
const fs = require('fs')
const http = require("http").createServer(express.routes)

express.routes.use(upload.array())

function generateRoutes(func) {
  let readRoutes = JSON.parse(fs.readFileSync("./src/routes.json", {encoding: 'utf-8'}))
  readRoutes.forEach((Control, properties) => {
    let controlRequire = require(`../../../src/Control/${Control}Control.js`)
    properties.forEach(elem => {
      if (elem.count() !== 0) {
        let method = elem.method.toLowerCase().trim()
        express.routes[method](elem.path, elem.upload && elem.upload.type ? upload.single(elem.upload.type) : upload.none(), (req, res) => {
          let instanceControl = new controlRequire(req, res, method)
          instanceControl[elem.action]()
        })
      }
    })
  })
  express.routes.get("/*", (req, res) => {
    res.notFound()
  })
  http.listen(process.env.PORT ? process.env.PORT : 80, process.env["ADDRESS_IP"] ? process.env["ADDRESS_IP"] : "", func)
}

module.exports = {
  generateRoutes,
  http
}