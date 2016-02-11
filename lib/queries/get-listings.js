module.exports = function (sequelize) {
  return function getListings (req, res) {
    var min_price = req.query.min_price || 0
    var max_price = req.query.max_price || 2147483647
    var min_bath = req.query.min_bath || 0
    var max_bath = req.query.max_bath || 2147483647
    var min_bed = req.query.min_bed || 0
    var max_bed = req.query.max_bed || 2147483647

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
      res.send(listings)
    }

    var reject = function reject (err) {
      res.status(500).send(err)
    }

    return sequelize.query(query, queryOptions).then(fulfill, reject)
  }
}
