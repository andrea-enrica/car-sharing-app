CREATE TABLE file
(
    id_file      int          NOT NULL AUTO_INCREMENT,
    plate_number VARCHAR(45)  NOT NULL,
    name         VARCHAR(45)  NOT NULL,
    url          VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_file)
);
