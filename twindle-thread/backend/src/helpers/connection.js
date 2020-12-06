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
      user_profile_photo VARCHAR(150) NOT NULL,
      text VARCHAR(300) NOT NULL,
      likes INT(20) NULL DEFAULT 0,
      retweets INT(20) NULL DEFAULT 0,
      replies_count INT(20) NULL DEFAULT 0,
      score FLOAT(20) NULL DEFAULT 0,
      date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE INDEX conversation_id_UNIQUE (conversation_id ASC) VISIBLE
    );`
  );

  return { connection: conn };
}

module.exports = { dbInstance };
