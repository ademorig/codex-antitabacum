document.addEventListener('DOMContentLoaded', () => {

    const meditations = [
        {
            time: '06:30 - 07:00',
            philosopher: 'Marco Aurelio',
            title: 'El Despertar del Emperador',
            text: 'Al amanecer, cuando tengas pereza de levantarte, ten a mano este pensamiento: me levanto para hacer el trabajo de un ser humano. ¿Acaso voy a enfadarme por ir a hacer aquello para lo que nací y para lo que fui traído al mundo? Hoy seré el emperador de mi propia mente, no el esclavo de una planta seca.',
            duration: '5-8 minutos',
            steps: [
                'Siéntate en el borde de la cama, pies en el suelo',
                'Respira profundo 3 veces',
                'Repite: "Soy el emperador de mi mente"',
                'Visualiza tu día sin cigarrillos como una victoria imperial',
                'Define UNA acción específica para cuando venga el deseo'
            ]
        },
        {
            time: '12:00 - 12:15',
            philosopher: 'Sócrates',
            title: 'El Examen del Mediodía',
            text: '¿Qué es lo que realmente busco cuando quiero fumar? ¿Placer? ¿Calma? ¿Escape? Examinemos estas sensaciones como si fuera la primera vez que las experimento. Solo sé que no necesito saber todas las respuestas para actuar sabiamente.',
            duration: '4-6 minutos',
            steps: [
                'Haz 3 preguntas sobre cualquier deseo que sientas',
                '"¿Qué busco exactamente?"',
                '"¿Esto me acerca o me aleja de quien quiero ser?"',
                '"¿Qué me diría mi yo más sabio?"',
                'No busques respuestas perfectas, solo honestidad'
            ]
        },
        {
            time: '16:00 - 16:10',
            philosopher: 'Séneca',
            title: 'La Forja de la Tarde',
            text: 'No es que tengamos poco tiempo, sino que perdemos mucho. Cada momento de resistencia forja mi carácter como el fuego forja el acero. Mi voluntad se templa en la privación voluntaria. Soy más fuerte que hace una hora.',
            duration: '6-8 minutos',
            steps: [
                'Practica la "premeditatio malorum": imagina las consecuencias de fumar',
                'Escribe mentalmente una carta de agradecimiento a tu yo futuro',
                'Haz un pequeño ejercicio de privación (agua fría, etc.)',
                'Celebra mentalmente cada hora sin fumar'
            ]
        },
        {
            time: '18:30 - 18:40',
            philosopher: 'Zenón de Citio',
            title: 'La Armonía Vespertina',
            text: 'Vivo según la naturaleza, en armonía con el cosmos. Mis pulmones fueron diseñados para aire puro, no para humo. Cada respiración limpia me conecta con el orden universal. Soy parte de algo más grande que mis deseos momentáneos.',
            duration: '8-10 minutos',
            steps: [
                'Sal al aire libre si es posible',
                'Respira conscientemente aire puro por 2 minutos',
                'Contempla tu lugar en la naturaleza',
                'Siente gratitud por tu cuerpo y su capacidad de sanación',
                'Repite: "Actúo según mi naturaleza racional"'
            ]
        },
        {
            time: '20:00 - 20:12',
            philosopher: 'Nietzsche',
            title: 'La Transvaloración Nocturna',
            text: '¡Conviértete en quien eres! El fumador era mi pasado, el guerrero interior es mi presente. Creo nuevos valores: soy alguien que supera dependencias. Cada "no" al cigarrillo es un "sí" a mi voluntad de poder. ¿Querría vivir este momento infinitas veces?',
            duration: '5-7 minutos',
            steps: [
                'Define una nueva identidad: "Soy alguien que..."',
                'Celebra tu capacidad de crear valores propios',
                'Pregúntate: "¿Qué haría mi versión más poderosa?"',
                'Ama incluso la dificultad del proceso (amor fati)'
            ]
        },
        {
            time: '21:30 - 21:42',
            philosopher: 'Platón',
            title: 'La Ascensión de las Ideas',
            text: 'Salgo de la caverna de la adicción hacia la luz de la libertad verdadera. El placer del cigarrillo era solo sombra del verdadero bien. Mi razón gobierna mis apetitos, mi voluntad sirve a la sabiduría. Contemplo la Idea pura de Libertad.',
            duration: '8-12 minutos',
            steps: [
                'Visualiza la "Idea perfecta" de tu libertad',
                'Siente cómo tu razón guía a tu voluntad',
                'Imagina tu alma tripartita en armonía',
                'Medita sobre la diferencia entre placer verdadero y falso'
            ]
        },
        {
            time: '22:30 - 22:38',
            philosopher: 'Marx & Engels',
            title: 'La Revolución del Sueño',
            text: 'Cada día sin fumar es un acto revolucionario contra el sistema que me quería dependiente. Mi liberación personal es parte de una transformación más grande. Me solidarizo con todos los que luchan por su libertad. Duermo como un guerrero que ganó una batalla.',
            duration: '4-6 minutos',
            steps: [
                'Reflexiona sobre el día como "praxis revolucionaria"',
                'Siente orgullo por resistir al "sistema"',
                'Envía mentalmente solidaridad a otros en tu situación',
                'Duérmete sabiendo que cambiaste algo en el mundo'
            ]
        }
    ];

    const meditationsContainer = document.getElementById('meditations-container');
    const dayStructureContainer = document.getElementById('day-structure');

    /**
     * Sanitizes input to prevent XSS attacks.
     * @param {string} text The text to sanitize.
     * @returns {string} The sanitized text.
     */
    const sanitize = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    /**
     * Renders all meditation cards on the page.
     */
    const renderMeditations = () => {
        let htmlContent = '';
        let summaryContent = '';

        meditations.forEach(meditation => {
            const stepsHtml = meditation.steps.map(step => `<li>${sanitize(step)}</li>`).join('');

            htmlContent += `
                <article class="meditation-card" aria-labelledby="${meditation.philosopher}-title">
                    <div class="time-badge">${sanitize(meditation.time)}</div>
                    <h3 class="philosopher-name" id="${meditation.philosopher}-title">${sanitize(meditation.philosopher)}</h3>
                    <p class="meditation-title">${sanitize(meditation.title)}</p>
                    <div class="meditation-text">
                        <p>${sanitize(meditation.text)}</p>
                    </div>
                    <div class="practice-steps">
                        <p class="duration">Duración: ${sanitize(meditation.duration)}</p>
                        <ul>${stepsHtml}</ul>
                    </div>
                </article>
            `;

            summaryContent += `
                <div class="time-slot">
                    <strong>${meditation.time.split('-')[0].trim() === '06:30' ? 'Mañana:' : meditation.time.split('-')[0].trim() === '12:00' ? 'Mediodía:' : meditation.time.split('-')[0].trim() === '16:00' ? 'Tarde:' : meditation.time.split('-')[0].trim() === '18:30' ? 'Atardecer:' : meditation.time.split('-')[0].trim() === '20:00' ? 'Noche:' : meditation.time.split('-')[0].trim() === '21:30' ? 'Antes de dormir:' : 'Al acostarse:'}</strong> ${sanitize(meditation.title)}
                </div>
            `;
        });

        meditationsContainer.innerHTML = htmlContent;
        dayStructureContainer.innerHTML = summaryContent;
    };

    renderMeditations();
});