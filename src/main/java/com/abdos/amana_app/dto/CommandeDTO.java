package com.abdos.amana_app.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CommandeDTO {
    private String shippingAddress;
    private String receiverPhoneNumber;
    private BigDecimal packagePrice;
    private String deliveryPriceType;
    private Integer provincePostalCodeId;
}