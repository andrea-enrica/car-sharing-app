package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
        List<Car> findCarByIdUser(Long id_user);
}
