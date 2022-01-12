package com.siemens.carsharing;

import com.siemens.carsharing.service.FileStorageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import javax.annotation.Resource;

@SpringBootApplication
@ComponentScan(basePackages = {"com.siemens"})
public class CarSharingApplication implements CommandLineRunner {

    @Resource
    FileStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(CarSharingApplication.class, args);
    }

    @Override
    public void run(String... arg) throws Exception {
        storageService.deleteAll();
        storageService.init();
    }
}
