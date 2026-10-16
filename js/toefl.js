/**
 * ==========================================================================
 * LÓGICA EXCLUSIVA DE LA PÁGINA: TOEFL Y CERTIFICACIONES (TOEFL.JS)
 * Animaciones 3D anti-deformación y utilidades
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       1. EFECTO 3D TILT (CON DETECCIÓN INTELIGENTE DE ANCHO)
       ---------------------------------------------------------------------- */
    // Capturamos todas las tarjetas de la página TOEFL
    const cards = document.querySelectorAll('.glass-card, .info-card, .toefl-banner');
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // ✨ SOLUCIÓN: Detectar matemáticamente si la tarjeta es muy ancha (más de 600px)
                const isWideCard = rect.width > 600;
                
                // Si es ancha, usamos divisores grandes para que casi no se doble. 
                // Si es cuadrada, usamos los valores normales.
                const divisorX = isWideCard ? 150 : 25; 
                const divisorY = isWideCard ? 150 : 25;
                const perspectiva = isWideCard ? 3000 : 1000;

                const rotateX = ((y - centerY) / -divisorX);
                const rotateY = ((x - centerX) / divisorY);

                card.style.transform = `perspective(${perspectiva}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. LÓGICA DEL SIMULADOR TOEFL (SI APLICA)
       ---------------------------------------------------------------------- */
    const scoreInput = document.getElementById('toefl-score-input');
    const scoreDisplay = document.getElementById('score-display');
    
    if (scoreInput && scoreDisplay) {
        scoreInput.addEventListener('input', (e) => {
            // Actualizar el valor en pantalla
            scoreDisplay.textContent = e.target.value;
            
            // Lógica de colores según puntaje (menor a 350 es rojo, mayor es verde)
            if (e.target.value >= 350) {
                scoreDisplay.style.color = '#00F0FF'; // Aprobado
                scoreDisplay.style.textShadow = '0 0 10px rgba(0, 240, 255, 0.4)';
            } else {
                scoreDisplay.style.color = '#FF2A2A'; // No aprobado
                scoreDisplay.style.textShadow = '0 0 10px rgba(255, 42, 42, 0.4)';
            }
        });
    }
});