package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.ERole;
import com.siemens.carsharing.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
