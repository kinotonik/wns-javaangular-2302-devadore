package com.wcs.server.entity;

public class UserRegistrationRequest {
    private String username;
    private String password;
    private String email;
    // Add any other fields needed for registration

    // Getters and setters


    public UserRegistrationRequest() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}