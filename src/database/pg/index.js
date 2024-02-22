const { Client, Pool } = require("pg")
const path = require("path")

async function pgConnection() {
  const connectionString = process.env.DB_URL

  const client = new Client({
    connectionString,
  })
  client.connect()
  .then(() => console.log('connected'))
  .catch((err) => console.error('connection error', err.stack))

  return client
}

module.exports = pgConnection