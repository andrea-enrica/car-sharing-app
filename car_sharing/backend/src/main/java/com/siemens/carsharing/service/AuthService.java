package com.siemens.carsharing.service;

import com.siemens.carsharing.payload.request.LoginRequest;
import com.siemens.carsharing.payload.request.SignupRequest;
import com.siemens.carsharing.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> authenticateUser(LoginRequest loginRequest);

    MessageResponse registerUser(SignupRequest signUpRequest);
}
