package com.abdos.amana_app.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class CommandeHistoriqueDTO {
    private Long commandeId;
    private String shippingAddress;
    private String receiverPhoneNumber;
    private BigDecimal packagePrice;
    private String deliveryPrice;
    private String provinceName;
    private LocalDate dateAffectation;
    private LocalDate dateRamassage;
    private LocalDate dateLivraison;
    private String status;
}
