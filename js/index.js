/**
 * ==========================================================================
 * LÓGICA EXCLUSIVA DE LA PÁGINA DE INICIO (INDEX.JS)
 * Animaciones matemáticas, Independencia de FPS y Efectos Premium
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       1. ANIMACIÓN DE CONTADORES (EASING MATEMÁTICO E INDEPENDENCIA DE FPS)
       ---------------------------------------------------------------------- */
    const statNumbers = document.querySelectorAll('.stat-number');

    // Función de Easing: Desacelera suavemente al acercarse al valor final
    const easeOutExpo = (t) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    if (statNumbers.length > 0) {
        const animateCounters = (counter) => {
            const target = parseFloat(counter.getAttribute('data-target') || 0);
            const suffix = counter.getAttribute('data-suffix') || ''; // Ej: '+', '%'
            const duration = 2000; // Exactamente 2 segundos sin importar los Hz del monitor
            let startTimestamp = null;

            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = timestamp - startTimestamp;
                
                // Calculamos el porcentaje de tiempo transcurrido (máximo 1)
                const percentComplete = Math.min(progress / duration, 1);
                
                // Aplicamos la curva matemática para suavizar el final
                const easedProgress = easeOutExpo(percentComplete);
                const currentValue = Math.floor(easedProgress * target);

                counter.innerText = `${currentValue}${suffix}`;

                if (progress < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    // Garantizamos que el valor final sea el exacto
                    counter.innerText = `${target}${suffix}`;
                }
            };
            
            window.requestAnimationFrame(step);
        };

        // Intersection Observer: Activa el contador justo cuando entra a pantalla
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters(entry.target);
                    observer.unobserve(entry.target); // Libera memoria al terminar
                }
            });
        }, {
            threshold: 0.25, // Se activa con el 25% visible
            rootMargin: '0px 0px -50px 0px'
        });

        statNumbers.forEach(counter => {
            // Inicializamos el texto a 0 antes de animar
            counter.innerText = '0';
            statsObserver.observe(counter);
        });
    }

    /* ----------------------------------------------------------------------
       2. EFECTO PARALLAX 3D (OPCIONAL PARA EL HERO SECTION)
       ---------------------------------------------------------------------- */
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-wrapper');

    if (heroSection && heroImage) {
        // Movimiento sutil de la imagen principal basado en el cursor
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
            
            heroImage.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.02)`;
        });

        // Suavizado al retirar el mouse
        heroSection.addEventListener('mouseleave', () => {
            heroImage.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            heroImage.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)';
        });
        
        // Quitar la transición durante el movimiento para evitar lag
        heroSection.addEventListener('mouseenter', () => {
            heroImage.style.transition = 'none';
        });
    }
});