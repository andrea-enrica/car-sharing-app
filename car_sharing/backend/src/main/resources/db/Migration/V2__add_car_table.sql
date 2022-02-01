CREATE TABLE car
(
    id_car                   int          NOT NULL AUTO_INCREMENT,
    model                    varchar(45)  NOT NULL,
    brand                    varchar(45)  NOT NULL,
    city                     varchar(45)  NOT NULL,
    address                  varchar(100) NOT NULL,
    id_user                  int          NOT NULL,
    man_year                 int          NOT NULL,
    seats                    int          NOT NULL,
    body_type                varchar(25)  NOT NULL,
    driving_license_category varchar(5)   NOT NULL,
    description              varchar(200) NOT NULL,
    plate_number             varchar(20)  NOT NULL UNIQUE,
    daily_rental_price       int          NOT NULL,
    available                varchar(10)  NOT NULL,
    status                   varchar(10)  NOT NULL,

    PRIMARY KEY (id_car),
    CONSTRAINT idUser_FK FOREIGN KEY (id_user)
        REFERENCES users (id_user)
        ON DELETE CASCADE ON UPDATE CASCADE
);
