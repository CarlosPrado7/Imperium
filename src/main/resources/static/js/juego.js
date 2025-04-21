const mapa = document.getElementById("mapa");
const turnoTexto = document.getElementById("turno");
const puntos1 = document.getElementById("p1");
const puntos2 = document.getElementById("p2");
const modoIA = document.getElementById("modoIA");

let turno = 1;
let hexes = [];

function crearMapa() {
  mapa.innerHTML = "";
  hexes = [];

  for (let i = 0; i < 36; i++) {
    const hex = document.createElement("div");
    hex.classList.add("hex");
    hex.dataset.index = i;
    hex.dataset.dueño = "0";
    hex.textContent = i + 1;
    hex.addEventListener("click", () => conquistar(hex));
    mapa.appendChild(hex);
    hexes.push(hex);
  }

  hexes[0].dataset.dueño = "1";
  hexes[0].classList.add("jugador1");

  hexes[35].dataset.dueño = "2";
  hexes[35].classList.add("jugador2");

  turno = 1;
  actualizarTodo();
}

function conquistar(celda) {
  if (celda.dataset.dueño !== "0") return;

  const index = parseInt(celda.dataset.index);
  const vecinos = obtenerVecinos(index);
  const puede = vecinos.some(i => hexes[i].dataset.dueño == turno);

  if (!puede) {
    alert("Solo puedes conquistar hexágonos adyacentes.");
    return;
  }

  celda.dataset.dueño = turno;
  celda.classList.add(`jugador${turno}`);

  turno = turno === 1 ? 2 : 1;
  actualizarTodo();

  if (modoIA.checked && turno === 2) {
    setTimeout(jugadaIA, 500);
  }
}

function obtenerVecinos(index) {
  const vecinos = [];
  const fila = Math.floor(index / 6);
  const col = index % 6;

  const movimientos = [
    [-1, 0], [1, 0], // arriba, abajo
    [0, -1], [0, 1], // izquierda, derecha
    [-1, 1], [1, -1] // diagonales en filas impares
  ];

  movimientos.forEach(([df, dc]) => {
    const nf = fila + df;
    const nc = col + dc;
    if (nf >= 0 && nf < 6 && nc >= 0 && nc < 6) {
      vecinos.push(nf * 6 + nc);
    }
  });

  return vecinos;
}

function actualizarTodo() {
  let p1 = 0, p2 = 0;
  hexes.forEach(c => {
    if (c.dataset.dueño === "1") p1++;
    if (c.dataset.dueño === "2") p2++;
  });

  puntos1.textContent = p1;
  puntos2.textContent = p2;
  turnoTexto.textContent = `Turno: Jugador ${turno}`;

  if (p1 + p2 === 36) {
    if (p1 > p2) turnoTexto.textContent = "🎉 ¡Jugador 1 gana!";
    else if (p2 > p1) turnoTexto.textContent = "🎉 ¡Jugador 2 gana!";
    else turnoTexto.textContent = "🤝 ¡Empate!";
  }
}

function jugadaIA() {
  const opciones = hexes.filter(t => {
    if (t.dataset.dueño !== "0") return false;
    const vecinos = obtenerVecinos(parseInt(t.dataset.index));
    return vecinos.some(i => hexes[i].dataset.dueño == 2);
  });

  if (opciones.length > 0) {
    const aleatorio = opciones[Math.floor(Math.random() * opciones.length)];
    conquistar(aleatorio);
  }
}

function reiniciarJuego() {
  crearMapa();
}

window.onload = crearMapa;
