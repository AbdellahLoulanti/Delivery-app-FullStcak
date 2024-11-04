package com.abdos.amana_app.repository;

import com.abdos.amana_app.model.Token;
import com.abdos.amana_app.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);
    List<Token> findByUser(User user);
    @Modifying
    @Transactional
    @Query("DELETE FROM Token t WHERE t.user.userId = :userId")
    void deleteTokenByUserId(Long userId);


}
