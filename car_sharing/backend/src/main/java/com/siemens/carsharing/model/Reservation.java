package com.siemens.carsharing.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_reservation;

    @Column(name="id_car")
    private Long idCar;
    @Column(name="id_user")
    private Long idUser;
    private String city;
    private String start_date;
    private String start_time;
    private String end_date;
    private String end_time;
    private Double total_reservation_price;
    private String payment_method;
    private String address;
    private String status;

    @Column
    public Long getId_reservation() {
        return id_reservation;
    }
    public void setId_reservation(Long id_reservation) {
        this.id_reservation = id_reservation;
    }

    @Column
    public Long getIdCar() {
        return idCar;
    }

    public void setIdCar(Long idCar) {
        this.idCar = idCar;
    }

    @Column
    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    @Column
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Column
    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    @Column
    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    @Column
    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    @Column
    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    @Column
    public Double getTotal_reservation_price() {
        return total_reservation_price;
    }

    public void setTotal_reservation_price(Double total_reservation_price) {
        this.total_reservation_price = total_reservation_price;
    }
    @Column
    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    @Column
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Column
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "id_reservation=" + id_reservation +
                ", id_car=" + idCar +
                ", idUser=" + idUser +
                ", city='" + city + '\'' +
                ", start_date='" + start_date + '\'' +
                ", start_time='" + start_time + '\'' +
                ", end_date='" + end_date + '\'' +
                ", end_time='" + end_time + '\'' +
                ", total_reservation_price=" + total_reservation_price +
                ", payment_method='" + payment_method + '\'' +
                ", address='" + address + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}

