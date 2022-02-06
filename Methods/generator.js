if (process.env.DB_HOST === undefined) {
  //# Create Database #//
  require("kurtion")({
    name: process.env.DB_NAME ?? 'ECMAData',
    location: `./${process.env.DB_NAME ?? 'ECMAData'}`
  })
}

const express = require("./Prototype/express")
const multer = require("multer")
const upload = multer()
const fs = require('fs')
const http = require("http").createServer(express.routes)

const { logError } = require('./System/message')

function generateRoutes(func) {
  let readRoutes = JSON.parse(fs.readFileSync("./src/routes.json", {encoding: 'utf-8'}))
  readRoutes.forEach((Control, properties) => {
    let controlRequire = require(`../../../src/Control/${Control}Control.js`)
    properties.forEach(elem => {
      if (elem.count() !== 0) {
        let method = elem.method.toLowerCase().trim()
        let middle = []
        if (typeof elem.middleware === "array" && elem.middleware.length !== 0) {
          middle = elem.middleware.map((mid) => {
            let split = mid.split('@')
            let path = mid.search('/') !== -1 ? "../../../" : ""
            if (split.length === 1 && split !== "")
              return require(`${path}${split[0]}`)
            else if (split.length === 2) {
              return require(`${path}${split[0]}`)[split[1]]
            }
          })
        }
        express.routes[method](elem.path, elem.upload && elem.upload.type ? upload.single(elem.upload.type) : upload.none(), middle, (req, res) => {
          try {
            let instanceControl = new controlRequire(req, res, method)
            instanceControl[elem.action]()
          }
          catch (e) {
            res.status(400).send({errors: 'Something went wrong, please check data validity'})
            logError(e.message)
          }
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