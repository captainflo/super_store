CREATE DATABASE bamazon
USE bamazon

CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(40) NOT NULL,
    departement_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    Stock_quantity INT(4),
    PRIMARY KEY (id)
);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("MacBook", "Electronics", 1150,10);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1400,40);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Ipad", "Electronics", 700,20);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Iphone 8", "Electronics", 600,60);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Iphone X", "Electronics", 1100,50);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Beats", "Electronics", 400,38);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Samsung S9", "Electronics", 999,43);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Sticker", "Lifestyle", 10, 90);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("IMAC", "Electronics", 1600,51);

INSERT INTO products (product_name, departement_name, price, Stock_quantity)
VALUES ("Bag", "Lifestyle", 150,18);

