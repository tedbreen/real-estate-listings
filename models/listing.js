var Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return function () {
    var attributes = {
      id: {
        type: Sequelize.INTEGER
      , allowNull: false
      , primaryKey: true
      }
    , street: {
        type: Sequelize.STRING
      , allowNull: false
      }
    , status: {
        type: Sequelize.STRING
      , allowNull: false
      }
    , price: {
        type: Sequelize.INTEGER
      , allowNull: false
      }
    , bedrooms: {
        type: Sequelize.INTEGER
      , allowNull: false
      }
    , bathrooms: {
        type: Sequelize.INTEGER
      , allowNull: false
      }
    , sq_ft: {
        type: Sequelize.INTEGER
      , allowNull: false
      }
    , lat: {
        type: Sequelize.DECIMAL
      , allowNull: false
      }
    , lng: {
        type: Sequelize.DECIMAL
      , allowNull: false
      }
    }

    var options = {
      tableName: 'listings'
    , comment: 'Real estate listings'
    , indexes: [
        {
          fields: ['status']
        }
      , {
          fields: ['price']
        }
      , {
          fields: ['bedrooms']
        }
      , {
          fields: ['bathrooms']
        }
      , {
          fields: ['sq_ft']
        }
      ]
    }

    return sequelize.define('Listing', attributes, options)
  }
}
