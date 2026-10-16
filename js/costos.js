/**
 * ==========================================================================
 * LÓGICA EXCLUSIVA DE LA PÁGINA: CONVOCATORIAS Y COSTOS (COSTOS.JS)
 * Filtrado dinámico de servicios, animación de tarjetas y efecto 3D
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       1. FILTRADO DINÁMICO DE SERVICIOS Y TARIFAS
       ---------------------------------------------------------------------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const priceCards = document.querySelectorAll('.price-card');

    if (filterButtons.length > 0 && priceCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Actualizar estado activo en los botones de filtro
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Transición y ocultado de tarjetas no seleccionadas
                priceCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory.includes(filterValue)) {
                        card.style.display = 'flex';
                        window.requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(15px) scale(0.96)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250); // Coincide con el tiempo de animación
                    }
                });
            });
        });
    }

    /* ----------------------------------------------------------------------
       2. EFECTO 3D TILT EN LAS TARJETAS DE PRECIO (SOLO EN PC / MOUSE)
       ---------------------------------------------------------------------- */
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice && priceCards.length > 0) {
        priceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / -25);
                const rotateY = ((x - centerX) / 25);

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    }
});