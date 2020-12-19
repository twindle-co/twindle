CREATE DATABASE IF NOT EXISTS twindle_threads;
USE twindle_threads;
CREATE TABLE IF NOT EXISTS twitter_users (
  user_id VARCHAR(20) NOT NULL PRIMARY KEY,
  handle VARCHAR(30) NOT NULL,
  name VARCHAR(40) NOT NULL,
  profile_photo VARCHAR(200) NOT NULL,
  verified ENUM('true', 'false') NOT NULL
);
CREATE TABLE IF NOT EXISTS twitter_threads (
  id INT NOT NULL AUTO_INCREMENT,
  conversation_id VARCHAR(45) NOT NULL,
  user_id VARCHAR(20) NOT NULL,
  text VARCHAR(300) NOT NULL,
  likes INT(20) NULL DEFAULT 0,
  retweets INT(20) NULL DEFAULT 0,
  replies_count INT(20) NULL DEFAULT 0,
  score FLOAT(40) NULL DEFAULT 0,
  date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES twitter_users(user_id),
  UNIQUE INDEX conversation_id_UNIQUE (conversation_id ASC) VISIBLE
);