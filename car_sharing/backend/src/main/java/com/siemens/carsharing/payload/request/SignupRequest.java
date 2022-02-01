package com.siemens.carsharing.payload.request;

import org.hibernate.validator.constraints.Email;

import javax.validation.constraints.Size;
import java.util.Set;

public class SignupRequest {
    private String username;

    @Size(max = 50)
    @Email
    private String email;

    private Set<String> role;

    @Size(min = 6, max = 40)
    private String password;

    @Size(min = 3, max = 40)
    private String firstName;

    @Size(min = 3, max = 40)
    private String lastName;

    public SignupRequest(String username, String email, String password, String firstName, String lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRole() {
        return this.role;
    }

    public void setRole(Set<String> role) {
        this.role = role;
    }
}
