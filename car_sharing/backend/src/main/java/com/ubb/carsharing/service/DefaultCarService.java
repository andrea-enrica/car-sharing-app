package com.siemens.carsharing.service;

import com.siemens.carsharing.dto.CarData;
import com.siemens.carsharing.model.Car;
import com.siemens.carsharing.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("carService")
public class DefaultCarService implements CarService {
    @Autowired
    private CarRepository carRepository;

    @Override
    public CarData saveCar(CarData carData) {
        Car carModel = populateCarEntity(carData);
        return populateCarData(carRepository.save(carModel));
    }

    @Override
    public boolean deleteCar(Long carId) {
        return false;
    }

    @Override
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    @Override
    public CarData getCarById(Long carId) {
        return populateCarData(carRepository.getById(carId));
    }

    @Override
    public List<Car> search(String keyword) {
        return carRepository.findCarByKeyword(keyword);
    }

    @Override
    public List<Car> findCarByIdUser(Long id_user) {
        return carRepository.findCarByIdUser(id_user);
    }

    private CarData populateCarData(Car carEntityToObject) {
        CarData carData = new CarData();
        carData.setIdCar(carEntityToObject.getIdCar());
        carData.setModel(carEntityToObject.getModel());
        carData.setBrand(carEntityToObject.getBrand());
        carData.setCity(carEntityToObject.getCity());
        carData.setIdUser(carEntityToObject.getIdUser());
        carData.setMan_year(carEntityToObject.getMan_year());
        carData.setSeats(carEntityToObject.getSeats());
        carData.setBody_type(carEntityToObject.getBody_type());
        carData.setDriving_license_category(carEntityToObject.getDriving_license_category());
        carData.setDescription(carEntityToObject.getDescription());
        carData.setPlate_number(carEntityToObject.getPlate_number());
        carData.setDaily_rental_price(carEntityToObject.getDaily_rental_price());
        carData.setAvailable(carEntityToObject.getAvailable());
        carData.setAddress(carEntityToObject.getAddress());
        carData.setStatus(carEntityToObject.getStatus());
        return carData;
    }

    private Car populateCarEntity(CarData carData) {
        Car car = new Car();
        car.setIdCar(carData.getIdCar());
        car.setMan_year(carData.getMan_year());
        car.setModel(carData.getModel());
        car.setBrand(carData.getBrand());
        car.setCity(carData.getCity());
        car.setIdUser(carData.getIdUser());
        car.setSeats(carData.getSeats());
        car.setBody_type(carData.getBody_type());
        car.setDriving_license_category(carData.getDriving_license_category());
        car.setDescription(carData.getDescription());
        car.setPlate_number(carData.getPlate_number());
        car.setDaily_rental_price(carData.getDaily_rental_price());
        car.setAvailable(carData.getAvailable());
        car.setAddress(carData.getAddress());
        car.setStatus(carData.getStatus());

        return car;
    }
}
