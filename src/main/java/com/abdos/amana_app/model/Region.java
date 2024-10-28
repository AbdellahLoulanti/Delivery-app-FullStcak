package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "regions")
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String regionName;

    @OneToMany(mappedBy = "region")
    private List<ProvincePostalCode> postalCodes;

    @OneToMany(mappedBy = "region")
    private List<Gestionnaire> gestionnaires;

    // Getters and setters
}
