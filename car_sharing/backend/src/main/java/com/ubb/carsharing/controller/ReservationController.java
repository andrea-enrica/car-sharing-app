package com.siemens.carsharing.controller;
import com.siemens.carsharing.dto.ReservationData;
import com.siemens.carsharing.model.Reservation;
import com.siemens.carsharing.service.ReservationService;
import org.springframework.web.bind.annotation.*;



import javax.annotation.Resource;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Resource(name = "reservationsService")
    private ReservationService reservationService;

    @PostMapping("/reservation")
    public ReservationData saveReservation(final @RequestBody ReservationData reservationData) {
        return reservationService.saveReservation(reservationData);
    }

    @GetMapping("/allReservations")
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/allReservationsByUserId")
    public List<Reservation> getAllReservationsByUserId(final @RequestParam("id_user") Long id_user ) {
        return reservationService.findReservationByIdUser(id_user);
    }

    @GetMapping("/allReservationsByIdCar")
    public List<Reservation> getAllReservationsByIdCar(final @RequestParam("id_car") Long id_car) {
        return reservationService.findReservationByIdCar(id_car);
    }
}



