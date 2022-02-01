package com.siemens.carsharing.service;

import com.siemens.carsharing.payload.request.LoginRequest;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class AuthServiceDefaultTest {
    @Autowired
    private MockMvc mvc;

    @Autowired
    private AuthServiceDefault authServiceDefault;

    @Test
    public void checkAccessWithoutAuthorization() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/users/userByIdCar?id_car=10")).andExpect(status().isUnauthorized());
    }

    @Test
    public void checkAccessWithAuthorization() throws Exception {
        LoginRequest loginRequest = new LoginRequest("andrea", "parola");
        Authentication authentication = authServiceDefault.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = authServiceDefault.jwtUtils.generateJwtToken(authentication);

        assertNotNull(jwtToken);
        mvc.perform(MockMvcRequestBuilders.get("/users/userByIdCar?id_car=10").header("Authorization", jwtToken)).andExpect(status().isOk());
    }

    @Test
    void authenticateUserWithBadCredentials() throws Exception {
        LoginRequest loginRequest = new LoginRequest("inexistentUser", "inexistentPassword");

        try{
            authServiceDefault.authenticateUser(loginRequest);
            fail("Expected BadCredentialsException for empty username");
        } catch (BadCredentialsException expected) {
            assertThat("Bad credentials").isEqualTo(expected.getMessage());
        }
    }
}