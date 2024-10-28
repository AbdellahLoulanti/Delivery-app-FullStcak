package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "province_postal_code")
public class ProvincePostalCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "region_id")  // Link ProvincePostalCode to Region
    private Region region;

    @Column(name = "province_name", nullable = false)
    private String provinceName;

    @Column(name = "postal_code_start", nullable = false)
    private Integer postalCodeStart;

    @Column(name = "postal_code_end", nullable = false)
    private Integer postalCodeEnd;



}

