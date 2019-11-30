DROP DATABASE IF EXISTS LemonLoft;
CREATE DATABASE LemonLoft;

use LemonLoft;

CREATE TABLE `lofts` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(500),
  `pricePerNight` DECIMAL,
  `cleaningFee` DECIMAL,
  `serviceFee` DECIMAL,
  `rating` DECIMAL
);

CREATE TABLE `reservations` (
  `res_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `loft_id` INT,
  `startDate` DATE,
  `endDate` DATE,
  CONSTRAINT fk_loft_id FOREIGN KEY (loft_id) REFERENCES lofts(id) ON DELETE CASCADE
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/