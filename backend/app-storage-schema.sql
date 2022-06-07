CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    firstname   TEXT NOT NULL,
    lastname    TEXT NOT NULL
);

CREATE TABLE sleep (
    id SERIAL PRIMARY KEY,
    notes VARCHAR(140) NOT NULL,
    start_dt TIMESTAMP NOT NULL,
    end_dt TIMESTAMP NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);