package com.abdos.amana_app.service;

import com.abdos.amana_app.model.Region;
import com.abdos.amana_app.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegionService {

    @Autowired
    private RegionRepository regionRepository;

    public Region findByName(String regionName) {
        return regionRepository.findByRegionName(regionName);
}
}
