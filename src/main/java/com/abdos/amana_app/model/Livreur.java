package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@Entity
@Table(name = "livreurs")
public class Livreur {

    @Id
    private Long userId;


    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String telephone;

    @ManyToOne
    @JoinColumn(name = "province_postal_code_id")  // Foreign key to ProvincePostalCode
    private ProvincePostalCode provincePostalCode;
    // Getters et setters
}

