/*
  run the following from the root before you use this seed file:

    node data-script.js

  this script will create the listings.json file that is required by this seeder.
*/

var listings = require('../listings.json')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'listings'
    , listings
    , {})
  }

, down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('listings', null, {})
  }
}
