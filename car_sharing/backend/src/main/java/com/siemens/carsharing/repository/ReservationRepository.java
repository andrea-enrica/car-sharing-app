
package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findReservationByIdUser(final Long id_user);
    List<Reservation> findReservationByIdCarAndStatus(final Long id_car,String status);
    List<Reservation> findReservationByIdCar(final Long id_car);
}
