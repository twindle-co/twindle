// @ts-check
const { createConnection } = require("mysql2/promise");

/**
 * Initializes connection and ensures minimum required structures exist
 */
async function dbInstance() {
  const conn = await createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  // Create database if not exists
  await conn.query("CREATE DATABASE IF NOT EXISTS twindle_threads");

  await conn.query("USE twindle_threads;");

  // Create the table
  await conn.query(
    `CREATE TABLE IF NOT EXISTS threads (
      id INT NOT NULL AUTO_INCREMENT,
      conversation_id VARCHAR(45) NOT NULL,
      text VARCHAR(100) NOT NULL,
      likes INT(20) NULL DEFAULT 0,
      retweets INT(20) NULL DEFAULT 0,
      PRIMARY KEY (id),
      UNIQUE INDEX conversation_id_UNIQUE (conversation_id ASC) VISIBLE
    );`
  );

  return { conn };
}

module.exports = { dbInstance };
