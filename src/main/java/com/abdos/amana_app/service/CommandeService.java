package com.abdos.amana_app.service;

import com.abdos.amana_app.dto.CommandeDTO;
import com.abdos.amana_app.dto.CommandeHistoriqueDTO;
import com.abdos.amana_app.model.Affectation;
import com.abdos.amana_app.model.Client;
import com.abdos.amana_app.model.Commande;
import com.abdos.amana_app.model.ProvincePostalCode;

import com.abdos.amana_app.repository.AffectationRepository;
import com.abdos.amana_app.repository.CommandeRepository;
import com.abdos.amana_app.repository.ProvincePostalCodeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final ClientService clientService;
    private final ProvincePostalCodeRepository provincePostalCodeRepository;
    private final AffectationRepository affectationRepository;



    public List<CommandeHistoriqueDTO> getCommandeHistorique() {
        Client client = clientService.getClientByAuthenticatedUser();

        // Récupère toutes les commandes du client
        List<Commande> commandes = commandeRepository.findByClient(client);

        return commandes.stream().map(commande -> {
            CommandeHistoriqueDTO dto = new CommandeHistoriqueDTO();
            dto.setCommandeId(commande.getId());
            dto.setShippingAddress(commande.getShippingAddress());
            dto.setReceiverPhoneNumber(commande.getReceiverPhoneNumber());
            dto.setPackagePrice(commande.getPackagePrice());
            dto.setDeliveryPrice(commande.getDeliveryPrice().name());
            dto.setProvinceName(commande.getProvincePostalCode().getProvinceName());

            // Récupère l'affectation si elle existe
            Optional<Affectation> affectation = affectationRepository.findByCommande(commande);
            if (affectation.isPresent()) {
                dto.setDateAffectation(affectation.get().getDateAffectation());
                dto.setDateRamassage(affectation.get().getDateRamassage());
                dto.setDateLivraison(affectation.get().getDateLivraison());
                dto.setStatus(affectation.get().getStatus().name());
            } else {
                // Indique des valeurs par défaut si pas d'affectation
                dto.setDateAffectation(null); // ou "Non affectée" si tu veux l'indiquer comme String
                dto.setDateRamassage(null);
                dto.setDateLivraison(null);
                dto.setStatus("En attente"); // Status par défaut
            }

            return dto;
        }).collect(Collectors.toList());
    }


    public Commande createCommande(CommandeDTO commandeDTO) {
        Client client = clientService.getClientByAuthenticatedUser();

        ProvincePostalCode provincePostalCode = provincePostalCodeRepository.findById(commandeDTO.getProvincePostalCodeId())
                .orElseThrow(() -> new EntityNotFoundException("Province not found for ID: " + commandeDTO.getProvincePostalCodeId()));

        Commande commande = new Commande();
        commande.setClient(client);
        commande.setShippingAddress(commandeDTO.getShippingAddress());
        commande.setReceiverPhoneNumber(commandeDTO.getReceiverPhoneNumber());
        commande.setPackagePrice(commandeDTO.getPackagePrice());
        commande.setDeliveryPrice(Commande.DeliveryPriceType.valueOf(commandeDTO.getDeliveryPriceType()));
        commande.setProvincePostalCode(provincePostalCode);

        return commandeRepository.save(commande);
    }
}
