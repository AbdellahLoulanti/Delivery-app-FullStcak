package com.abdos.amana_app.dto;

import com.abdos.amana_app.model.Commande.DeliveryPriceType;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CommandeUpdateDTO {
    private Integer provincePostalCodeId;
    private String shippingAddress;
    private String receiverPhoneNumber;
    private BigDecimal packagePrice;
    private DeliveryPriceType deliveryPrice;
}

