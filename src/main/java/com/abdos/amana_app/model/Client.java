package com.abdos.amana_app.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "clients")
public class Client {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String adresse;
    private String telephone;
    private String codePostal;
    @ManyToOne
    @JoinColumn(name = "province_postal_code_id")  // Foreign key to ProvincePostalCode
    private ProvincePostalCode provincePostalCode;

    // Getters et setters
    public Long getId() {
        return userId;  // Ajouter une méthode getId()
    }
}
