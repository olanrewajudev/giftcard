const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require('../config/database')

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)

sequelize.authenticate()
    .then(() => console.log("server connected"))
    .catch((error) => console.log(`server error ${error}`))

const db = {}

db.sequelize = sequelize
db.Sequelize = Sequelize

db.Cards = require('./card')(sequelize, DataTypes)

db.sequelize.sync({ force: false }).then(() => console.log('re-sync done.'))

module.exports = db