DROP DATABASE IF EXISTS garage_dev;

CREATE DATABASE garage_dev;

CREATE TABLE garage_dev.brand(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage_dev.vehicule(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(50) NOT NULL, 
    price DECIMAL(7, 2) UNSIGNED NOT NULL,
    brand_id TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(brand_id) REFERENCES garage_dev.brand(id)
);

CREATE TABLE garage_dev.options(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage_dev.roles(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage_dev.user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL UNIQUE,
    roles_id TINYINT UNSIGNED,
    FOREIGN KEY(roles_id) REFERENCES garage_dev.roles(id)
);

CREATE TABLE garage_dev.vehicule_options(
    vehicule_id TINYINT UNSIGNED,
    options_id TINYINT UNSIGNED,
    FOREIGN KEY(vehicule_id) REFERENCES garage_dev.vehicule(id),
    FOREIGN KEY(options_id) REFERENCES garage_dev.options(id),
    PRIMARY KEY(vehicule_id, options_id) 
);

INSERT INTO garage_dev.brand
VALUES
    (NULL, 'Toyota'),
    (NULL, 'Citroën'),
    (NULL, 'Renauld'),
    (NULL, 'Peugot')
;

INSERT INTO garage_dev.vehicule
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

INSERT INTO garage_dev.options
VALUES
    (NULL, 'Climatisation'),
    (NULL, 'Caméra de recul'),
    (NULL, 'Park assist')
;

INSERT INTO garage_dev.vehicule_options
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

INSERT INTO garage_dev.roles
VALUES
    (NULL, 'admin'),
    (NULL, 'user')
;

-- admin@admin.fr admin / user@user.com user
INSERT INTO garage_dev.user
VALUES
    (NULL, 'admin@admin.fr', '$argon2i$v=19$m=16,t=2,p=1$T0JpcmVPM1VPSFpKTURXRQ$XfL7XikxkKe39VdOzHNRNQ', 1),
    (NULL, 'user@user.com', '$argon2i$v=19$m=16,t=2,p=1$QlBsMHNmNDR1TXIzU2RTRQ$+QoSQy7thet+gHIZSyF0Ig', 2)
;