var getListings = require('./get-listings.js')

module.exports = function queries (sequelize) {
  return {
    getListings: getListings(sequelize)
  }
}
