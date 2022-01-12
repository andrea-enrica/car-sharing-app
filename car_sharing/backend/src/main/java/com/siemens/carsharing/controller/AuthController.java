package com.siemens.carsharing.controller;

import com.siemens.carsharing.payload.request.LoginRequest;
import com.siemens.carsharing.payload.request.SignupRequest;
import com.siemens.carsharing.payload.response.MessageResponse;

import com.siemens.carsharing.service.AuthService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Resource(name = "authService")
    private AuthService authService;

    @PostMapping("/signup")
    public MessageResponse registerUser(@RequestBody SignupRequest signUpRequest){return authService.registerUser(signUpRequest);}

   @PostMapping("/signin")
   public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest){return authService.authenticateUser(loginRequest);}
}
