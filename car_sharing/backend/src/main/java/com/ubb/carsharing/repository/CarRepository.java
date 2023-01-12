package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CarRepository extends JpaRepository<Car, Long> {


    @Query(value = "SELECT * FROM car where " + "MATCH(brand,model,city)" +
            " AGAINST (?1)", nativeQuery = true)
    List<Car> findCarByKeyword(String keyword);


    List<Car> findCarByIdUser(Long id_user);
//    Optional<Car> findByPlate_number(String plate_number);
//
//    Boolean existsByPlate_number(String plate_number);

}
