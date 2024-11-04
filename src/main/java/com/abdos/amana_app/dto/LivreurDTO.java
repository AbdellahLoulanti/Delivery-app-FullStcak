package com.abdos.amana_app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LivreurDTO {
    private Long userId;
    private String nom; // Nom de l'utilisateur lié
    private String telephone;
    private String email;
    private String province; // Nom ou code de la province


    public LivreurDTO(Long userId, String nom, String telephone, String email, String province) {
        this.userId = userId;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.province = province;

    }
    public LivreurDTO() {}
}
