CREATE TABLE `bookings` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(200),
  `pricePerNight` DECIMAL,
  `cleaningFee` DECIMAL,
  `serviceFee` DECIMAL,
  `rating` DECIMAL
);

CREATE TABLE `reservations` (
  `res_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `booking_id` INT,
  `startDate` DATE,
  `endDate` DATE,
  CONSTRAINT fk_booking_id FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);