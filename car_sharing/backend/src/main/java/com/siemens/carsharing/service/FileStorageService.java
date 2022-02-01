package com.siemens.carsharing.service;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

import com.siemens.carsharing.dto.FileData;
import com.siemens.carsharing.model.File;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    void init();

    void save(MultipartFile file);
    FileData save(FileData fileData);
    Resource load(String filename);

    void deleteAll();
    List<String> findAllByPlate_number(String plate_number);
    Stream<Path> loadAll();
    Resource loadFileAsResource(String filename) throws IOException;
    List<String> findAllFilesByPlate_number(String plate_number);
}