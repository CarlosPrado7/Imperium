const mapa = document.getElementById("mapa");
const turnoTexto = document.getElementById("turno");
const puntos1 = document.getElementById("p1");
const puntos2 = document.getElementById("p2");

let turno = 1;
let territorios = [];

function crearMapa() {
  mapa.innerHTML = "";
  territorios = [];

  for (let i = 0; i < 25; i++) {
    const div = document.createElement("div");
    div.classList.add("territorio");
    div.dataset.index = i;
    div.dataset.dueño = "0";
    div.textContent = i + 1;
    div.addEventListener("click", () => conquistar(div));
    mapa.appendChild(div);
    territorios.push(div);
  }

  // Territorios iniciales
  territorios[0].dataset.dueño = "1";
  territorios[0].classList.add("jugador1");

  territorios[24].dataset.dueño = "2";
  territorios[24].classList.add("jugador2");

  turno = 1;
  actualizarTodo();
}

function conquistar(celda) {
  if (celda.dataset.dueño !== "0") return;

  const index = parseInt(celda.dataset.index);
  const vecinos = obtenerVecinos(index);
  const puede = vecinos.some(i => territorios[i].dataset.dueño == turno);

  if (!puede) {
    alert("Solo puedes conquistar territorios ADYACENTES a los tuyos.");
    return;
  }

  celda.dataset.dueño = turno;
  celda.classList.add(`jugador${turno}`);

  turno = turno === 1 ? 2 : 1;
  actualizarTodo();
}

function obtenerVecinos(index) {
  const vecinos = [];
  const cols = 5;

  const arriba = index - cols;
  const abajo = index + cols;
  const izquierda = (index % cols !== 0) ? index - 1 : -1;
  const derecha = (index % cols !== cols - 1) ? index + 1 : -1;

  [arriba, abajo, izquierda, derecha].forEach(i => {
    if (i >= 0 && i < 25) vecinos.push(i);
  });

  return vecinos;
}

function actualizarTodo() {
  let p1 = 0, p2 = 0;
  territorios.forEach(c => {
    if (c.dataset.dueño === "1") p1++;
    if (c.dataset.dueño === "2") p2++;
  });

  puntos1.textContent = p1;
  puntos2.textContent = p2;
  turnoTexto.textContent = `Turno: Jugador ${turno}`;

  if (p1 + p2 === 25) {
    if (p1 > p2) {
      turnoTexto.textContent = "🎉 ¡Jugador 1 gana!";
    } else if (p2 > p1) {
      turnoTexto.textContent = "🎉 ¡Jugador 2 gana!";
    } else {
      turnoTexto.textContent = "🤝 ¡Empate!";
    }
  }
}

function reiniciarJuego() {
  crearMapa();
}

window.onload = crearMapa;
