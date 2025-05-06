// Modales generales de victoria, derrota y informacion
const modalInfo = document.getElementById('modalInfo');
const modalVictoria = document.getElementById('modalVictoria');
const modalDerrota = document.getElementById('modalDerrota');

const btnInfo = document.getElementById('btnInfo');
const cerrarInfo = document.getElementById('cerrarInfo');

btnInfo.addEventListener('click', () => {
  modalInfo.classList.remove('oculto');
});

cerrarInfo.addEventListener('click', () => {
  modalInfo.classList.add('oculto');
});

window.addEventListener('click', (e) => {
  if (e.target === modalInfo) modalInfo.classList.add('oculto');
});

function mostrarVictoria() {
  modalVictoria.classList.remove('oculto');
}

function mostrarDerrota() {
  modalDerrota.classList.remove('oculto');
}

function reiniciarJuego() {
  location.reload();
}

const mapa = document.getElementById('mapa');
  const filas = 10;
  const columnas = 10;

  function createHex(id) {
    const hex = document.createElement('div');
    hex.className = 'hex-tile';
    hex.dataset.id = id;

    // Interacción: click para cambiar color (simula conquista)
    hex.addEventListener('click', () => {
      hex.classList.toggle('owned');
    });

    return hex;
  }

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {
      const hex = createHex(`${x}-${y}`);
      mapa.appendChild(hex);
    }
  }