
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
            <input type="radio" name="respuesta" value="0"> 0 - Nunca<br>
            <input type="radio" name="respuesta" value="1"> 1 - Casi Nunca<br>
            <input type="radio" name="respuesta" value="2"> 2 - A veces<br>
            <input type="radio" name="respuesta" value="3"> 3 - Frecuentemente<br>
            <input type="radio" name="respuesta" value="4"> 4 - Muy Frecuentemente<br>
            <button type="button" onclick="manejarRespuesta()">Siguiente</button>
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
    // for para cambiar el valor de las preguntas positivas del test 
    for (let i of itemsInvertidos) {
        respuestasUsuario[i] = 4 - respuestasUsuario[i];
    }

    const total = respuestasUsuario.reduce((a, b) => a + b, 0);

    let nivelEstres = "";
    if (total <= 13) {
        nivelEstres = "Bajo";
    } else if (total <= 26) {
        nivelEstres = "Moderado";
    } else {
        nivelEstres = "Alto";
    }

     //Impresion de los resultados, se imprime el nivel de estres y el puntaje total
    document.getElementById('quizContainer').innerHTML = '';
    document.getElementById('resultado').innerHTML = `
        <h2>Tu nivel de estrés es: ${nivelEstres}</h2>
        <p>Puntaje total: ${total} / 40</p>
    `;
}


//Pregnutas personalizadas para recomendaciones.


