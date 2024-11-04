package com.abdos.amana_app.service;


import com.abdos.amana_app.model.ProvincePostalCode;
import com.abdos.amana_app.repository.ProvincePostalCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvincePostalCodeService {

    @Autowired
    private ProvincePostalCodeRepository provincePostalCodeRepository;

    public List<ProvincePostalCode> getAllProvinces() {
        return provincePostalCodeRepository.findAll();
    }
}

