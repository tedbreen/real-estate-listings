var express = require('express')
var Sequelize = require('sequelize')
var bodyParser = require('body-parser')

// create app
var app = express()

app.use(bodyParser.json())

app.set('port', (process.env.PORT || 5000))

// sequelize initialization
var sequelize
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL)
}
else {
  sequelize = new Sequelize('postgres://tedbreen@localhost/real_estate')
}

// initialize models
var Listing = require('./models/listing.js')(sequelize)
Listing()

var queries = require('./lib/queries')(sequelize)

var syncFulfill = function syncFulfill () {
  app.get('/listings', queries.getListings)

  app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
  })
}

var syncReject = function syncReject (err) {
  console.error('There was an error:', err)
}

sequelize.sync().then(syncFulfill, syncReject)
