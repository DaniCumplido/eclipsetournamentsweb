CREATE DATABASE IF NOT EXISTS MyBase;
GRANT ALL PRIVILEGES ON MyBase.* TO 'Ibirque'@'localhost';

USE MyBase;
select * from usuarios;

-- Elimina la tabla si ya existe (puede omitirse si la tabla no existe)
-- 
DROP TABLE IF EXISTS `MyBase`.`Usuarios`;

-- Crea la nueva tabla con campos adicionales
-- CREATE TABLE usuarios (
  -- id INT AUTO_INCREMENT PRIMARY KEY,
  -- nombre VARCHAR(255) NOT NULL,
  -- usuario VARCHAR(255) NOT NULL,
  -- riotid VARCHAR(255) NOT NULL,
  -- email VARCHAR(255) NOT NULL,
  -- password VARCHAR(255) NOT NULL
-- );

CREATE TABLE IF NOT EXISTS `MyBase`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre` CHAR(50) NULL,
  `Usuario` CHAR(50) NULL,
  `RiotId` CHAR(40) NULL,
  `email` CHAR(60) NULL,
  `password` CHAR(100) NULL,
  `Equipo` CHAR(50) NULL,
  `Cuenta de X` CHAR(50) NULL,
  `Cuenta de Twitch` CHAR(80) NULL,
  `Cuenta de discord` CHAR(50) NULL,
  `AgenteFavorito` CHAR(15) NULL,
  `Rango` CHAR(20) NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB;

-- Inserta algunos datos de ejemplo
INSERT INTO usuarios (nombre, usuario, riotid, email, password,`Cuenta de Twitch`) 
VALUES ('Juan Perez', 'CapitanTrueno', 'Ar123$a', 'juan.perez@example.com', 'contraseña123','twitch.com/CpTrueno');

INSERT INTO usuarios (nombre, usuario, riotid, email, password,`Equipo`,`Cuenta de X`,`Cuenta de Twitch`,`Cuenta de discord`,`AgenteFavorito`,`Rango`) 
VALUES ('María García', 'Annihilator', '0F231a%', 'maria.garcia@example.com', 'contraseña456',null,null,null,'MarNihil#1234',null,'hierro');