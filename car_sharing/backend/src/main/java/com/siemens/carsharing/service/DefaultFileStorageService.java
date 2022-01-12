package com.siemens.carsharing.service;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

import com.siemens.carsharing.dto.FileData;
import com.siemens.carsharing.exception.FileUploadExceptionAdvice;
import com.siemens.carsharing.model.File;
import com.siemens.carsharing.repository.FileRepository;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class DefaultFileStorageService implements FileStorageService {

    @Autowired
    FileRepository fileRepository;
    private final Path root = Paths.get("backend/uploads");

    @Override
    public void init() {
        try {
            Files.createDirectory(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    public FileData save(FileData fileData){
        File fileInfo = populateFileEntity(fileData);
        return populateFileData(fileRepository.save(fileInfo));
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            System.out.println("filename = " + filename + "PATH = " + file);
            System.out.println("RESOURCE = " + resource.exists() + "IS READABLE = " + resource.isReadable());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    @Override
    public List<String> findAllByPlate_number(String plate_number) {
        //System.out.println("URL = " + fileRepository.findAllByPlate_number(plate_number).get(0).getUrl());
        return fileRepository.findAllByPlate_number(plate_number);
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public Resource loadFileAsResource(String fileName) throws IOException {
        try {
            Path filePath = this.root.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            //Resource resource = new ByteArrayResource(Files.readAllBytes(filePath));
            if(resource.exists()) {
                return resource;
            } else {
                System.out.println("File not found " + fileName);
                throw new RuntimeException();
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }
    public FileData populateFileData(File fileInfo){
        FileData fileData = new FileData();
        fileData.setId_file(fileInfo.getId_file());
        fileData.setPlate_number(fileInfo.getPlate_number());
        fileData.setName(fileInfo.getName());
        fileData.setUrl(fileInfo.getUrl());
        return fileData;
    }
    public File populateFileEntity(FileData fileData){
        File fileInfo = new File();
        fileInfo.setId_file(fileData.getId_file());
        fileInfo.setPlate_number(fileData.getPlate_number());
        fileInfo.setName(fileData.getName());
        fileInfo.setUrl(fileData.getUrl());
        return fileInfo;
    }
}