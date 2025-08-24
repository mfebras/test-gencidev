require('dotenv').config();

const os = require('os');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  test: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 1,
      max: os.cpus().length * 2 + 1
    },
  },

  development: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/src/database/migrations',
      stub: __dirname + '/src/database/migration.stub'
    },
    seeds: {
      directory: __dirname + '/src/database/seeders',
      stub: __dirname + '/src/database/seeder.stub'
    },
    debug: false
  },

  production: {
    client: process.env.DB_CONNECTION,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    },
    pool: {
      min: 1,
      max: os.cpus().length * 2 + 1
    },
    migrations: {
      tableName: 'migrations',
      directory: __dirname + '/src/database/migrations',
      stub: __dirname + '/src/database/migration.stub'
    },
    seeds: {
      directory: __dirname + '/src/database/seeders',
      stub: __dirname + '/src/database/seeder.stub'
    },
  }

};
