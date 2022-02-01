
package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findAll();
    List<Reservation> findReservationByIdUser(final Long id_user);
    List<Reservation> findReservationByIdCar(final Long id_car);
}
