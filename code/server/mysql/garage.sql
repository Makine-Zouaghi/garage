DROP DATABASE IF EXISTS garage;

CREATE DATABASE garage;

CREATE TABLE garage.brand(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage.vehicule(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    model VARCHAR(50) NOT NULL, 
    price DECIMAL(7, 2) UNSIGNED NOT NULL,
    brand_id TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY(brand_id) REFERENCES garage.brand(id)
);

CREATE TABLE garage.options(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage.roles(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE garage.user(
    id TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL UNIQUE,
    roles_id TINYINT UNSIGNED,
    FOREIGN KEY(roles_id) REFERENCES garage.roles(id)
);

CREATE TABLE garage.vehicule_options(
    vehicule_id TINYINT UNSIGNED,
    options_id TINYINT UNSIGNED,
    FOREIGN KEY(vehicule_id) REFERENCES garage.vehicule(id),
    FOREIGN KEY(options_id) REFERENCES garage.options(id),
    PRIMARY KEY(vehicule_id, options_id) 
);

INSERT INTO garage.brand
VALUES
    (NULL, 'Toyota'),
    (NULL, 'Citroën'),
    (NULL, 'Renauld'),
    (NULL, 'Peugot')
;


INSERT INTO garage.options
VALUES
    (NULL, 'Climatisation'),
    (NULL, 'Caméra de recul'),
    (NULL, 'Park assist')
;

INSERT INTO garage.roles
VALUES
    (NULL, 'admin'),
    (NULL, 'user')
;

-- admin@admin.fr admin / user@user.com user
INSERT INTO garage.user
VALUES
    (NULL, 'admin@admin.fr', '$argon2i$v=19$m=16,t=2,p=1$T0JpcmVPM1VPSFpKTURXRQ$XfL7XikxkKe39VdOzHNRNQ', 1)
;