package com.siemens.carsharing.controller;

import com.siemens.carsharing.dto.CarData;
import com.siemens.carsharing.model.Car;
import com.siemens.carsharing.service.CarService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cars")
public class CarController {
    @Resource(name = "carService")
    private CarService carService;

    @PostMapping("/car")
    public CarData saveCar(final @RequestBody CarData carData){return carService.saveCar(carData);}

    @GetMapping("/carget")
    public List<Car> getCar(){return carService.getAllCars();}

    @GetMapping("/carGetById")
    public CarData getCarById(@RequestParam("id_car") Long id_car) {
        return carService.getCarById(id_car);
    }

    @GetMapping("/id-user")
    public List<Car> getCarsByIdUser(@RequestParam("id_user") Long id_user){return carService.findCarByIdUser(id_user);}
}
