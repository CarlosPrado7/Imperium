package com.desarrolloservidor.imperium.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.desarrolloservidor.imperium.Entity.PartidaEntity;

public interface PartidaRepository extends JpaRepository<PartidaEntity, Long> {
    
}

