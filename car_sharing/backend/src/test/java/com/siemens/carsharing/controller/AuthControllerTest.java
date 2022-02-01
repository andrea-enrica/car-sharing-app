package com.siemens.carsharing.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.siemens.carsharing.payload.request.LoginRequest;
import com.siemens.carsharing.payload.request.SignupRequest;
import com.siemens.carsharing.repository.UserRepository;

import com.siemens.carsharing.service.AuthServiceDefault;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.Charset;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AuthControllerTest {
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
    SignupRequest signupRequest = null;
    LoginRequest loginRequest = null;
    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeAll
    public void beforeAll() {
        signupRequest = new SignupRequest("userTest", "userTest@gmail.com", "parola", "User", "User");
        loginRequest = new LoginRequest("andrea", "parola");
    }

    @AfterAll
    public void afterAll() throws Exception {
        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(loginRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();

        String loginResponse = result.getResponse().getContentAsString().replaceAll(".\".+accessToken\":\"", "");
        String token = loginResponse.replaceAll("\".+", "");

        mvc.perform(MockMvcRequestBuilders.delete("/users/userByUsername?username=userTest")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        assertThat(userRepository.findByUsername("userTest").isEmpty());
        signupRequest = null;
        loginRequest = null;
    }

    @Test
    void registerUser() throws Exception {
        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(signupRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();

        String response = result.getResponse().getContentAsString();
        assertEquals("{\"message\":\"User registered successfully!\"}", response);
    }

    @Test
    void registerUserWithExistingUsername() throws Exception {
        SignupRequest signupRequest = new SignupRequest("userTest", "userTest1@gmail.com", "parola", "User1", "User1");

        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(signupRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();

        String response = result.getResponse().getContentAsString().replaceAll(".\"message\":\"", "");
        response = response.replaceAll("\".+", "");
        assertEquals("Error: Username is already taken!", response);
    }

    @Test
    void registerUserWithExistingEmail() throws Exception {
        SignupRequest signupRequest = new SignupRequest("userTest1", "userTest@gmail.com", "parola", "User1", "User1");

        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(signupRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();

        String response = result.getResponse().getContentAsString().replaceAll(".\"message\":\"", "");
        response = response.replaceAll("\".+", "");
        assertEquals("Error: Email is already in use!", response);
    }

    @Test
    void authenticateUser() throws Exception {
        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(loginRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                        .andExpect(status().isOk()).andReturn();

        String loginResponse = result.getResponse().getContentAsString().replaceAll(".\".+accessToken\":\"", "");
        String token = loginResponse.replaceAll("\".+", "");

        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/users/userByIdCar?id_car=10")
                    .header("Authorization", "Bearer " + token))
            .andExpect(status().isOk());
    }

    @Test
    void authenticateUserWithBadCredentials() throws Exception {
        String username = "inexistentUser";
        String password = "inexistentPassword";

        LoginRequest login = new LoginRequest(username, password);

        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(login);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isUnauthorized()).andReturn();

        String loginResponse = result.getResponse().getContentAsString().replaceAll(".\".+accessToken\":\"", "");
        String token = loginResponse.replaceAll("\".+", "");

        assertEquals("", token);
        mvc.perform(MockMvcRequestBuilders.get("/users/userByIdCar?id_car=10")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isUnauthorized());
    }
}