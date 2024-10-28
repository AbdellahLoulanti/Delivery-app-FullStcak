package com.abdos.amana_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "affectations")
public class Affectation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "commande_id", nullable = false)
    private Commande commande;

    @ManyToOne
    @JoinColumn(name = "livreur_id", nullable = false)
    private Livreur livreur;

    @ManyToOne
    @JoinColumn(name = "gestionnaire_id", nullable = false)
    private Gestionnaire gestionnaire;

    @Column(name = "date_affectation", nullable = false)
    private LocalDate dateAffectation;

    @Column(name = "date_ramassage")
    private LocalDate dateRamassage;

    @Column(name = "date_livraison")
    private LocalDate dateLivraison;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.AFFECTE;

    public enum Status {
        AFFECTE, RAMASSE, LIVRE
    }
}
