package com.siemens.carsharing.service;

import com.siemens.carsharing.model.Reservation;
import com.siemens.carsharing.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class DefaultReservationServiceTest {
    @Mock
    private ReservationRepository reservationRepository;

    ReservationService reservationService;

    @BeforeEach
    void initUseCase() {
        reservationService = new DefaultReservationService(reservationRepository);
    }

    @Test
    void testSaveReservation() {
        Reservation reservation = new Reservation(10L, 1L, "Cluj-Napoca", "1/14/2022", "11:36 PM", "1/16/2022", "11:36 PM", 50D, "cash", "Maramuresului 20", "returned");

        when(reservationRepository.save(reservation)).thenReturn(reservation);

        Reservation savedReservationData = reservationRepository.save(reservation);
        assertThat(savedReservationData.getCity()).isEqualTo("Cluj-Napoca");
    }

    @Test
    void testGetAllReservations() {
        Reservation reservation = new Reservation(10L, 1L, "Cluj-Napoca", "1/14/2022", "11:36 PM", "1/16/2022", "11:36 PM", 50D, "cash", "Maramuresului 20", "returned");
        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(reservation);

        when(reservationRepository.findAll()).thenReturn(reservationList);

        List<Reservation> fetchedReservations  = reservationService.getAllReservations();
        assertThat(fetchedReservations.size()).isGreaterThan(0);
    }

    @Test
    void testFindReservationByIdUser() {
        Reservation reservation = new Reservation(10L, 1L, "Cluj-Napoca", "1/14/2022", "11:36 PM", "1/16/2022", "11:36 PM", 50D, "cash", "Maramuresului 20", "returned");

        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(reservation);

        when(reservationRepository.findReservationByIdUser(1L)).thenReturn(reservationList);

        List<Reservation> fetchedReservations  = reservationRepository.findReservationByIdUser(1L);
        assertThat(fetchedReservations.size()).isGreaterThan(0);
    }

    @Test
    void testFindReservationByIdCar() {
        Reservation reservation = new Reservation(10L, 1L, "Cluj-Napoca", "1/14/2022", "11:36 PM", "1/16/2022", "11:36 PM", 50D, "cash", "Maramuresului 20", "returned");
        List<Reservation> reservationList = new ArrayList<>();
        reservationList.add(reservation);

        when(reservationRepository.findReservationByIdCar(10L)).thenReturn(reservationList);

        List<Reservation> fetchedReservations  = reservationRepository.findReservationByIdCar(10L);
        assertThat(fetchedReservations.size()).isGreaterThan(0);
    }
}