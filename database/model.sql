create TABLE product(
    id SERIAL PRIMARY KEY,
    img VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    sale INTEGER,
    kcal INTEGER,
    protein INTEGER,
    carb INTEGER,
    fat INTEGER,
    weight INTEGER,
    type INTEGER
);
create TABLE orders(
    id SERIAL PRIMARY KEY,
    sale INTEGER,
    orders VARCHAR(255) [],
    checked BOOLEAN,
    customer_id INTEGER,
    FOREIGN KEY (customer_id) REFERENCES customer
);
create TABLE customer(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    phone VARCHAR(255)
);
create TABLE admin(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255)
);