package com.abdos.amana_app.service;

import com.abdos.amana_app.dto.AffectationDTO;
import com.abdos.amana_app.mapper.MapperUtil;
import com.abdos.amana_app.model.Affectation;
import com.abdos.amana_app.repository.AffectationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AffectationService {

    @Autowired
    private AffectationRepository affectationRepository;

    public List<AffectationDTO> getAffectationsByLivreurId(Long livreurId) {
        return affectationRepository.findByLivreurId(livreurId)
                .stream()
                .map(MapperUtil::toAffectationDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public String updateStatus(Long affectationId, Affectation.Status newStatus, Long commandeId) {
        // Récupérer l'affectation par ID
        Affectation affectation = affectationRepository.findById(affectationId)
                .orElseThrow(() -> new RuntimeException("Affectation non trouvée"));

        // Mettre à jour le statut
        affectation.setStatus(newStatus);

        // Si vous avez besoin de mettre à jour la date de ramassage ou de livraison, vous pouvez le faire ici
        if (newStatus == Affectation.Status.RAMASSE) {
            affectation.setDateRamassage(LocalDate.now());
        } else if (newStatus == Affectation.Status.LIVRE) {
            affectation.setDateLivraison(LocalDate.now());
        }

        // Sauvegarder l'affectation mise à jour
        affectationRepository.save(affectation);
        return null;
    }
}