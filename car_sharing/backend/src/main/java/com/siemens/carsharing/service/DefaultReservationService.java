package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.ReservationData;
import com.siemens.carsharing.model.Reservation;
import com.siemens.carsharing.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("reservationsService")
public class DefaultReservationService implements ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Override
    public ReservationData saveReservation(ReservationData reservationData) {
        Reservation reservationModel = populateReservationEntity(reservationData);
        return populateReservationData(reservationRepository.save(reservationModel));
    }

    @Override
    public boolean deleteReservation(Long reservationId) {
        return false;
    }

    @Override
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @Override
    public List<Reservation> findReservationByIdUser(Long idUser) {
        return reservationRepository.findReservationByIdUser(idUser);
    }

    private ReservationData populateReservationData(Reservation reservationEntityToObject) {
        ReservationData reservationData = new ReservationData();

        reservationData.setId_reservation(reservationEntityToObject.getId_reservation());
        reservationData.setIdCar(reservationEntityToObject.getIdCar());
        reservationData.setIdUser(reservationEntityToObject.getIdUser());
        reservationData.setStart_date(reservationEntityToObject.getStart_date());
        reservationData.setStart_time(reservationEntityToObject.getStart_time());
        reservationData.setEnd_date(reservationEntityToObject.getEnd_date());
        reservationData.setEnd_time(reservationEntityToObject.getEnd_time());
        reservationData.setTotal_reservation_price(reservationEntityToObject.getTotal_reservation_price());
        reservationData.setPayment_method(reservationEntityToObject.getPayment_method());
        reservationData.setCity(reservationEntityToObject.getCity());
        reservationData.setAddress(reservationEntityToObject.getAddress());
        reservationData.setStatus(reservationEntityToObject.getStatus());

        return reservationData;
    }

    private Reservation populateReservationEntity(ReservationData reservationData) {
        Reservation reservation = new Reservation();

        reservation.setId_reservation(reservationData.getId_reservation());
        reservation.setIdCar(reservationData.getIdCar());
        reservation.setIdUser(reservationData.getIdUser());
        reservation.setStart_date(reservationData.getStart_date());
        reservation.setStart_time(reservationData.getStart_time());
        reservation.setEnd_date(reservationData.getEnd_date());
        reservation.setEnd_time(reservationData.getEnd_time());
        reservation.setTotal_reservation_price(reservationData.getTotal_reservation_price());
        reservation.setPayment_method(reservationData.getPayment_method());
        reservation.setAddress(reservationData.getAddress());
        reservation.setCity(reservationData.getCity());
        reservation.setStatus(reservationData.getStatus());

        return reservation;
    }

     @Override public List<Reservation> findReservationByIdCarAndStatus(final Long id_car,String status){
        return reservationRepository.findReservationByIdCarAndStatus(id_car,status);
    }

    @Override
    public List<Reservation> findReservationByIdCar(Long id_car) {
        return reservationRepository.findReservationByIdCar(id_car);
    }

    ;
}

