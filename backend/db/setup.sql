DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS product;
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    images TEXT NOT NULL,
    price FLOAT NOT NULL,
    description TEXT NOT NULL,
    created_at DATE NOT NULL,
    size VARCHAR(255) NOT NULL,
    purchase_id INTEGER
);

DROP TABLE IF EXISTS purchase;
CREATE TABLE purchase (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    created_at DATE NOT NULL,
    mail_date DATE,
    total_amount FLOAT NOT NULL
);



