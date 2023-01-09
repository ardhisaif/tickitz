-- CREATE TABLE users(
--     user_id BIGSERIAL NOT NULL PRIMARY KEY,
-- 	first_name VARCHAR(255),
-- 	last_name VARCHAR(255),
-- 	phone_number VARCHAR(22),
--     email VARCHAR(255) NOT NULL,
-- 	picture VARCHAR(255) NULL,
-- 	password VARCHAR(255) NOT NULL,
-- 	role INTEGER NOT NULL,
-- 	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
-- 	updated_at TIMESTAMP,
-- 	email_verify BOOLEAN
-- );

ALTER TABLE users  
ADD COLUMN token_verify VARCHAR;