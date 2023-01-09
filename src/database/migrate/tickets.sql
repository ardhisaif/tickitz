CREATE TABLE tickets (
    ticket_id BIGSERIAL NOT NULL PRIMARY KEY,
    schedule_id BIGINT,
    movie_id BIGINT,
    CONSTRAINT fk_movie
    	FOREIGN KEY(movie_id)
            REFERENCES movies(movie_id),
    CONSTRAINT fk_schedule
        FOREIGN KEY(schedule_id)
            REFERENCES schedules(schedule_id)
);