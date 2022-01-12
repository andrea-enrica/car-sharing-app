package com.siemens.carsharing.controller;

import com.siemens.carsharing.dto.UserData;
import com.siemens.carsharing.model.User;
import com.siemens.carsharing.repository.UserRepository;
import com.siemens.carsharing.service.UserService;
import org.hibernate.annotations.GeneratorType;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController {

    @Resource(name = "userService")
    private UserService userService;

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/user")
    public UserData saveUser(final @RequestBody UserData userData) {
        return userService.saveUser(userData);
    }

    @GetMapping("/userByIdCar")
    public User getUserByIdCar(final @Param("id_car") Long id_car) {
        return userRepository.findUserByIdCar(id_car);
    }

    @GetMapping("/userById")
    public UserData getUserById(final @Param("id_user") Long id_user) {
        return userService.getUserById(id_user);
    }
}
