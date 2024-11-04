package com.abdos.amana_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private List<ProvincePostalCode> postalCodes;

    @OneToMany(mappedBy = "region")
    @JsonIgnore
    private List<Gestionnaire> gestionnaires;

    // Getters and setters
}
