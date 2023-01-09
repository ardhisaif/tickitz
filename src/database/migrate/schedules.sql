CREATE TABLE schedules (
	schedule_id BIGSERIAL PRIMARY KEY,
	movie_id BIGINT,
    price NUMERIC(7,2),
    premiere VARCHAR(255),
    location VARCHAR(255),
    date_start TIMESTAMP,
    date_end TIMESTAMP,
    time TEXT,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    CONSTRAINT fk_movie
    	FOREIGN KEY(movie_id)
            REFERENCES movies(movie_id)
);