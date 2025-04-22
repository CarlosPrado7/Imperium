const mapa = document.getElementById("mapa");
const turnoTexto = document.getElementById("turno");
const puntos1 = document.getElementById("p1");
const puntos2 = document.getElementById("p2");

const seleccionadoTexto = document.getElementById("territorioSeleccionado");
const objetivoTexto = document.getElementById("territorioObjetivo");
const resultadoTexto = document.getElementById("resultadoAtaque");

let turno = 1;
let hexes = [];
let seleccionado = null;

function crearMapa() {
  mapa.innerHTML = "";
  hexes = [];

  for (let i = 0; i < 36; i++) {
    const hex = document.createElement("div");
    hex.className = "hex";
    hex.dataset.index = i;
    hex.dataset.dueño = "0";
    hex.textContent = i + 1;
    hex.addEventListener("click", () => manejarClick(hex));
    mapa.appendChild(hex);
    hexes.push(hex);
  }

  hexes[0].dataset.dueño = "1";
  hexes[0].classList.add("jugador1");

  hexes[35].dataset.dueño = "2";
  hexes[35].classList.add("jugador2");

  turno = 1;
  seleccionado = null;
  actualizarTodo();
  limpiarSeleccion();
}

function manejarClick(celda) {
  if (turno !== 1) return; // Solo jugador 1 puede hacer clic

  const dueño = parseInt(celda.dataset.dueño);
  const index = parseInt(celda.dataset.index);

  if (!seleccionado) {
    if (dueño === turno) {
      seleccionado = celda;
      celda.classList.add("seleccionado");
      seleccionadoTexto.textContent = celda.textContent;
      objetivoTexto.textContent = "Ninguno";
      resultadoTexto.textContent = "-";
    }
    return;
  }

  if (seleccionado === celda) {
    limpiarSeleccion();
    return;
  }

  if (dueño !== turno && esAdyacente(seleccionado, celda)) {
    objetivoTexto.textContent = celda.textContent;

    // ✅ Nuevo paso: preguntar suma al jugador
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    const respuesta = prompt(`🧠 ¿Cuánto es ${a} + ${b}?`);

    if (respuesta === null) {
      resultadoTexto.textContent = "❌ Turno cancelado.";
      limpiarSeleccion();
      return;
    }

    if (parseInt(respuesta) !== a + b) {
      resultadoTexto.textContent = "❌ Respuesta incorrecta. Turno perdido.";
      cambiarTurno();
      limpiarSeleccion();
      actualizarTodo();
      setTimeout(jugadaIA, 500);
      return;
    }

    // Respuesta correcta → intentar conquistar
    const exito = Math.random() < 0.6;
    if (exito) {
      celda.dataset.dueño = turno;
      celda.className = `hex jugador${turno} conquista-anim`;
      resultadoTexto.textContent = "✅ ¡Ataque exitoso!";
    } else {
      celda.classList.add("fallo-anim");
      resultadoTexto.textContent = "❌ Ataque fallido.";
      setTimeout(() => celda.classList.remove("fallo-anim"), 500);
    }

    cambiarTurno();
    limpiarSeleccion();
    actualizarTodo();
    setTimeout(jugadaIA, 500);

  } else {
    resultadoTexto.textContent = "⚠️ No puedes atacar ese hexágono.";
  }
}

function esAdyacente(c1, c2) {
  const i1 = parseInt(c1.dataset.index);
  const i2 = parseInt(c2.dataset.index);
  return obtenerVecinos(i1).includes(i2);
}

function obtenerVecinos(index) {
  const vecinos = [];
  const fila = Math.floor(index / 6);
  const col = index % 6;

  const movimientos = [
    [-1, 0], [1, 0],
    [0, -1], [0, 1],
    [-1, 1], [1, -1]
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
  turnoTexto.classList.add("cambio-turno");
  setTimeout(() => turnoTexto.classList.remove("cambio-turno"), 500);

  if (p1 + p2 === 36) {
    if (p1 > p2) turnoTexto.textContent = "🎉 ¡Jugador 1 gana!";
    else if (p2 > p1) turnoTexto.textContent = "🤖 ¡La IA gana!";
    else turnoTexto.textContent = "🤝 ¡Empate!";
  }
}

function cambiarTurno() {
  turno = turno === 1 ? 2 : 1;
}

function limpiarSeleccion() {
  if (seleccionado) {
    seleccionado.classList.remove("seleccionado");
  }
  seleccionado = null;
  seleccionadoTexto.textContent = "Ninguno";
  objetivoTexto.textContent = "Ninguno";
}

function jugadaIA() {
  if (turno !== 2) return;

  const posibles = hexes.filter(t => {
    if (t.dataset.dueño !== "2") return false;
    const vecinos = obtenerVecinos(parseInt(t.dataset.index));
    return vecinos.some(i => hexes[i].dataset.dueño == "1");
  });

  if (posibles.length > 0) {
    const origen = posibles[Math.floor(Math.random() * posibles.length)];
    const vecinos = obtenerVecinos(parseInt(origen.dataset.index))
      .map(i => hexes[i])
      .filter(t => t.dataset.dueño === "1");

    if (vecinos.length > 0) {
      const objetivo = vecinos[0];
      const exito = Math.random() < 0.6;
      if (exito) {
        objetivo.dataset.dueño = "2";
        objetivo.className = "hex jugador2 conquista-anim";
        resultadoTexto.textContent = "🤖 La IA conquistó un territorio.";
      } else {
        resultadoTexto.textContent = "🤖 La IA falló el ataque.";
      }
    }
  }

  cambiarTurno();
  actualizarTodo();
}

window.onload = crearMapa;
