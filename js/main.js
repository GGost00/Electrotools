// ========== MENÚ MÓVIL ==========
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace (móvil)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Si es un enlace de sección (comienza con #), cerrar menú
        if (link.getAttribute('href').startsWith('#')) {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
        }
    });
});

// ========== DROPDOWN EN MÓVIL ==========
const dropdownItems = document.querySelectorAll('.has-dropdown');

dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    
    // En móvil: click para abrir/cerrar
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            // Cerrar otros dropdowns
            dropdownItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle del dropdown actual
            item.classList.toggle('active');
        }
    });
    
    // En desktop: hover funciona automáticamente con CSS
});

// ========== CERRAR MENÚ AL HACER CLIC FUERA ==========
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            
            // Cerrar todos los dropdowns
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }
});

// ========== HEADER SCROLL EFFECT ==========
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========== SMOOTH SCROLL CON OFFSET PARA HEADER FIJO ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Solo aplicar smooth scroll si es un enlace de sección
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== ANIMACIÓN DE ENTRADA AL HACER SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que deben animarse
document.querySelectorAll('.feature-card, .card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== AJUSTAR MENÚ AL CAMBIAR TAMAÑO DE VENTANA ==========
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            // Resetear menú móvil al cambiar a desktop
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    }, 250);
});

// ========== PREVENIR COMPORTAMIENTO POR DEFECTO EN ENLACES DE CALCULADORA/PINOUTS/RECURSOS ==========
// (Puedes comentar esto cuando crees las páginas reales)
//document.querySelectorAll('.dropdown a').forEach(link => {
//    link.addEventListener('click', (e) => {
//        const href = link.getAttribute('href');
//        
//        // Verificar si la página existe
//        fetch(href, { method: 'HEAD' })
//            .catch(() => {
//                e.preventDefault();
//                console.log(`Página aún no creada: ${href}`);
//                alert(`La sección "${link.textContent}" estará disponible próximamente.`);
//            });
//    });
//});

// ========== MENSAJE DE CONSOLA ==========
console.log('%c⚡ ElectroTools', 'font-size: 24px; color: #f1c40f; font-weight: bold;');
console.log('%cPortal de herramientas y recursos para electrónica', 'font-size: 14px; color: #2ecc71;');
