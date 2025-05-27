document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('selector-dificultad');
  const mapa = document.getElementById('mapa');
  const puntosEl = document.getElementById('puntos');
  const movimientosEl = document.getElementById('movimientos');

  let puntosJugador = 0;
  let puntosIA = 0;
  let movimientos = 0;
  let totalHexagonos = 25;
  let hexagonos = [];
  let esTurnoIA = false;
  let dificultadActual = 'facil';
  let columnas = 5;

  selector.addEventListener('change', () => {
    dificultadActual = selector.value;
    mapa.className = 'hex-map';
    mapa.classList.add(`mapa-${dificultadActual}`);
    generarMapa(dificultadActual);
  });

  function generarMapa(dificultad) {
    mapa.innerHTML = '';
    puntosJugador = 0;
    puntosIA = 0;
    movimientos = 0;
    actualizarEstado();

    totalHexagonos = dificultad === 'facil' ? 25 : 100;
    columnas = dificultad === 'facil' ? 5 : 10;
    hexagonos = [];

    for (let i = 0; i < totalHexagonos; i++) {
      const hex = document.createElement('div');
      hex.classList.add('hex');
      hex.dataset.index = i;

      if (dificultad === 'dificil') {
        const rand = Math.random();
        if (rand < 0.15) {
          hex.classList.add('obstaculo');
          hex.title = 'Obstáculo';
        } else if (rand < 0.20) {
          hex.classList.add('bonificacion');
          hex.title = 'Bonificación';
        }
      }

      mapa.appendChild(hex);
      hexagonos.push(hex);
    }

    marcarTerritorio(0, 'jugador');
    marcarTerritorio(totalHexagonos - 1, 'ia');
    esTurnoIA = true;
    setTimeout(turnoIA, 500);
  }

  function marcarTerritorio(index, quien) {
    const hex = hexagonos[index];
    if (!hex || hex.classList.contains('visitado')) return;

    hex.classList.add('visitado', quien);
    hex.dataset.control = quien;

    if (hex.classList.contains('obstaculo')) {
      quien === 'jugador' ? puntosJugador -= 5 : puntosIA -= 5;
    } else if (hex.classList.contains('bonificacion')) {
      quien === 'jugador' ? puntosJugador += 10 : puntosIA += 10;
    } else {
      quien === 'jugador' ? puntosJugador += 1 : puntosIA += 1;
    }

    movimientos++;
    actualizarEstado();

    if (movimientos >= totalHexagonos) {
      setTimeout(() => {
        alert(`🎉 Juego terminado\nJugador: ${puntosJugador} pts\nIA: ${puntosIA} pts`);
      }, 100);
    }
  }

  // Turno del jugador
  mapa.addEventListener('click', (e) => {
    if (esTurnoIA) return;

    const hex = e.target;
    const index = parseInt(hex.dataset.index);
    if (!esAdyacenteConquistable(index, 'jugador')) return;

    marcarTerritorio(index, 'jugador');
    esTurnoIA = true;
    setTimeout(turnoIA, 500);
  });

  function turnoIA() {
    if (!esTurnoIA) return;

    const conquistados = hexagonos
      .map((h, i) => ({ hex: h, index: i }))
      .filter(h => h.hex.dataset.control === 'ia');

    const posibles = [];

    for (const { index } of conquistados) {
      const adyacentes = obtenerAdyacentes(index);
      for (const idx of adyacentes) {
        const h = hexagonos[idx];
        if (!h.classList.contains('visitado') && !h.dataset.control) {
          posibles.push(idx);
        }
      }
    }

    if (posibles.length > 0) {
      const elegido = posibles[Math.floor(Math.random() * posibles.length)];
      marcarTerritorio(elegido, 'ia');
    }

    esTurnoIA = false;
  }

  function esAdyacenteConquistable(index, quien) {
    if (hexagonos[index].classList.contains('visitado')) return false;

    const adyacentes = obtenerAdyacentes(index);
    return adyacentes.some(idx => hexagonos[idx].dataset.control === quien);
  }

  function obtenerAdyacentes(index) {
    const filas = totalHexagonos / columnas;
    const fila = Math.floor(index / columnas);
    const col = index % columnas;

    const posibles = [
      [fila - 1, col], // arriba
      [fila + 1, col], // abajo
      [fila, col - 1], // izquierda
      [fila, col + 1]  // derecha
    ];

    return posibles
      .filter(([f, c]) => f >= 0 && f < filas && c >= 0 && c < columnas)
      .map(([f, c]) => f * columnas + c);
  }

  function actualizarEstado() {
    puntosEl.textContent = `Jugador: ${puntosJugador} | IA: ${puntosIA}`;
    movimientosEl.textContent = movimientos;
  }

  mapa.classList.add('mapa-facil');
  generarMapa('facil');
});
