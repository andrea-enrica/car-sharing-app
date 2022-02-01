package com.siemens.carsharing.controller;

import com.siemens.carsharing.dto.CarData;
import com.siemens.carsharing.dto.FileData;
import com.siemens.carsharing.message.ResponseMessage;
import com.siemens.carsharing.model.File;
import com.siemens.carsharing.service.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pictures")
public class FileController {

    @Autowired
    FileStorageService storageService;
    String plateNumber;
    private static final Logger logger = (LoggerFactory.getLogger(FileController.class));

    @GetMapping("/files-by-plate-number")
    public List<String> getFilesByPlateNumber(@RequestParam("plate_number") String plateNumber) {
        return storageService.findAllByPlate_number(plateNumber);
    }

    @GetMapping("/all-files-by-plate-number")
    public List<String> getAllFilesByPlateNumber(@RequestParam("plate_number") String plateNumber) {
        return storageService.findAllFilesByPlate_number(plateNumber);
    }


    @PostMapping("/platenumber")
    public void getPlateNumber(@RequestBody Map<String, Object> plate_number) {
        String message = "";

        try {
            plateNumber = (String) plate_number.get("plate_number");
            message = "Plate number is = " + plateNumber;

        } catch (Exception e) {
            message = "Didn't get plate number";

        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";
        FileData fileData = new FileData();

        String url;
        java.io.File file1 = new java.io.File(file.getOriginalFilename());

        url = file1.getAbsolutePath();

        fileData.setName(file.getOriginalFilename());
        fileData.setUrl(url);

        fileData.setPlate_number(plateNumber);

        storageService.save(fileData);
        try {
            storageService.save(file);

            message = "Uploaded the file successfully: " + file.getOriginalFilename();
            System.out.println(message);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
        } catch (Exception e) {
            message = "Could not upload the file: " + file.getOriginalFilename() + "!";
            System.out.println(message);
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
        }

    }

    @GetMapping("/files")
    public ResponseEntity<List<File>> getListFiles() {
        List<File> fileInfos = storageService.loadAll().map(path -> {
            CarData carData = new CarData();
            Long idCar = carData.getIdCar();
            String filename = path.getFileName().toString();

            System.out.println("filename: " + filename);
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "getFile", path.getFileName().toString()).build().toString();

            return new File(plateNumber, filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }
//
//    @GetMapping("/files/{filename:.+}")
//    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
//        Resource file = storageService.load(filename);
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
//    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename, HttpServletRequest request) throws IOException {
        // Load file as Resource
        Resource resource = storageService.loadFileAsResource(filename);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);

    }


}