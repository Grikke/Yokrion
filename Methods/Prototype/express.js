const express = require("express")
const routes = require("express")();
const bodyParser = require("body-parser")
const cors = require('cors')
const fs = require("fs");
const limit = "10000mb"

routes.use(cors(), bodyParser.json({limit}), express.urlencoded({ extended: true, limit }), express.static("public"))

function readView(fileName) {
    let encoding = {
        encoding: "utf8"
    }
    let mainContent = fs.readFileSync(`src/Display/${fileName}.html`, encoding);
    let head = fs.readFileSync(`src/Display/includes/head.html`, encoding);
    let header = fs.readFileSync(`src/Display/includes/header.html`, encoding);
    let footer = fs.readFileSync(`src/Display/includes/footer.html`, encoding);
    return mainContent
    .replace("{%head%}", head)
    .replace("{%header%}", header)
    .replace("{%footer%}", footer);
}

//# Request Methods Prototypes #//
express.request.isAjax = function() {
    return !this.headers.accept || this.headers.accept.search("html") === -1;
}

//# Responses Methods Prototypes #//
express.response.indexRender = function() {
    let index = readView("index")
    return this.send(index).status(200)
}
express.response.docRender = function() {
    let document = readView("document")
    return this.send(document).status(200)
}
express.response.notFound = function() {
    let error = readView("404")
    return this.send(error).status(400)
}

routes.get("/", (r, res) => {
    res.indexRender();
})

module.exports = {
    express,
    routes
}