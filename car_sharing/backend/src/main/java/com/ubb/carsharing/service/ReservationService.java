package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.ReservationData;
import com.siemens.carsharing.model.Reservation;

import java.util.List;

public interface ReservationService {

    ReservationData saveReservation(ReservationData reservation);

    List<Reservation> getAllReservations();

    List<Reservation> findReservationByIdUser(final Long idUser);

    List<Reservation> findReservationByIdCar(final Long id_car);
}


