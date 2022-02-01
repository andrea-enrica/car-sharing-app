package com.siemens.carsharing.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.siemens.carsharing.dto.ReservationData;
import com.siemens.carsharing.model.Reservation;
import com.siemens.carsharing.payload.request.LoginRequest;
import com.siemens.carsharing.security.jwt.JwtUtils;
import com.siemens.carsharing.service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    ReservationService reservationService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    String jwtToken = null;

    @BeforeEach
    void setUp() {
        LoginRequest loginRequest = new LoginRequest("andrea", "parola");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        jwtToken = jwtUtils.generateJwtToken(authentication);
    }

    @Test
    void saveReservation() throws Exception {
        ReservationData reservationData = new ReservationData(10L, 1L, "1/14/2022", "11:36 PM", "1/16/2022", "11:36 PM", 50D, "cash", "Cluj-Napoca", "Maramuresului 20", "returned");

        when(reservationService.saveReservation(reservationData)).thenReturn(reservationData);

        mockMvc.perform(MockMvcRequestBuilders.post("/reservations/reservation")
                        .header("Authorization", "Bearer " + jwtToken)
                        .content(asJsonString(reservationData))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAllReservations() throws Exception {
        List<Reservation> reservationList = Arrays.asList(
                new Reservation(2L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(10L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(13L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(13L, 2L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(14L, 3L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned")
        );

        when(reservationService.getAllReservations()).thenReturn(reservationList);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/reservations/allReservations")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();

        String result = mvcResult.getResponse().getContentAsString();
        List<String> resultList= List.of(result.split("}"));
        System.out.println(result);

        assertNotNull(result);

        resultList.forEach(System.out::println);
        assertThat(resultList.size()).isEqualTo(6);
    }

    @Test
    void getAllReservationsByUserId() throws Exception {
        List<Reservation> reservationList = Arrays.asList(
                new Reservation(2L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(10L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(13L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned")
        );

        when(reservationService.findReservationByIdUser(1L)).thenReturn(reservationList);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/reservations/allReservationsByUserId?id_user=1")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();

        String result = mvcResult.getResponse().getContentAsString();
        List<String> resultList= List.of(result.split("}"));

        assertNotNull(result);
        assertThat(resultList.size()).isEqualTo(4);
    }

    @Test
    void getAllReservationsByIdCar() throws Exception {
        List<Reservation> reservationList = Arrays.asList(
                new Reservation(13L, 1L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned"),
                new Reservation(13L, 2L, "Cluj-Napoca", "1/13/2022", "12:18 PM", "1/13/2022", "12:18 PM", 50D, "cash", "Maramuresului 20", "returned")
        );

        when(reservationService.findReservationByIdCar(13L)).thenReturn(reservationList);

        MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders.get("/reservations/allReservationsByIdCar?id_car=13")
                        .header("Authorization", "Bearer " + jwtToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();

        String result = mvcResult.getResponse().getContentAsString();
        List<String> resultList= List.of(result.split("}"));

        assertNotNull(result);
        assertThat(resultList.size()).isEqualTo(3);
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}