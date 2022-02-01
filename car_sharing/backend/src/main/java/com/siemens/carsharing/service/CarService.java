package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.CarData;
import com.siemens.carsharing.model.Car;

import java.util.List;

public interface CarService {
    CarData saveCar(CarData carData);

    boolean deleteCar(final Long carId);

    List<Car> getAllCars();

    CarData getCarById(Long carId);

    List<Car> findCarByIdUser(Long id_user);

    List<Car> search(String keyword);

}
