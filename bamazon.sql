DROP DATABASE IF EXISTS great_bayDB;

CREATE DATABASE great_bayDB;

USE great_bayDB;

CREATE TABLE items
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Flowbee", "Men's Grooming", 100.00, 3);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Shake Weight", "Fitness", 35.00, 80);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Sham Wow", "Home and Garden", 10.00, 35);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Blue Blocker Sunglasses", "Eyewear", 18.00, 78);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Sock Slider", "Car Accessories", 8.00, 14);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Turkey Caller", "House and Garden", 3.00, 3);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Hurricane Spin Broom", "Men's Grooming", 19.95, 3);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("New Wave Air Fyer", "Kitchen", 80.00, 3);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Robo Twist Jar Opener", "Kitchen", 18.99, 3);

INSERT INTO items (product_name, department_name, price, stock_quantity)
VALUES ("Belt Extender", "Men's", 6.00, 3);

SELECT * FROM items