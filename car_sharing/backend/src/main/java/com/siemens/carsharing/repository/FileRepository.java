package com.siemens.carsharing.repository;

import com.siemens.carsharing.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, String> {

    @Query(value = "SELECT file.name FROM file WHERE file.plate_number = ?1 LIMIT 1",
            nativeQuery = true)
    List<String> findAllByPlate_number(String plate_number);
}
