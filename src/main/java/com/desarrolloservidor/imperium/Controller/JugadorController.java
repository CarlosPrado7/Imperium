package com.desarrolloservidor.imperium.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.desarrolloservidor.imperium.Model.JugadorDTO;
import com.desarrolloservidor.imperium.Service.JugadorService;

@RestController
@RequestMapping("/jugador")
public class JugadorController {

    @Autowired
    private JugadorService jugadorService;
    
    @PostMapping("/registrar")
    public String registrarJugador(@RequestBody JugadorDTO jugador) {
        
        if(jugadorService.jugadorExiste(jugador.getDni())){
            return "Error: El DNI ya existe";
        }
        if(jugadorService.userNameExiste(jugador.getUserName())){
            return "Error: El nombre de usuario ya existe";
        }
        if(jugadorService.emailExiste(jugador.getEmail())){
            return "Error: El email ya existe";
        }

        jugadorService.registrarJugador(jugador);
        return "Jugador registrado con éxito";
    }

}
