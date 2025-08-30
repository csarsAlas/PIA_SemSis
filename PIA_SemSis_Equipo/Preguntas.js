// Preguntas del test PSS-10
const PSS10 = [
    { question: "1. En el último mes, ¿con qué frecuencia te has sentido molesto por algo que sucedió inesperadamente?" },
    { question: "2. En el último mes, ¿con qué frecuencia has sentido que no podías controlar las cosas importantes en tu vida?" },
    { question: "3. En el último mes, ¿con qué frecuencia te has sentido nervioso y 'estresado'?" },
    { question: "4. En el último mes, ¿con qué frecuencia te has sentido seguro de tu capacidad para manejar tus problemas personales?" },
    { question: "5. En el último mes, ¿con qué frecuencia has sentido que las cosas iban a tu favor?" },
    { question: "6. En el último mes, ¿con qué frecuencia has encontrado que no podías hacer frente a todas las cosas que tenías que hacer?" },
    { question: "7. En el último mes, ¿con qué frecuencia has podido controlar las irritaciones en tu vida?" },
    { question: "8. En el último mes, ¿con qué frecuencia has sentido que estabas al tanto de las cosas?" },
    { question: "9. En el último mes, ¿con qué frecuencia te has sentido enojado por cosas que estaban fuera de tu control?" },
    { question: "10. En el último mes, ¿con qué frecuencia has sentido que las dificultades se acumulaban tanto que no podías superarlas?" }
];

// preguntas personalizadas
const preguntasPersonalizadas = [
    { question: "1. ¿Practicas alguna actividad física o deporte de manera regular?" },
    { question: "2. ¿Con qué frecuencia duermes al menos 7 horas por noche?" },
    { question: "3. ¿Cuentas con alguien de confianza con quien puedas hablar sobre tus problemas?" },
    { question: "4. ¿Con qué frecuencia dedicas tiempo a actividades que disfrutas (hobbies, pasatiempos)?" },
    { question: "5. ¿Te consideras una persona organizada en tus actividades diarias?" }
];

const itemsInvertidos = [3, 4, 6, 7]; // ESTAS SON LAS PREGUNTAS POSITIVAS. SON LAS QUE SE INVIERTE LA RESPUESTA

let indicePreguntaActual = 0;
let respuestasUsuario = [];

// para manejar preguntas personalizadas después de resultados
let indicePersonalizada = 0;
let respuestasPersonalizadas = [];

// Iniciar test PSS-10
document.getElementById('startButton').addEventListener('click', function () {
    this.style.display = 'none';
    indicePreguntaActual = 0;
    respuestasUsuario = [];
    indicePersonalizada = 0;
    respuestasPersonalizadas = [];
    mostrarPregunta();
});

function mostrarPregunta() {
    const preguntaElement = document.getElementById('pregunta');
    const respuestasElement = document.getElementById('respuestas');
    preguntaElement.textContent = PSS10[indicePreguntaActual].question;
    respuestasElement.innerHTML = `
        <div class="respuesta-item"><label><input type="radio" name="respuesta" value="0"><span>0 - Nunca</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respuesta" value="1"><span>1 - Casi Nunca</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respuesta" value="2"><span>2 - A veces</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respuesta" value="3"><span>3 - Frecuentemente</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respuesta" value="4"><span>4 - Muy Frecuentemente</span></label></div>
        <button type="button" onclick="manejarRespuesta()" class="boton-siguiente">Siguiente</button>
    `;
}

function manejarRespuesta() {
    const respuestas = document.getElementsByName('respuesta');
    let valorSeleccionado = null;
    for (let r of respuestas) if (r.checked) valorSeleccionado = parseInt(r.value);
    if (valorSeleccionado === null) return alert("Elige la respuesta con la que más te identifiques");
    respuestasUsuario.push(valorSeleccionado);
    indicePreguntaActual++;
    if (indicePreguntaActual < PSS10.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    // invertir items
    for (let i of itemsInvertidos) respuestasUsuario[i] = 4 - respuestasUsuario[i];
    const total = respuestasUsuario.reduce((a,b)=>a+b,0);
    let nivel = total<=13?"Bajo":total<=26?"Moderado":"Alto";
    let msg = total<=13?"¡Excelente! Manejas bien las situaciones estresantes.":
              total<=26?"Experimentas un nivel de estrés dentro del rango promedio.":
              "Tu nivel de estrés es significativamente elevado.";

    document.getElementById('quizForm').style.display = 'none';
    document.getElementById('resultado').innerHTML = `
        <div class="resultado-container">
            <h2>Resultados del Test de Estrés PSS-10</h2>
            <div class="nivel-estres ${nivel.toLowerCase()}"><p>Nivel de estrés: <strong>${nivel}</strong></p><p>Puntaje total: ${total} / 40</p></div>
            <div class="mensaje-detallado"><p>${msg}</p></div>
        </div>
        <button id="startPersonal" class="boton-siguiente">Iniciar Preguntas Personalizadas</button>
    `;
    // ocultar contenedor estático
    document.getElementById('personalContainer').style.display = 'none';
    document.getElementById('startPersonal').addEventListener('click', () => {
        document.getElementById('startPersonal').style.display = 'none';
        document.getElementById('personalContainer').style.display = 'block';
        mostrarPreguntaPersonal();
    });
}

function mostrarPreguntaPersonal() {
    const pEl = document.getElementById('preguntaPers');
    const rEl = document.getElementById('respuestasPers');
    const pregunta = preguntasPersonalizadas[indicePersonalizada].question;
    pEl.textContent = pregunta;
    rEl.innerHTML = `
        <div class="respuesta-item"><label><input type="radio" name="respPers" value="0"><span>0 - Nunca</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respPers" value="1"><span>1 - A veces</span></label></div>
        <div class="respuesta-item"><label><input type="radio" name="respPers" value="2"><span>2 - Siempre</span></label></div>
        <button type="button" onclick="manejarPersonal()" class="boton-siguiente">Siguiente</button>
    `;
}

function manejarPersonal() {
    const opts = document.getElementsByName('respPers');
    let val = null; for (let o of opts) if (o.checked) val = parseInt(o.value);
    if (val === null) return alert("Elige la respuesta con la que más te identifiques");
    respuestasPersonalizadas.push(val);
    indicePersonalizada++;
    if (indicePersonalizada < preguntasPersonalizadas.length) {
        mostrarPreguntaPersonal();
    } else {
        localStorage.setItem('respuestasUsuario', JSON.stringify(respuestasUsuario));
        localStorage.setItem('respuestasPersonalizadas', JSON.stringify(respuestasPersonalizadas));
        window.location.href = 'recomendaciones.html';
    }
}



