// @ts-check
const { createPool } = require('mysql2');
const fs = require('fs').promises;

/**
 * Initializes connection and ensures minimum required structures exist
 */
async function dbInstance() {
  const conn = createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
    multipleStatements: true,
  }).promise();

  const commands = await fs.readFile(__dirname + '/setup-db.sql', 'utf-8');

  await conn.query(commands);

  return { pool: conn };
}

module.exports = { dbInstance };
