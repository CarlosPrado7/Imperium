package com.desarrolloservidor.imperium.Model;

import java.time.LocalDateTime;

public class PartidaDTO {
    
    private Long id;
    private int puntosJugador;
    private int puntosIA;
    private int movimientos;
    private String dificultad;
    private LocalDateTime fecha;
    private String dniJugador;

    public PartidaDTO() {}

    public PartidaDTO(Long id, int puntosJugador, int puntosIA, int movimientos, String dificultad, LocalDateTime fecha, String dniJugador) {
        this.id = id;
        this.puntosJugador = puntosJugador;
        this.puntosIA = puntosIA;
        this.movimientos = movimientos;
        this.dificultad = dificultad;
        this.fecha = fecha;
        this.dniJugador = dniJugador;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPuntosJugador() {
        return puntosJugador;
    }

    public void setPuntosJugador(int puntosJugador) {
        this.puntosJugador = puntosJugador;
    }

    public int getPuntosIA() {
        return puntosIA;
    }

    public void setPuntosIA(int puntosIA) {
        this.puntosIA = puntosIA;
    }

    public int getMovimientos() {
        return movimientos;
    }

    public void setMovimientos(int movimientos) {
        this.movimientos = movimientos;
    }

    public String getDificultad() {
        return dificultad;
    }

    public void setDificultad(String dificultad) {
        this.dificultad = dificultad;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getDniJugador() {
        return dniJugador;
    }

    public void setDniJugador(String dniJugador) {
        this.dniJugador = dniJugador;
    }

    @Override
    public String toString() {
        return "PartidaDTO [id=" + id + ", puntosJugador=" + puntosJugador + ", puntosIA=" + puntosIA + ", movimientos="
                + movimientos + ", dificultad=" + dificultad + ", fecha=" + fecha + ", dniJugador=" + dniJugador + "]";
    }
}
