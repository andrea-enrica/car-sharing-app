CREATE TABLE roles
(
    id_roles int         NOT NULL AUTO_INCREMENT,
    name     varchar(45) NOT NULL,

    PRIMARY KEY (id_roles)

);


INSERT INTO `car-sharing`.`roles` (`id_roles`, `name`)
VALUES ('1', 'ROLE_USER');
INSERT INTO `car-sharing`.`roles` (`id_roles`, `name`)
VALUES ('2', 'ROLE_MODERATOR');
INSERT INTO `car-sharing`.`roles` (`id_roles`, `name`)
VALUES ('3', 'ROLE_ADMIN');
