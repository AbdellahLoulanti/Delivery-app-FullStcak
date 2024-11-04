package com.abdos.amana_app.controller;

import com.abdos.amana_app.model.ProvincePostalCode;
import com.abdos.amana_app.service.ProvincePostalCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/provinces")  // Change l'URL si nécessaire
public class ProvincePostalCodeController {

    @Autowired
    private ProvincePostalCodeService provincePostalCodeService;

    @GetMapping
    public List<ProvincePostalCode> getAllProvinces() {
        return provincePostalCodeService.getAllProvinces();
    }
}
