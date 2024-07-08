DROP DATABASE IF EXISTS garage;

CREATE DATABASE garage;

CREATE TABLE garage.brand(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage.vehicule(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(50) NOT NULL UNIQUE, 
    price DECIMAL(7, 2) UNSIGNED NOT NULL,
    brand_id TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(brand_id) REFERENCES garage.brand(id)
);

CREATE TABLE garage.option(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage.vehicule_option(
    vehicule_id TINYINT UNSIGNED,
    option_id TINYINT UNSIGNED,
    FOREIGN KEY(vehicule_id) REFERENCES garage.vehicule(id),
    FOREIGN KEY(option_id) REFERENCES garage.option(id),
    PRIMARY KEY(vehicule_id, option_id) 
);

INSERT INTO garage.brand
VALUES
    (NULL, 'Toyota'),
    (NULL, 'Citroën'),
    (NULL, 'Renauld'),
    (NULL, 'Peugot')
;

INSERT INTO garage.vehicule
VALUES
    (NULL, 'Yaris', 2000, 1),
    (NULL, 'Aygo', 2500, 1),
    (NULL, 'Clio', 5000, 2),
    (NULL, 'Scénic', 4000, 2),
    (NULL, 'C4', 3000, 3),
    (NULL, 'C1', 5500, 3),
    (NULL, '208', 6000, 4),
    (NULL, '2008', 8000, 4)
;

INSERT INTO garage.option
VALUES
    (NULL, 'Climatisation'),
    (NULL, 'Caméra de recul'),
    (NULL, 'Park assist')
;

INSERT INTO garage.vehicule_option
VALUES
    (1,1),
    (1,2),
    (2,1),
    (2,2),
    (2,3),
    (3,1),
    (3,3),
    (4,1),
    (4,2),
    (4,3),
    (5,3),
    (6,3),
    (6,1),
    (7,1),
    (7,2),
    (7,3),
    (8,1)
;