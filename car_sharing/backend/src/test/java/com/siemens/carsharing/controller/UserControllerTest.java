package com.siemens.carsharing.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.siemens.carsharing.dto.UserData;
import com.siemens.carsharing.payload.request.LoginRequest;
import com.siemens.carsharing.payload.request.SignupRequest;
import com.siemens.carsharing.repository.UserRepository;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.nio.charset.Charset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));
    LoginRequest loginRequest = null;
    String token = null;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private UserRepository userRepository;

    @BeforeAll
    public void beforeAll() throws Exception {
        loginRequest = new LoginRequest("andrea", "parola");
        Object mapper = new ObjectMapper();
        ((ObjectMapper) mapper).configure(SerializationFeature.WRAP_ROOT_VALUE, false);
        ObjectWriter ow = ((ObjectMapper) mapper).writer().withDefaultPrettyPrinter();
        String requestJson = ow.writeValueAsString(loginRequest);

        MvcResult result = mvc.perform(MockMvcRequestBuilders.post("/api/auth/signin")
                        .contentType(APPLICATION_JSON_UTF8)
                        .content(requestJson))
                .andExpect(status().isOk()).andReturn();

        String loginResponse = result.getResponse().getContentAsString().replaceAll(".\".+accessToken\":\"", "");
        token = loginResponse.replaceAll("\".+", "");
    }

    @AfterAll
    public void afterAll() {
        token = null;
        loginRequest = null;
    }

    @Test
    void getUserById() throws Exception {
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/users/userById?id_user=1")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void getUserByIdCar() throws Exception {
        assertNotNull(token);
        mvc.perform(MockMvcRequestBuilders.get("/users/userByIdCar?id_car=10")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    void registerUser() throws Exception {
        SignupRequest signupRequest = new SignupRequest("userTest", "userTest@gmail.com", "parola", "User", "Test");
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
    void deleteUserByUsername() throws Exception {
        registerUser();
        mvc.perform(MockMvcRequestBuilders.delete("/users/userByUsername?username=userTest")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
        assertThat(userRepository.findByUsername("userTest").isEmpty());
    }
}