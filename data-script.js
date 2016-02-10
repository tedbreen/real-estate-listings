var fs = require('fs')
var reqwest = require('reqwest')

reqwest({
  url: 'https://s3.amazonaws.com/opendoor-problems/listing-details.csv'
, method: 'get'
, success: function success (response) {
    var listings = response.response.split('\n').slice(1).filter(function filterCB (listing) {
      return listing.split(',').length === 9
    }).map(function mapCB (listing) {
      var id
      var street
      var status
      var price
      var bedrooms
      var bathrooms
      var sq_ft
      var lat
      var lng
      var date = new Date()

      listing = listing.split(',')

      id = Number(listing[0]) + 1
      street = listing[1]
      status = listing[2]
      price = Number(listing[3])
      bedrooms = Number(listing[4])
      bathrooms = Number(listing[5])
      sq_ft = Number(listing[6])
      lat = Number(listing[7])
      lng = Number(listing[8])

      return JSON.stringify({
        id: id
      , street: street
      , status: status
      , price: price
      , bedrooms: bedrooms
      , bathrooms: bathrooms
      , sq_ft: sq_ft
      , lat: lat
      , lng: lng
      , createdAt: date
      , updatedAt: date
      })
    })

    fs.writeFile('listings.json', '[' + listings + ']', function (err) {
      if (err) console.error('ERROR: ', err)
    })
  }

, error: function error (err) {
    console.error(err)
  }
})
