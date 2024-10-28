package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "gestionnaires")
public class Gestionnaire {

    @Id
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    private String telephone;

    @ManyToOne
    @JoinColumn(name = "region_id")  // Correct the name of the foreign key column
    private Region region;  // Link Gestionnaire directly to Region

    // Getters et setters
}



