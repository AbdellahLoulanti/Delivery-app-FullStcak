package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.ProvincePostalCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface ProvincePostalCodeRepository extends JpaRepository<ProvincePostalCode, Integer> {

    @Query("SELECT p FROM ProvincePostalCode p WHERE :postalCode BETWEEN p.postalCodeStart AND p.postalCodeEnd")
    Optional<ProvincePostalCode> findByPostalCodeRange(@Param("postalCode") int postalCode);

}

