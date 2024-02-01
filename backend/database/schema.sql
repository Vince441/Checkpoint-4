DROP DATABASE IF EXISTS newDino;

CREATE DATABASE newDino;

USE newDino;

SET NAMES 'utf8mb4';

CREATE TABLE
    utilisateur (
        id int primary key auto_increment not null,
        pseudo varchar(80) not null,
        email varchar(80) not null,
        hashed_password varchar(250) not null,
       description TEXT null
    );

CREATE TABLE
    dinosaures (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        periode VARCHAR(255) NOT NULL,
        poid VARCHAR(255) NOT NULL,
        taille VARCHAR(255) NOT NULL,
        repartition VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        utilisateur_id INT DEFAULT NULL,
        CONSTRAINT fk_dinosaures_utilisateur FOREIGN KEY (utilisateur_id) REFERENCES utilisateur(id) ON DELETE CASCADE ON UPDATE NO ACTION
    );


INSERT INTO utilisateur (pseudo, email, hashed_password, description)
VALUES ('Sephallus', 'b@gmail.fr', '$argon2id$v=19$m=19456,t=2,p=1$cfcWF4B4MKdAtj1sNfUYEA$TG6QNtzcxEBG7Wy9udNwMs9Q4r+soEfKbMD29n/eTZ4', 'Bonjour j\'aime les dinosaures');

INSERT INTO dinosaures (name, type, periode, poid, taille, repartition, description, image, utilisateur_id)
VALUES ('Tyrannosaurus', 'Carnivore', 'Crétacé', '4,5 à 7 tonnes', '10 à 14m de long - 6m de haut', 'Amérique du Nord', 'Le Tyrannosaurus est probablement le dinosaure le plus connu! Sa féroce réputation de plus méchant carnivore de tous les temps exerce, il est vrai, une certaine fascination.', '/images/t_rex.png', 1);

  
