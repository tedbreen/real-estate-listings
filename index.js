var express = require('express')
var Sequelize = require('sequelize')
var bodyParser = require('body-parser')

// create app
var app = express()

app.use(bodyParser.json())

var port = 5000

// sequelize initialization
var sequelize = new Sequelize('postgres://tedbreen@localhost/real_estate')

// initialize models
var Listing = require('./models/listing.js')(sequelize)
Listing()

var queries = require('./lib/queries')(sequelize)

var syncFulfill = function syncFulfill () {
  app.get('/listings', queries.getListings)

  app.listen(port, function listenCB () {
    console.log(`real-estate-listings server is listening on port ${port}`)
  })
}

var syncReject = function syncReject (err) {
  console.error('There was an error:', err)
}

sequelize.sync().then(syncFulfill, syncReject)
