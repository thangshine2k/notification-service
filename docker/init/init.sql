CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    last_login DATE
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT,
    items JSONB,
    note TEXT
);

INSERT INTO
    users (name, last_login)
VALUES ('Alice', '2025-10-10'),
    ('Bob', '2025-10-11'),
    ('Charlie', '2025-10-12');