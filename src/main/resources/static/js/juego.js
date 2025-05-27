document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('selector-dificultad');
  const mapa = document.getElementById('mapa');
  const puntosEl = document.getElementById('puntos');
  const movimientosEl = document.getElementById('movimientos');

  let puntos = 0;
  let movimientos = 0;
  let totalHexagonos = 25;

  selector.addEventListener('change', () => {
    const dificultad = selector.value;
    mapa.className = 'hex-map';
    mapa.classList.add(`mapa-${dificultad}`);
    generarMapa(dificultad);
  });

  function generarMapa(dificultad) {
    mapa.innerHTML = '';
    puntos = 0;
    movimientos = 0;
    actualizarEstado();

    totalHexagonos = dificultad === 'facil' ? 25 : 100;

    for (let i = 0; i < totalHexagonos; i++) {
      const hex = document.createElement('div');
      hex.classList.add('hex');

      // Probabilidades para modo difícil
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

      // Evento de clic
      hex.addEventListener('click', () => {
        if (hex.classList.contains('visitado')) return;

        hex.classList.add('visitado');
        movimientos++;

        if (hex.classList.contains('obstaculo')) {
          puntos -= 5;
        } else if (hex.classList.contains('bonificacion')) {
          puntos += 10;
        } else {
          puntos += 1;
        }

        actualizarEstado();

        if (movimientos >= totalHexagonos) {
          setTimeout(() => {
            alert(`🎉 Juego terminado. Puntos finales: ${puntos}`);
          }, 100);
        }
      });

      mapa.appendChild(hex);
    }
  }

  function actualizarEstado() {
    puntosEl.textContent = puntos;
    movimientosEl.textContent = movimientos;
  }

  // Inicializa mapa fácil
  mapa.classList.add('mapa-facil');
  generarMapa('facil');
});
