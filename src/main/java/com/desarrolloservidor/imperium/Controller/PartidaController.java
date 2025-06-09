package com.desarrolloservidor.imperium.Controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desarrolloservidor.imperium.Entity.Dificultad;
import com.desarrolloservidor.imperium.Entity.PartidaEntity;
import com.desarrolloservidor.imperium.Model.PartidaDTO;
import com.desarrolloservidor.imperium.Repository.PartidaRepository;

@RestController
@RequestMapping("/partida")
public class PartidaController {
    
    @Autowired
    private PartidaRepository partidaRepository;

    @PostMapping("/guardar")
    public PartidaEntity guardarPartida (@RequestBody PartidaDTO partidaDTO) {

        PartidaEntity partidaEntity = new PartidaEntity();

        partidaEntity.setPuntosJugador(partidaDTO.getPuntosJugador());
        partidaEntity.setPuntosIA(partidaDTO.getPuntosIA());
        partidaEntity.setMovimientos(partidaDTO.getMovimientos());
        partidaEntity.setDificultad(Dificultad.valueOf(partidaDTO.getDificultad().toLowerCase()));
        partidaEntity.setFecha(LocalDateTime.now());
        partidaEntity.setDniJugador(partidaDTO.getDniJugador());

        return partidaRepository.save(partidaEntity);
    }

}
