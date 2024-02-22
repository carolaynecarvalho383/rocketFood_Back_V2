const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
 
    migrations: {
     directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true
  },
}