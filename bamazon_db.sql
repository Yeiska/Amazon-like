DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity)
VALUES ("ice", "food", 1.99,10), ("vitamin c", "vitamin", 7.99, 5), ("pamper", "baby", 10.99, 6),
("shampoo", "cosmetic", 4.99, 5),("conditioner", "cosmetic", 4.99, 5),("deodorant", "cosmetic", 2.99, 4),
("aspirin", "pain", 3.99, 8),("ibuprofen","pain", 7.99, 6),("water", "drinks", 199, 20),("coke", "drinks", 1.50, 25);

select * from products;