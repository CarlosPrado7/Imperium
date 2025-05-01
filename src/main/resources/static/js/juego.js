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