package com.desarrolloservidor.imperium.Repository;

import org.springframework.stereotype.Repository;
import com.desarrolloservidor.imperium.Entity.JugadorEntity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface JugadorRepository extends JpaRepository<JugadorEntity, String> {
    
    Optional<JugadorEntity> findByUserName(String userName);

    Optional<JugadorEntity> findByEmail(String email);

}
