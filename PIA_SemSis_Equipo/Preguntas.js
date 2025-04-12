
//Preguntas del test PSS-10
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

const itemsInvertidos = [3, 4, 6, 7]; // ESTAS SON LAS PREGUNTAS POSIVAS. SON LAS QUE SE INVIERTE LA RESPUESTA

//Aqui inicia el contador del puntaje de las preguntas
let indicePreguntaActual = 0;
let respuestasUsuario = [];

document.getElementById('startButton').addEventListener('click', function () {
    this.style.display = 'none';
    indicePreguntaActual = 0;
    respuestasUsuario = [];
    mostrarPregunta();
});
function mostrarPregunta() {
    const preguntaElement = document.getElementById('pregunta');
    const respuestasElement = document.getElementById('respuestas');

    if (indicePreguntaActual < PSS10.length) {
        preguntaElement.textContent = PSS10[indicePreguntaActual].question;
        respuestasElement.innerHTML = `
            <div class="respuesta-item">
                <label>
                    <input type="radio" name="respuesta" value="0">
                    <span>0 - Nunca</span>
                </label>
            </div>
            <div class="respuesta-item">
                <label>
                    <input type="radio" name="respuesta" value="1">
                    <span>1 - Casi Nunca</span>
                </label>
            </div>
            <div class="respuesta-item">
                <label>
                    <input type="radio" name="respuesta" value="2">
                    <span>2 - A veces</span>
                </label>
            </div>
            <div class="respuesta-item">
                <label>
                    <input type="radio" name="respuesta" value="3">
                    <span>3 - Frecuentemente</span>
                </label>
            </div>
            <div class="respuesta-item">
                <label>
                    <input type="radio" name="respuesta" value="4">
                    <span>4 - Muy Frecuentemente</span>
                </label>
            </div>
            <button type="button" onclick="manejarRespuesta()" class="boton-siguiente">Siguiente</button>
        `;
    }
}

function manejarRespuesta() {
    const respuestas = document.getElementsByName('respuesta');
    let valorSeleccionado = null;

    for (let i = 0; i < respuestas.length; i++) {
        if (respuestas[i].checked) {
            valorSeleccionado = parseInt(respuestas[i].value);
            break;
        }
    }

    if (valorSeleccionado === null) {
        alert("Elige la respuesta con la que mas te identifiques");
        return;
    }

    respuestasUsuario.push(valorSeleccionado);
    indicePreguntaActual++;

    if (indicePreguntaActual < PSS10.length) {
        mostrarPregunta();
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    // Inversión de ítems positivos
    for (let i of itemsInvertidos) {
        respuestasUsuario[i] = 4 - respuestasUsuario[i];
    }

    const total = respuestasUsuario.reduce((a, b) => a + b, 0);

    let nivelEstres = "";
    let mensajeDetallado = "";
    let recomendacion = "";

    if (total <= 13) {
        nivelEstres = "Bajo";
        mensajeDetallado = "¡Excelente! Manejas bien las situaciones estresantes.";
        recomendacion = "Sigue manteniendo tus buenos hábitos de manejo del estrés.";
    } else if (total <= 26) {
        nivelEstres = "Moderado";
        mensajeDetallado = "Experimentas un nivel de estrés dentro del rango promedio.";
        recomendacion = "Podrías beneficiarte de técnicas de relajación y mejor organización.";
    } else {
        nivelEstres = "Alto";
        mensajeDetallado = "Tu nivel de estrés es significativamente elevado.";
        recomendacion = "Recomendamos buscar apoyo profesional y practicar técnicas de manejo del estrés.";
    }

    document.getElementById('quizContainer').innerHTML = '';
    document.getElementById('resultado').innerHTML = `
        <div class="resultado-container">
            <h2>Resultados del Test de Estrés PSS-10</h2>
            <div class="nivel-estres ${nivelEstres.toLowerCase()}">
                <p>Nivel de estrés: <strong>${nivelEstres}</strong></p>
                <p>Puntaje total: ${total} / 40</p>
            </div>
            <div class="mensaje-detallado">
                <p>${mensajeDetallado}</p>
                <p>${recomendacion}</p>
            </div>
            <div class="interpretacion">
                <h3>¿Qué significa este resultado?</h3>
                <p>La escala PSS-10 mide qué tan estresantes evalúas tus situaciones de vida:</p>
                <ul>
                    <li><strong>0-13:</strong> Bajo estrés percibido</li>
                    <li><strong>14-26:</strong> Estrés moderado</li>
                    <li><strong>27-40:</strong> Alto estrés percibido</li>
                </ul>
            </div>
        </div>
    `;
}

//Pregnutas personalizadas para recomendaciones.


