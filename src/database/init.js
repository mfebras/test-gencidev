require('dotenv').config();

const knex = require('knex');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const DB_NAME = process.env.DB_DATABASE;

const knexInstance = knex({
  client: process.env.DB_CONNECTION,
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'postgres'
  }
});

function checkDbExists() {
  return knexInstance.raw(
    `SELECT 1 FROM pg_database WHERE datname = ?`, 
    [DB_NAME]
  );
}

async function main() {
  try {
    const isDbExists = await checkDbExists();

    if (isDbExists.rows.length > 0) {
      console.log(`===> Database ${DB_NAME} already exists`);
      return;
    }

    const answer = await new Promise(resolve => {
      rl.question(`===> Database ${DB_NAME} didn't exists. Do you want to create it? (y/n) `, resolve);
    });

    if (answer.toLowerCase() === 'y') {
      await knexInstance.raw(`CREATE DATABASE ??`, [DB_NAME]);
      console.log(`===> Succesfully create database ${DB_NAME}`);
    }

  } catch (error) {
    console.error('===> Error: ', error);
  } finally {
    await knexInstance.destroy();
    rl.close();
    process.exit(0);
  }
}

main();
