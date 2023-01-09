CREATE TABLE bookings(
    booking_id BIGSERIAL PRIMARY KEY,
    schedule_id BIGINT,
    user_id BIGINT,
    seat VARCHAR(200),
    paid BOOLEAN NOT NULL DEFAULT FALSE,
    ticket_used BOOLEAN NOT NULL DEFAULT FALSE,
    qr_code VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP,
    CONSTRAINT fk_schedule
    	FOREIGN KEY(schedule_id)
            REFERENCES schedules(schedule_id),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
);