package com.desarrolloservidor.imperium.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "partidas")
public class PartidaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "puntos_jugador", nullable = false)
    private int puntosJugador;

    @Column(name = "puntos_ia", nullable = false)
    private int puntosIA;

    @Column(nullable = false)
    private int movimientos;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Dificultad dificultad;

    @Column(name = "fecha", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime fecha;

    @Column(name = "dni_jugador", nullable = false, length = 9)
    private String dniJugador;

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

    public Dificultad getDificultad() {
        return dificultad;
    }

    public void setDificultad(Dificultad dificultad) {
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
        return "PartidaEntity [id=" + id + ", puntosJugador=" + puntosJugador + ", puntosIA=" + puntosIA
                + ", movimientos=" + movimientos + ", dificultad=" + dificultad + ", fecha=" + fecha + ", dniJugador="
                + dniJugador + "]";
    } 

}


