    // respuestas del almacenamiento local
        const respuestasUsuario = JSON.parse(localStorage.getItem('respuestasUsuario')) || [];
        const respuestasPersonalizadas = JSON.parse(localStorage.getItem('respuestasPersonalizadas')) || [];

        if (respuestasUsuario.length === 0 || respuestasPersonalizadas.length === 0) {
            alert("No se encontraron resultados anteriores. Regresa al test.");
            window.location.href = 'index.html'; // O la página de inicio
        } else {
            console.log('Respuestas PSS-10:', respuestasUsuario);
            console.log('Respuestas Personalizadas:', respuestasPersonalizadas);
        }

        // para saber si se respondieron los test si no regresamos un mensaje
        if (!respuestasUsuario || !respuestasPersonalizadas) {
            document.getElementById('recomendaciones').innerHTML = "<p>No se encontraron resultados. Contesta el test primero</p>";
        } else {
             // Calcular el total del PSS-10
            const totalPSS10 = respuestasUsuario.reduce((a, b) => a + b, 0);
            let nivelEstres = '';
            if (totalPSS10 <= 13) {
                nivelEstres = 'bajo';
            } else if (totalPSS10 <= 26) {
                nivelEstres = 'moderado';
            } else {
                nivelEstres = 'alto';
            }

            // Recomendaciones de la escala PSS-10. EN ESTA CAMBIAREMOS LAS RECOMENDACIONES A ALGUNA QUE SEA DADA POR ALGUN PROFESIONAL
            let recomendaciones = '';

            if (nivelEstres === 'alto') {
                recomendaciones += `<p>Tu nivel de estrés es <strong>alto</strong>. Busca ayuda</p>`;
            } else if (nivelEstres === 'moderado') {
                recomendaciones += `<p>Tu nivel de estrés es <strong>moderado</strong>. Mejora </p>`;
            } else {
                recomendaciones += `<p>¡Excelente! Tu nivel de estrés es <strong>bajo</strong>. Bien</p>`;
            }

            //  Respuestas de preguntas personalizadas
            
            // Aqui pondremos todas las opciones de posibles recomendaciones que se daran para las preguntas personalizadas

            document.getElementById('recomendaciones').innerHTML = recomendaciones;
        }