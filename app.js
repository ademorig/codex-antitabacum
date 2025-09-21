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
        { id: 'marco-aurelio', time: '06:30 - 07:00', philosopher: 'Marco Aurelio', title: 'El Despertar del Emperador', text: '...', duration: '5-8 minutos', steps: ['...', '...'] },
        // (El resto de las meditaciones va aquí, ¡manteniendo el código limpio y sin repetir!)
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
            // (El código para el resumen diario sigue aquí)
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
            navigator.serviceWorker.register('/service-worker.js').then(
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
