/*
 * Archivo principal de la aplicación Codex Antitabacum.
 * ¡Aquí es donde la filosofía se convierte en código! 💻🧠
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECTORES DEL DOM - Nuestros puntos de anclaje en el HTML 🎯
    const meditationsContainer = document.getElementById('meditations-container');
    const dayStructureContainer = document.getElementById('day-structure');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    // 2. DATOS - Los secretos de la sabiduría estoica, guardados en un array de objetos 📚
    const meditations = [
        {
            id: 'marco-aurelio',
            time: '06:30 - 07:00',
            philosopher: 'Marco Aurelio',
            title: 'El Despertar del Emperador',
            text: 'Al amanecer, cuando tengas pereza de levantarte, ten a mano este pensamiento: me levanto para hacer el trabajo de un ser humano. ¿Acaso voy a enfadarme por ir a hacer aquello para lo que nací y para lo que fui traído al mundo? Hoy seré el emperador de mi propia mente, no el esclavo de una planta seca.',
            duration: '5-8 minutos',
            steps: ['Siéntate en el borde de la cama, pies en el suelo', 'Respira profundo 3 veces', 'Repite: "Soy el emperador de mi mente"', 'Visualiza tu día sin cigarrillos como una victoria imperial', 'Define UNA acción específica para cuando venga el deseo']
        },
        {
            id: 'socrates',
            time: '12:00 - 12:15',
            philosopher: 'Sócrates',
            title: 'El Examen del Mediodía',
            text: '¿Qué es lo que realmente busco cuando quiero fumar? ¿Placer? ¿Calma? ¿Escape? Examinemos estas sensaciones como si fuera la primera vez que las experimento. Solo sé que no necesito saber todas las respuestas para actuar sabiamente.',
            duration: '4-6 minutos',
            steps: ['Haz 3 preguntas sobre cualquier deseo que sientas', '"¿Qué busco exactamente?"', '"¿Esto me acerca o me aleja de quien quiero ser?"', '"¿Qué me diría mi yo más sabio?"', 'No busques respuestas perfectas, solo honestidad']
        },
        {
            id: 'seneca',
            time: '16:00 - 16:10',
            philosopher: 'Séneca',
            title: 'La Forja de la Tarde',
            text: 'No es que tengamos poco tiempo, sino que perdemos mucho. Cada momento de resistencia forja mi carácter como el fuego forja el acero. Mi voluntad se templa en la privación voluntaria. Soy más fuerte que hace una hora.',
            duration: '6-8 minutos',
            steps: ['Practica la "premeditatio malorum": imagina las consecuencias de fumar', 'Escribe mentalmente una carta de agradecimiento a tu yo futuro', 'Haz un pequeño ejercicio de privación (agua fría, etc.)', 'Celebra mentalmente cada hora sin fumar']
        },
        {
            id: 'zenon-de-citio',
            time: '18:30 - 18:40',
            philosopher: 'Zenón de Citio',
            title: 'La Armonía Vespertina',
            text: 'Vivo según la naturaleza, en armonía con el cosmos. Mis pulmones fueron diseñados para aire puro, no para humo. Cada respiración limpia me conecta con el orden universal. Soy parte de algo más grande que mis deseos momentáneos.',
            duration: '8-10 minutos',
            steps: ['Sal al aire libre si es posible', 'Respira conscientemente aire puro por 2 minutos', 'Contempla tu lugar en la naturaleza', 'Siente gratitud por tu cuerpo y su capacidad de sanación', 'Repite: "Actúo según mi naturaleza racional"']
        },
        {
            id: 'nietzsche',
            time: '20:00 - 20:12',
            philosopher: 'Nietzsche',
            title: 'La Transvaloración Nocturna',
            text: '¡Conviértete en quien eres! El fumador era mi pasado, el guerrero interior es mi presente. Creo nuevos valores: soy alguien que supera dependencias. Cada "no" al cigarrillo es un "sí" a mi voluntad de poder. ¿Querría vivir este momento infinitas veces?',
            duration: '5-7 minutos',
            steps: ['Define una nueva identidad: "Soy alguien que..."', 'Celebra tu capacidad de crear valores propios', 'Pregúntate: "¿Qué haría mi versión más poderosa?"', 'Ama incluso la dificultad del proceso (amor fati)']
        },
        {
            id: 'platon',
            time: '21:30 - 21:42',
            philosopher: 'Platón',
            title: 'La Ascensión de las Ideas',
            text: 'Salgo de la caverna de la adicción hacia la luz de la libertad verdadera. El placer del cigarrillo era solo sombra del verdadero bien. Mi razón gobierna mis apetitos, mi voluntad sirve a la sabiduría. Contemplo la Idea pura de Libertad.',
            duration: '8-12 minutos',
            steps: ['Visualiza la "Idea perfecta" de tu libertad', 'Siente cómo tu razón guía a tu voluntad', 'Imagina tu alma tripartita en armonía', 'Medita sobre la diferencia entre placer verdadero y falso']
        },
        {
            id: 'marx-engels',
            time: '22:30 - 22:38',
            philosopher: 'Marx & Engels',
            title: 'La Revolución del Sueño',
            text: 'Cada día sin fumar es un acto revolucionario contra el sistema que me quería dependiente. Mi liberación personal es parte de una transformación más grande. Me solidarizo con todos los que luchan por su libertad. Duermo como un guerrero que ganó una batalla.',
            duration: '4-6 minutos',
            steps: ['Reflexiona sobre el día como "praxis revolucionaria"', 'Siente orgullo por resistir al "sistema"', 'Envía mentalmente solidaridad a otros en tu situación', 'Duérmete sabiendo que cambiaste algo en el mundo']
        }
    ];

    // 3. SEGURIDAD Y LIMPIEZA - ¡¡¡SANEAR ES VIVIR!!! 🛡️
    const sanitize = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // 4. MANEJO DE ESTADO Y PERSISTENCIA - ¡Recordando cada paso del viaje! 🧠
    const getCompletedMeditations = () => {
        try {
            const completed = localStorage.getItem('completedMeditations');
            return completed ? JSON.parse(completed) : {};
        } catch (error) {
            console.error('Error al cargar datos de localStorage:', error);
            return {};
        }
    };

    const saveCompletedMeditations = (completedState) => {
        try {
            localStorage.setItem('completedMeditations', JSON.stringify(completedState));
        } catch (error) {
            console.error('Error al guardar datos en localStorage:', error);
        }
    };

    // 5. RENDERIZADO - Dibujando las meditaciones en el DOM 🎨
    const renderContent = () => {
        let completed = getCompletedMeditations();
        let meditationsHtml = '';
        let summaryHtml = '';
        let completedCount = 0;

        meditations.forEach(meditation => {
            const isCompleted = completed[meditation.id];
            if (isCompleted) { completedCount++; }
            const stepsHtml = meditation.steps.map(step => `<li>${sanitize(step)}</li>`).join('');

            meditationsHtml += `
                <article class="meditation-card ${isCompleted ? 'completed' : ''}" data-id="${meditation.id}" aria-labelledby="${sanitize(meditation.philosopher)}-title" tabindex="0">
                    <div class="time-badge">${sanitize(meditation.time)}</div>
                    <h3 class="philosopher-name" id="${sanitize(meditation.philosopher)}-title">${sanitize(meditation.philosopher)}</h3>
                    <p class="meditation-title">${sanitize(meditation.title)}</p>
                    <div class="meditation-text"><p>${sanitize(meditation.text)}</p></div>
                    <div class="practice-steps">
                        <p class="duration">Duración: ${sanitize(meditation.duration)}</p>
                        <ul>${stepsHtml}</ul>
                    </div>
                </article>
            `;
            
            const summaryName = meditation.time.split('-')[0].trim() === '06:30' ? 'Mañana' : meditation.time.split('-')[0].trim() === '12:00' ? 'Mediodía' : meditation.time.split('-')[0].trim() === '16:00' ? 'Tarde' : meditation.time.split('-')[0].trim() === '18:30' ? 'Atardecer' : meditation.time.split('-')[0].trim() === '20:00' ? 'Noche' : meditation.time.split('-')[0].trim() === '21:30' ? 'Antes de dormir' : 'Al acostarse';
            
            summaryHtml += `
                <div class="time-slot">
                    <strong>${summaryName}:</strong> ${sanitize(meditation.title)}
                </div>
            `;
        });

        meditationsContainer.innerHTML = meditationsHtml;
        dayStructureContainer.innerHTML = summaryHtml;
        updateProgress(completedCount);
    };

    // 6. INTERACTIVIDAD - ¡Haciendo que las cosas sucedan! ✍️
    meditationsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.meditation-card');
        if (card && !card.classList.contains('completed')) {
            card.classList.add('completed');
            let completed = getCompletedMeditations();
            completed[card.dataset.id] = true;
            saveCompletedMeditations(completed);
            updateProgress(Object.keys(completed).length);
        }
    });

    // 7. ACTUALIZACIÓN DE LA BARRA DE PROGRESO - ¡Celebrando los logros! 🎉
    const updateProgress = (count) => {
        const total = meditations.length;
        const percentage = (count / total) * 100;
        progressFill.style.width = `${percentage}%`;
        progressText.textContent = `${count} de ${total} Meditaciones Completadas`;
    };

    // 8. REGISTRO DEL SERVICE WORKER - ¡La clave para el modo offline! 🔑
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('service-worker.js').then(
                registration => {
                    console.log('ServiceWorker registrado con éxito:', registration);
                },
                error => {
                    console.error('Fallo en el registro del ServiceWorker:', error);
                }
            );
        });
    }

    // Y el espectáculo comienza...
    renderContent();
});

