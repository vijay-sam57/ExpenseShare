package com.example.entry.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Credential {

    private String email;
    private String password;

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

    public Credential(@JsonProperty("email") String email,@JsonProperty("password") String password) {
        this.email = email;
        this.password = password;
    }

    public Credential() {
    }

    @Override
    public String toString() {
        return "Credential [email=" + email + ", password=" + password + "]";
    }
}
