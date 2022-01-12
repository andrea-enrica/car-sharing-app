package com.siemens.carsharing.dto;

import javax.persistence.Column;

public class CarData {
    private Long idCar;
    String model;
    String brand;
    String city;
    long idUser;
    int man_year;
    short seats;
    String body_type;
    String driving_license_category;
    String description;
    String plate_number;
    String daily_rental_price;
    String available;
    String address;
    String status;

    public CarData(){
    }

    public CarData(Long idCar, String model, String brand, String city, long idUser, int man_year, short seats, String body_type, String driving_license_category, String description, String plate_number, String daily_rental_price, String available, String address, String status) {
        this.idCar = idCar;
        this.model = model;
        this.brand = brand;
        this.city = city;
        this.idUser = idUser;
        this.man_year = man_year;
        this.seats = seats;
        this.body_type = body_type;
        this.driving_license_category = driving_license_category;
        this.description = description;
        this.plate_number = plate_number;
        this.daily_rental_price = daily_rental_price;
        this.available = available;
        this.address = address;
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getIdCar() {
        return idCar;
    }

    public void setIdCar(Long idCar) {
        this.idCar = idCar;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public long getIdUser() {
        return idUser;
    }

    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    public int getMan_year() {
        return man_year;
    }

    public void setMan_year(int man_year) {
        this.man_year = man_year;
    }

    public short getSeats() {
        return seats;
    }

    public void setSeats(short seats) {
        this.seats = seats;
    }

    public String getBody_type() {
        return body_type;
    }

    public void setBody_type(String body_type) {
        this.body_type = body_type;
    }

    public String getDriving_license_category() {
        return driving_license_category;
    }

    public void setDriving_license_category(String driving_license_category) {
        this.driving_license_category = driving_license_category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPlate_number() {
        return plate_number;
    }

    public void setPlate_number(String plate_number) {
        this.plate_number = plate_number;
    }

    public String getDaily_rental_price() {
        return daily_rental_price;
    }

    public void setDaily_rental_price(String daily_rental_price) {
        this.daily_rental_price = daily_rental_price;
    }

    public String getAvailable() {
        return available;
    }

    public void setAvailable(String available) {
        this.available = available;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "CarData{" +
                "idCar=" + idCar +
                ", model='" + model + '\'' +
                ", brand='" + brand + '\'' +
                ", city='" + city + '\'' +
                ", idUser=" + idUser +
                ", man_year=" + man_year +
                ", seats=" + seats +
                ", body_type='" + body_type + '\'' +
                ", driving_license_category='" + driving_license_category + '\'' +
                ", description='" + description + '\'' +
                ", plate_number='" + plate_number + '\'' +
                ", daily_rental_price='" + daily_rental_price + '\'' +
                ", available='" + available + '\'' +
                ", address='" + address + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
