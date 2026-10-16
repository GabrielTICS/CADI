/**
 * ==========================================================================
 * LÓGICA GLOBAL Y NAVEGACIÓN - CADI UPCH (MAIN.JS)
 * Arquitectura Premium: Rendimiento, Accesibilidad y UX Avanzada
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    /* ----------------------------------------------------------------------
       1. CONTROL DEL MENÚ HAMBURGUESA (MÓVILES) Y ACCESIBILIDAD
       ---------------------------------------------------------------------- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Función centralizada para alternar el menú
        const toggleMenu = (forceState) => {
            const isMenuOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('active');
            
            navMenu.classList.toggle('active', isMenuOpen);
            hamburger.setAttribute('aria-expanded', isMenuOpen);

            // Actualización de Bootstrap Icons (Cambiamos de lista a X)
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = isMenuOpen ? 'bi bi-x-lg' : 'bi bi-list';
            }
        };

        // Evento de clic en el botón hamburguesa
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al document
            toggleMenu();
        });

        // Evento para cerrar el menú al hacer clic en cualquier enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Mejora UX Premium: Cerrar el menú si el usuario hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. EFECTO GLASSMORPHISM EN NAVBAR AL HACER SCROLL (OPTIMIZADO)
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        let isScrolling = false;

        // Función manejada por requestAnimationFrame para máximo rendimiento (60 FPS)
        const updateNavbarOnScroll = () => {
            if (window.scrollY > 40) {
                navbar.style.background = 'rgba(3, 9, 20, 0.95)';
                navbar.style.borderBottomColor = 'rgba(0, 240, 255, 0.3)';
                navbar.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.6)';
                navbar.style.padding = '10px 4%';
            } else {
                navbar.style.background = 'var(--bg-glass)';
                navbar.style.borderBottomColor = 'rgba(0, 240, 255, 0.15)';
                navbar.style.boxShadow = 'none';
                navbar.style.padding = '12px 4%'; // Retorna al padding original
            }
            isScrolling = false;
        };

        // Escucha pasiva para no bloquear el hilo de scroll del navegador
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(updateNavbarOnScroll);
                isScrolling = true;
            }
        }, { passive: true });
    }

    /* ----------------------------------------------------------------------
       3. INTERSECTION OBSERVER (REVELADO DE ELEMENTOS AL HACER SCROLL)
       ---------------------------------------------------------------------- */
    // Agrupamos las clases antiguas y nuevas para compatibilidad total
    const revealElements = document.querySelectorAll('.scroll-reveal, .fade-scroll');

    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15, // El elemento debe estar 15% visible
            rootMargin: '0px 0px -40px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Aseguramos la compatibilidad con el CSS inyectando la clase
                    el.classList.add('visible', 'is-visible');
                    
                    // Disparamos la animación CSS (si estaba pausada)
                    el.style.animationPlayState = 'running';
                    
                    // Optimizamos memoria dejando de observar el elemento una vez animado
                    observer.unobserve(el);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            // Pausamos la animación inicialmente vía JS para que no se ejecute antes de tiempo
            if (window.getComputedStyle(el).animationName !== 'none') {
                el.style.animationPlayState = 'paused';
            }
            scrollObserver.observe(el);
        });
    }

    /* ----------------------------------------------------------------------
       ALERTA DE CONVOCATORIA CERRADA (SWEETALERT2)
       ---------------------------------------------------------------------- */
    const btnCrearCuenta = document.getElementById('btn-crear-cuenta');

    if (btnCrearCuenta) {
        btnCrearCuenta.addEventListener('click', (e) => {
            // Esto evita que el botón te lleve a https://admision.cadi.upch.mx
            e.preventDefault(); 

            // Mostramos la alerta de Convocatoria Cerrada
            Swal.fire({
                title: '<strong>Convocatoria Cerrada</strong>',
                icon: 'info',
                html: `
                    <p style="font-size: 1.1rem; color: #545454; margin-bottom: 10px;">
                        Por el momento no hay periodos de inscripción abiertos.
                    </p>
                    <p style="font-size: 0.9rem; color: #888; font-weight: bold;">
                        Cerrada desde: 15 de Octubre de 2026, 18:13:13
                    </p>
                `,
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#6c757d',
                background: '#ffffff',
                customClass: {
                    title: 'swal2-title-custom',
                    popup: 'swal2-popup-custom'
                }
            });
        });
    }
});