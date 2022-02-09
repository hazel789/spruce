DROP TABLE IF EXISTS customer;
CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS product;
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL,
    description TEXT NOT NULL,
    created_at DATE NOT NULL,
    size VARCHAR(255) NOT NULL,
    purchase_id INTEGER,
    is_featured BOOLEAN NOT NULL,
    is_new BOOLEAN NOT NULL
);

DROP TABLE IF EXISTS image;
CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    product_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS purchase;
CREATE TABLE purchase (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    created_at DATE NOT NULL,
    mail_date DATE,
    total_amount FLOAT NOT NULL
);

-- INSERT INTO 
--     product 
--         (id, name, price, description, created_at, size, purchase_id, is_featured, is_new) 
--     VALUES 
--         (1, 'black skirt', 11.50, 'cute black skirt', '2020-2-27', 'XS', 42, false, true);


-- INSERT INTO 
--     image 
--         (url, product_id) 
--     VALUES 
--         ('https://images.unsplash.com/photo-1604728716030-dbe6f830336a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 1), 
--          ('https://images.unsplash.com/photo-1585672275656-4433fc0668e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 1);

-- INSERT INTO 
--     product 
--         (id, name, price, description, created_at, size, purchase_id, is_featured, is_new) 
--     VALUES 
--         (2, 'knitted top', 500, 'cute white knitted top', '2020-2-1', 'M', 42, true, false);


-- INSERT INTO 
--     image 
--         (url, product_id) 
--     VALUES 
--         ('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2805&q=80', 2), 
--          ('https://images.unsplash.com/photo-1547104442-044448b73426?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 2);


-- INSERT INTO 
--     product 
--         (id, name, price, description, created_at, size, purchase_id, is_featured, is_new) 
--     VALUES 
--         (3, 'Vintage Plum Beaded Gown', 57, 'Fits uk6-8, ptp is around 14-15” across, waist measures roughly 12.5” across. Back zip, cross back. Stunning fully beaded gown in a dark plum that glitters and is definitely an eye-catching piece. Fits the body like a glove, inner lined with satin. Length (excl strap) is 52” down. Definitely a collectible.
-- ', '2020-2-1', 'M', 42, true, false);


-- INSERT INTO 
--     image 
--         (url, product_id) 
--     VALUES 
--         ('https://i.imgur.com/UK572vs.jpg', 3), 
--         ('https://i.imgur.com/n6wynBq.jpg', 3),
--         ('https://i.imgur.com/xE1MPsO.jpg', 3),
--         ('https://i.imgur.com/MTXBWFX.jpg', 3);


-- INSERT INTO 
--     product 
--         (id, name, price, description, created_at, size, purchase_id, is_featured, is_new) 
--     VALUES 
--         (4, 'item number 4 placeholder', 500, 'cute white knitted top', '2020-2-1', 'M', 42, true, false);


-- INSERT INTO 
--     image 
--         (url, product_id) 
--     VALUES 
--         ('https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2805&q=80', 4), 
--          ('https://images.unsplash.com/photo-1547104442-044448b73426?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 4);



-- INSERT INTO 
--     purchase
--         (id, customer_id, created_at, mail_date, total_amount)
--     VALUES
--         (42, 2, '2021-1-1', '2021-1-2', 511.50)




