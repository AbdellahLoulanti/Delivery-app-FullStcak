package com.abdos.amana_app.dto;

public class LivreurUpdateDTO {
    private String nom;
    private String telephone;
    private Integer provincePostalCodeId;
    private String email;
    private String password;
    private boolean accountLocked;

    // Getters et Setters
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Integer getProvincePostalCodeId() {  // Changez ici Integer -> Long
        return provincePostalCodeId;
    }

    public void setProvincePostalCodeId(Integer provincePostalCodeId) {  // Changez ici Integer -> Long
        this.provincePostalCodeId = provincePostalCodeId;
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

    public boolean isAccountLocked() {
        return accountLocked;
    }

    public void setAccountLocked(boolean accountLocked) {
        this.accountLocked = accountLocked;
}
}
