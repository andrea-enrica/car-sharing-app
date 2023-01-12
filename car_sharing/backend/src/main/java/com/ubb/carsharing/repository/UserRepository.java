package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Override
    User getById(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    @Query(value = "SELECT * FROM car c LEFT JOIN users u on c.id_user = u.id_user WHERE id_car = :id_car",
            nativeQuery = true)
    User findUserByIdCar(@Param("id_car") Long id_car);

    @Modifying
    @Query(value = "DELETE FROM users u WHERE u.username = :username",
            nativeQuery = true)
    void deleteByUsername(@Param("username") String username);
}
