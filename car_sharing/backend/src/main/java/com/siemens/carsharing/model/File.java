package com.siemens.carsharing.model;

import javax.persistence.*;
import java.io.InputStream;

@Entity(name = "file")
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id_file;
    private String plate_number;
    private String name;
    private String url;
    public File(String plate_number, String name, String url) {
        this.plate_number = plate_number;
        this.name = name;
        this.url = url;
    }

    public File() {
    }

    @Column
    public Long getId_file() {
        return id_file;
    }
    public void setId_file(Long id_file) {
        this.id_file = id_file;
    }


    public String getPlate_number() {return plate_number;}
    public void setPlate_number(String plate_number) {this.plate_number = plate_number;}

    @Column
    public String getName() {
        return this.name;
    }
    public void setName(String name) {
        this.name = name;
    }

    @Column
    public String getUrl() {
        return this.url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
}