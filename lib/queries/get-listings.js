var isValidNumberValue = require('../is-valid-number-value')

module.exports = function (sequelize) {
  return function getListings (req, res) {
    var MIN_VALUE = 0
    var MAX_VALUE = 2147483647

    var min_price = Number(req.query.min_price)
    var max_price = Number(req.query.max_price)
    var min_bath = Number(req.query.min_bath)
    var max_bath = Number(req.query.max_bath)
    var min_bed = Number(req.query.min_bed)
    var max_bed = Number(req.query.max_bed)

    if (!isValidNumberValue(min_price)) min_price = MIN_VALUE
    if (!isValidNumberValue(max_price)) max_price = MAX_VALUE
    if (!isValidNumberValue(min_bath)) min_bath = MIN_VALUE
    if (!isValidNumberValue(max_bath)) max_bath = MAX_VALUE
    if (!isValidNumberValue(min_bed)) min_bed = MIN_VALUE
    if (!isValidNumberValue(max_bed)) max_bed = MAX_VALUE

    var query = `
      SELECT listings.id as id,
        listings.price as price,
        listings.street as street,
        listings.bedrooms as bedrooms,
        listings.bathrooms as bathrooms,
        listings.sq_ft as sq_ft,
        listings.lat as lat,
        listings.lng as lng
      FROM listings
      WHERE price BETWEEN ${min_price} AND ${max_price}
        AND bathrooms BETWEEN ${min_bath} AND ${max_bath}
        AND bedrooms BETWEEN ${min_bed} AND ${max_bed}`

    var queryOptions = {
      type: sequelize.QueryTypes.SELECT
    }

    var fulfill = function fulfill (listings) {
      res.send({
        type: 'FeatureCollection'
      , features: listings.map(function map (listing) {
          return {
            type: 'Feature'
          , geometry: {
              type: 'Point'
            , coordinates: [
                listing.lng
              , listing.lat
              ]
            }
          , properties: {
              id: listing.id
            , price: listing.price
            , street: listing.street
            , bedrooms: listing.bedrooms
            , bathrooms: listing.bathrooms
            , sq_ft: listing.sq_ft
            }
          }
        })
      })
    }

    var reject = function reject (err) {
      res.status(500).send(err)
    }

    return sequelize.query(query, queryOptions).then(fulfill, reject)
  }
}
