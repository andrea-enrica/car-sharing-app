package com.siemens.carsharing.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "car")
public class Car implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCar;
    private String model;
    private String brand;
    private String city;
    private long idUser;
    private int man_year;
    private short seats;
    private String body_type;
    private String driving_license_category;
    private String description;
    private String plate_number;
    private String daily_rental_price;
    private String available;
    private String address;
    private String status;

    public Car() {
    }

    public Car(Long idCar, String model, String brand, String city, long idUser, int man_year, short seats, String body_type, String driving_license_category, String description, String plate_number, String daily_rental_price, String available, String address, String status) {
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

    @Column(name = "id_car")
    public Long getIdCar() {
        return idCar;
    }
    public void setIdCar(Long idCar) {
        this.idCar = idCar;
    }

    @Column
    public String getModel() {
        return model;
    }
    public void setModel(String model) {
        this.model = model;
    }

    @Column
    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Column
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    @Column(name = "id_user")
    public long getIdUser() {
        return idUser;
    }
    public void setIdUser(long idUser) {
        this.idUser = idUser;
    }

    @Column
    public int getMan_year() {
        return man_year;
    }
    public void setMan_year(int man_year) {
        this.man_year = man_year;
    }

    @Column
    public short getSeats() {
        return seats;
    }
    public void setSeats(short seats) {
        this.seats = seats;
    }

    @Column
    public String getBody_type() {
        return body_type;
    }
    public void setBody_type(String body_type) {
        this.body_type = body_type;
    }

    @Column
    public String getDriving_license_category() {
        return driving_license_category;
    }
    public void setDriving_license_category(String driving_license_category) {
        this.driving_license_category = driving_license_category;
    }

    @Column
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    @Column
    public String getPlate_number() {
        return plate_number;
    }
    public void setPlate_number(String plate_number) {
        this.plate_number = plate_number;
    }

    @Column
    public String getDaily_rental_price() {
        return daily_rental_price;
    }
    public void setDaily_rental_price(String daily_rental_price) {
        this.daily_rental_price = daily_rental_price;
    }

    @Column
    public String getAvailable() {
        return available;
    }
    public void setAvailable(String available) {
        this.available = available;
    }

    @Column
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Car)) return false;
        Car car = (Car) o;
        return getIdUser() == car.getIdUser() && getMan_year() == car.getMan_year() && getSeats() == car.getSeats() && Objects.equals(getIdCar(), car.getIdCar()) && Objects.equals(getModel(), car.getModel()) && Objects.equals(getBrand(), car.getBrand()) && Objects.equals(getCity(), car.getCity()) && Objects.equals(getBody_type(), car.getBody_type()) && Objects.equals(getDriving_license_category(), car.getDriving_license_category()) && Objects.equals(getDescription(), car.getDescription()) && Objects.equals(getPlate_number(), car.getPlate_number()) && Objects.equals(getDaily_rental_price(), car.getDaily_rental_price()) && Objects.equals(getAvailable(), car.getAvailable()) && Objects.equals(getAddress(), car.getAddress()) && Objects.equals(getStatus(), car.getStatus());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getIdCar(), getModel(), getBrand(), getCity(), getIdUser(), getMan_year(), getSeats(), getBody_type(), getDriving_license_category(), getDescription(), getPlate_number(), getDaily_rental_price(), getAvailable(), getAddress(), getStatus());
    }

    @Override
    public String toString() {
        return "Car{" +
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

