CREATE TABLE reservations (
                              id_reservation int NOT NULL AUTO_INCREMENT,
                              id_car int  NOT NULL,
                              id_user int NOT NULL,
                              city varchar(20) NOT NULL,
                              address varchar(40) NOT NULL,
                              start_date varchar(20) NOT NULL,
                              start_time varchar(20)  NOT NULL,
                              end_date varchar(20)  NOT NULL,
                              end_time varchar(20)  NOT NULL,
                              total_reservation_price int NOT NULL,
                              payment_method varchar(20) NOT NULL,
                              status varchar(20),

                              PRIMARY KEY (id_reservation),

                              CONSTRAINT idCar_reservations_FK FOREIGN KEY (id_car)
                                  REFERENCES car(id_car)
                                  ON DELETE CASCADE ON UPDATE CASCADE,

                              CONSTRAINT idUsers_FK FOREIGN KEY (id_user)
                                  REFERENCES users(id_user)
                                  ON DELETE CASCADE ON UPDATE CASCADE
);
