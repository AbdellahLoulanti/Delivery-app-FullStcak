
package com.abdos.amana_app.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "commandes")
public class Commande {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    @JsonIgnore
    private Client client;

    @ManyToOne
    @JoinColumn(name = "province_postal_code_id", nullable = false)
    private ProvincePostalCode provincePostalCode;

    @Column(name = "shipping_address", nullable = false)
    private String shippingAddress;

    @Column(name = "receiver_phone_number", nullable = false)
    private String receiverPhoneNumber;

    @Column(name = "package_price", nullable = false)
    private BigDecimal packagePrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_price", nullable = false)
    private DeliveryPriceType deliveryPrice;

    public enum DeliveryPriceType {
        INCLUS, NON_INCLUS
    }
}

