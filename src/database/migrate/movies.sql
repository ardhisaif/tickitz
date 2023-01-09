CREATE TABLE movies (
	movie_id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	directed_by VARCHAR(255),
	casts TEXT,
	genres TEXT,
	release_date TIMESTAMP, 
	duration VARCHAR(22),
	synopsis TEXT,
	image VARCHAR,
	stock INT NOT NULL DEFAULT 0,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP
);

