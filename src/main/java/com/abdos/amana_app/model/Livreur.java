package com.abdos.amana_app.model;

import com.abdos.amana_app.dto.LivreurDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    public Long getId() {
        return userId;  // Ajouter une méthode getId()
}
    public LivreurDTO toLivreurDTO() {
        return new LivreurDTO(
                this.userId,
                this.user.getNom(),
                this.telephone,
                this.user.getEmail(),
                this.provincePostalCode != null ? this.provincePostalCode.getProvinceName() : null
        );
    }

}

