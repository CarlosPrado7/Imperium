package com.desarrolloservidor.imperium.Service;

import com.desarrolloservidor.imperium.Entity.JugadorEntity;
import com.desarrolloservidor.imperium.Model.JugadorDTO;

public interface JugadorService {

    boolean jugadorExiste(String dni);

    boolean userNameExiste(String username);

    boolean emailExiste(String email);

    JugadorEntity registrarJugador(JugadorDTO jugador);

    JugadorEntity comprobarJugador(String userName);

    JugadorDTO validarJugador(JugadorEntity jugadorEntity, String userPassword);

}
