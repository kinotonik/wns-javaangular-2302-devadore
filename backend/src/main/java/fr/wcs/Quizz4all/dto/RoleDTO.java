package fr.wcs.Quizz4all.dto;


public class RoleDTO {

    private Long id;

    private String role;

    public RoleDTO() {
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
