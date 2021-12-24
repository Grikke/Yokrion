# Yokrion

[![NPM](https://nodei.co/npm/yokrion.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/yokrion/)

## Installation
With Shell Console

```sh
npx create-yokrion your-app-name
cd your-app-name
npm start
```

## First Step

You can easily edit console and log message at beginning and stop of server in server.js 

# Documentation

## Routes

- In src/routes.json

An object that takes the name of the control as a key and as value an array that contains an unlimited number of objects with a path, a name, a method (request method, GET, DELETE or POST for example) and an action (a control method).

If we want to call the UserControl method getUsers in /users we can write like this.

```json
{ 
    "User": [
        {
            "name": "Get Users",
            "path": "/users",
            "method": "GET",
            "action": "getUsers"
        }
    ]
}
```

## Control

- In src/Control/

Every Control class export Control.js to make sure requests are clean.
You have direct access to Express request and response by class properties.
For example if you just want to say Hello world.

```js
class ExampleControl extends Control {
    myHelloWorld = () => {
        this.res.send('Hello world !')
    }
}
```

## Database

- [Go Check Kurtion Documentation](https://www.npmjs.com/package/kurtion) - A Grikkian JSON Database 

You can take example.js in src/Database/Tables for example.

## Display

- In src/Display/

You can simply edit the pages and take example of them.

If you want to add more page in the folder you can use the render properties.
For example with an example.html
```js
this.res.render('example')
```

## Server Methods

- Log

Adds a log entry to the download or server log file choices as needed.
```js
const { Log } = require('yokrion')

Log.upload('Not an useful upload message entry')
Log.server('Not an useful server message entry either')
```

- System

Console message function and code color for it.
```js
const { System } = require('yokrion')

System.message(`${System.color.green}You're welcome !${System.color.end}`)

```
It will clean console, be careful to not overused it.

- Upload

Simple method that take a file of a request and upload it in a public folder.
It returns a Promise object with the full path if it succeeded.

```js
const { Upload } = require('yokrion')

Upload('avatar', fileObject)
```