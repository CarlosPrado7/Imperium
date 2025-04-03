package com.desarrolloservidor.imperium.Service.Implements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.desarrolloservidor.imperium.Entity.JugadorEntity;
import com.desarrolloservidor.imperium.Model.JugadorDTO;
import com.desarrolloservidor.imperium.Repository.JugadorRepository;
import com.desarrolloservidor.imperium.Service.JugadorService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class JugadorImplement implements JugadorService{
    
    @Autowired
    private JugadorRepository jugadorRepository;

    @Override
    public boolean jugadorExiste(String dni) {
        return jugadorRepository.existsById(dni);
    }

    @Override
    public boolean userNameExiste(String username) {
        return jugadorRepository.findByUserName(username).isPresent();
    }

    @Override
    public boolean emailExiste(String email) {
        return jugadorRepository.findByEmail(email).isPresent();
    }

    @Override
    public JugadorEntity registrarJugador(JugadorDTO jugador) {
        JugadorEntity jugadorEntity = new JugadorEntity();
        jugadorEntity.setDni(jugador.getDni());
        jugadorEntity.setNombre(jugador.getNombre());
        jugadorEntity.setApellido1(jugador.getApellido1());
        jugadorEntity.setApellido2(jugador.getApellido2());
        jugadorEntity.setFechaNacimiento(java.sql.Date.valueOf(jugador.getFechaNacimiento()));
        jugadorEntity.setUserName(jugador.getUsername());
        jugadorEntity.setEmail(jugador.getEmail());
        jugadorEntity.setUserPassword(jugador.getUserPassword());
        jugadorEntity.setNumeroTelefono(jugador.getNumeroTelefono());

        return jugadorRepository.save(jugadorEntity);
    }

}
