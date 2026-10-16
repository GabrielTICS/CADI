/**
 * ==========================================================================
 * LÓGICA EXCLUSIVA DE LA PÁGINA: OFERTA ACADÉMICA (OFERTA.JS)
 * Efectos 3D Parallax, interactividad de tarjetas y tabla MCER
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       1. EFECTO 3D TILT EN LAS TARJETAS DE PROGRAMAS (GLASSMORPHISM)
       ---------------------------------------------------------------------- */
    // Capturamos todas las variantes de tarjetas
    const programCards = document.querySelectorAll('.program-card, .program-card-compact, .program-card-horizontal');

    // Solo aplicamos el efecto 3D si el usuario está en PC (tiene mouse)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && programCards.length > 0) {
        programCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                // Obtener dimensiones y posición exacta de la tarjeta en la pantalla
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // Eje X del ratón dentro de la tarjeta
                const y = e.clientY - rect.top;  // Eje Y del ratón dentro de la tarjeta
                
                // Calcular el centro matemático de la tarjeta
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // 1. Verificamos si es una tarjeta ancha para no deformarla
                const isWideCard = card.classList.contains('program-card') || card.classList.contains('program-card-horizontal');
                
                // 2. Si es ancha, suavizamos el efecto. Si es compacta (cuadrada), usamos el efecto fuerte.
                const divisorX = isWideCard ? 120 : 25; 
                const divisorY = isWideCard ? 150 : 25;
                const perspectiva = isWideCard ? 3000 : 1200;

                // Calcular la rotación dinámica
                const rotateX = ((y - centerY) / -divisorX); 
                const rotateY = ((x - centerX) / divisorY);

                // Aplicar la transformación 3D al CSS en tiempo real
                card.style.transform = `perspective(${perspectiva}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                card.style.transition = 'transform 0.1s ease-out'; // Transición ultra rápida para seguir el mouse
            });

            // Restablecer la tarjeta a su estado original al sacar el mouse
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'; // Retorno elástico suave
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. INTERACTIVIDAD AVANZADA EN LA TABLA MCER (FOCUS STATE)
       ---------------------------------------------------------------------- */
    const mcerRows = document.querySelectorAll('.mcer-row:not(.header)');
    
    if (mcerRows.length > 0 && !isTouchDevice) {
        mcerRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                // Atenuar sutilmente las otras filas para dar "Foco" a la seleccionada
                mcerRows.forEach(r => {
                    if (r !== row) {
                        r.style.opacity = '0.4';
                        r.style.filter = 'blur(1.5px)';
                        r.style.transition = 'all 0.3s ease';
                    }
                });
            });

            row.addEventListener('mouseleave', () => {
                // Restaurar todas las filas a la normalidad
                mcerRows.forEach(r => {
                    r.style.opacity = '1';
                    r.style.filter = 'blur(0)';
                });
            });
        });
    }
});