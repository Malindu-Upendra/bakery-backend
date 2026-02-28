CREATE TABLE IF NOT EXISTS `user_roles` (                                                                                                                                                                                                                                        
 `id` INT NOT NULL AUTO_INCREMENT,  
 `role` VARCHAR(255) NOT NULL,
 `createdAt` DATETIME NOT NULL,
 `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `users` (
 `id` INT NOT NULL AUTO_INCREMENT,
 `userName` VARCHAR(255) NOT NULL,
 `firstName` VARCHAR(255) NOT NULL,
 `lastName` VARCHAR(255) NOT NULL,
 `city` VARCHAR(255),
 `birthdate` DATE NOT NULL,
 `email` VARCHAR(255),
 `phone` VARCHAR(255) NOT NULL,
 `password` VARCHAR(255),
 `status` INT DEFAULT 4,
 `roleId` INT,
 `createdAt` DATETIME NOT NULL,
 `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`roleId`) REFERENCES `UserRoles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO `user_roles` (`id`, `role`, `createdAt`, `updatedAt`)
VALUES
	('1', 'SUPER ADMIN', '2026-02-28 00:31:00', '2026-02-28 00:31:00');

INSERT INTO `users` (`id`, `userName`, `firstName`, `lastName`, `city`, `birthdate`, `email`, `phone`, `password`, `status`, `roleId`, `createdAt`, `updatedAt`)
VALUES
	('1', 'rootadmin', 'Malindu', 'Upendra', 'Narahenpita', '1997-09-28', 'upendramalindu116@gmail.com', '0765503230', '$2a$10$MxZ6PfEL2pg544AzTl8bLuafeSMaNC39Sa23xFBEc.DtO9xEVMjKi', '4', '1', '2026-02-28 00:31:00', '2026-02-28 00:31:00');
