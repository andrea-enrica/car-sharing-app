package com.siemens.carsharing.dto;

import java.io.InputStream;

public class FileData {
    private Long id_file;
    private String plate_number;
    private String name;
    private String url;

    public FileData() {
    }

    public FileData(Long id_file, String plate_number, String name, String url) {
        this.id_file = id_file;
        this.plate_number = plate_number;
        this.name = name;
        this.url = url;
    }

    public Long getId_file() {
        return id_file;
    }

    public void setId_file(Long id_file) {
        this.id_file = id_file;
    }

    public String getPlate_number() {
        return plate_number;
    }

    public void setPlate_number(String plate_number) {
        this.plate_number = plate_number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "FileData{" +
                "id_file=" + id_file +
                ", plate_number =" + plate_number +
                ", name='" + name + '\'' +
                ", url='" + url + '\'' +
                '}';
    }
}
