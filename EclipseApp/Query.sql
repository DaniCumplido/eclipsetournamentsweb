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


-- Tabla indice

CREATE TABLE IF NOT EXISTS `mydb`.`Invitaciones` (
  `idInvitaciones` INT NOT NULL AUTO_INCREMENT,
  `CapitanId` INT NULL,
  `InvitadoId` INT NULL,
  `EquipoID` INT NULL,
  PRIMARY KEY (`idInvitaciones`),
  INDEX `CapitanId_idx` (`CapitanId` ASC) VISIBLE,
  INDEX `InvitadoId_idx` (`InvitadoId` ASC) VISIBLE,
  INDEX `EquipoId_idx` (`EquipoID` ASC) VISIBLE,
  CONSTRAINT `CapitanId`
    FOREIGN KEY (`CapitanId`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `InvitadoId`
    FOREIGN KEY (`InvitadoId`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `EquipoId`
    FOREIGN KEY (`EquipoID`)
    REFERENCES `mydb`.`Equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB


-- Tabla Equipos

CREATE TABLE IF NOT EXISTS `mydb`.`Equipos` (
  `idEquipo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(50) NULL,
  `Logotipo` BLOB NULL,
  `CapitanId` INT NOT NULL,
  `Cuenta de X` NVARCHAR(25) NULL,
  `NombreCapitan` NVARCHAR(40) NULL,
  PRIMARY KEY (`idEquipo`),
  INDEX `CapitanId_idx` (`CapitanId` ASC) VISIBLE,
  CONSTRAINT `CapitanId`
    FOREIGN KEY (`CapitanId`)
    REFERENCES `mydb`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB


-- Tabla Partidos

CREATE TABLE IF NOT EXISTS `mydb`.`Partidos` (
  `idPartidos` INT NOT NULL,
  `CompeticionId` VARCHAR(45) NULL,
  `Fecha` DATETIME NULL,
  `Equipo1Id` INT NULL,
  `Equipo2Id` INT NULL,
  `Resultado` VARCHAR(45) NULL,
  PRIMARY KEY (`idPartidos`),
  INDEX `Equipo1Id_idx` (`Equipo1Id` ASC) VISIBLE,
  INDEX `Equipo2Id_idx` (`Equipo2Id` ASC) VISIBLE,
  CONSTRAINT `CompeticionId`
    FOREIGN KEY (`idPartidos`)
    REFERENCES `mydb`.`Competiciones` (`idCompeticiones`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Equipo1Id`
    FOREIGN KEY (`Equipo1Id`)
    REFERENCES `mydb`.`Equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Equipo2Id`
    FOREIGN KEY (`Equipo2Id`)
    REFERENCES `mydb`.`Equipos` (`idEquipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB


-- Tabla Competiciones

CREATE TABLE IF NOT EXISTS `mydb`.`Competiciones` (
  `idCompeticiones` INT NOT NULL AUTO_INCREMENT,
  `Nombre` NVARCHAR(40) NULL,
  PRIMARY KEY (`idCompeticiones`))
ENGINE = InnoDB


-- Tabla usuarios

CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `Nombre` CHAR(40) NULL,
  `Usuario` CHAR(40) NULL,
  `RiotId` CHAR(40) NULL,
  `email` CHAR(40) NULL,
  `password` CHAR(40) NULL,
  `Equipo` CHAR(50) NULL,
  `Cuenta de X` CHAR(25) NULL,
  `Cuenta de Twitch` CHAR(25) NULL,
  `Cuenta de discord` CHAR(25) NULL,
  `AgenteFavorito` CHAR(150) NULL,
  `Rango` INT NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB


-- Inserta algunos datos de ejemplo
INSERT INTO usuarios (nombre, usuario, riotid, email, password,cueTwitch) 
VALUES ('Juan Perez', 'CapitanTrueno', 'Ar123$a', 'juan.perez@example.com', '1234','twitch.com/CpTrueno');

INSERT INTO usuarios (nombre, usuario, riotid, email, password,`Equipo`,cueDeX,cueTwitch,cueDiscord,`AgenteFavorito`,`Rango`) 
VALUES ('María García', 'Annihilator', '0F231a%', 'mariagarcia@example.com', '1234',null,null,null,'MarNihil#1234',3,1);
