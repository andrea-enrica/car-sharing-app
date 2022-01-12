package com.siemens.carsharing.dto;

public class ReservationData {
    private Long id_reservation;
    private Long idCar;
    private Long idUser;
    private String start_date;
    private String start_time;
    private String end_date;
    private String end_time;
    private Double total_reservation_price;
    private String payment_method;
    private String city;
    private String address;

    private String status;

    public ReservationData(Long id_reservation, Long idCar, Long idUser, String start_date, String start_time, String end_date, String end_time, Double total_reservation_price, String payment_method, String city, String address, String status) {
        this.id_reservation = id_reservation;
        this.idCar = idCar;
        this.idUser = idUser;
        this.start_date = start_date;
        this.start_time = start_time;
        this.end_date = end_date;
        this.end_time = end_time;
        this.total_reservation_price = total_reservation_price;
        this.payment_method = payment_method;
        this.city=city;
        this.address=address;
        this.status=status;
    }

    public ReservationData() {

    }

    public Long getId_reservation() {
        return id_reservation;
    }

    public void setId_reservation(Long id_reservation) {
        this.id_reservation = id_reservation;
    }

    public Long getIdCar() {
        return idCar;
    }

    public void setIdCar(Long idCar) {
        this.idCar = idCar;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getStart_date() {
        return start_date;
    }

    public void setStart_date(String start_date) {
        this.start_date = start_date;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String end_date) {
        this.end_date = end_date;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public Double getTotal_reservation_price() {
        return total_reservation_price;
    }

    public void setTotal_reservation_price(Double total_reservation_price) {
        this.total_reservation_price = total_reservation_price;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    public String getStatus() {return status;}

    public void setStatus(String status) {this.status = status;}

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "ReservationData{" +
                "id_reservation=" + id_reservation +
                ", idCar=" + idCar +
                ", idUser=" + idUser +
                ", start_date='" + start_date + '\'' +
                ", start_time='" + start_time + '\'' +
                ", end_date='" + end_date + '\'' +
                ", end_time='" + end_time + '\'' +
                ", total_reservation_price=" + total_reservation_price +
                ", payment_method='" + payment_method + '\'' +
                ", city='" + city + '\'' +
                ", address='" + address + '\'' +
                ", status='" + status + '\'' +
                '}';
    }

}

