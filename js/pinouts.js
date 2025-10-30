// === BÚSQUEDA Y FILTRADO DE PINOUTS ===

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    const pinoutCards = document.querySelectorAll('.pinout-card');
    const resultCount = document.getElementById('resultCount');
    const noResults = document.getElementById('noResults');
    const pinoutsGrid = document.getElementById('pinoutsGrid');

    // Inicializar contador
    updateResultCount(pinoutCards.length);

    // Event listener para el input de búsqueda
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        filterPinouts(searchTerm);
        
        // Mostrar/ocultar botón de limpiar
        if (searchTerm.length > 0) {
            clearButton.style.display = 'block';
        } else {
            clearButton.style.display = 'none';
        }
    });

    // Event listener para el botón limpiar
    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        filterPinouts('');
    });

    // Función principal de filtrado
    function filterPinouts(searchTerm) {
        let visibleCount = 0;

        pinoutCards.forEach(card => {
            // Obtener palabras clave de la tarjeta
            const keywords = card.getAttribute('data-keywords').toLowerCase();
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            
            // Búsqueda en keywords, título y descripción
            const matchesSearch = 
                keywords.includes(searchTerm) || 
                title.includes(searchTerm) || 
                description.includes(searchTerm);

            if (matchesSearch || searchTerm === '') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Actualizar contador
        updateResultCount(visibleCount);

        // Mostrar/ocultar mensaje de sin resultados
        if (visibleCount === 0) {
            noResults.classList.remove('hidden');
            pinoutsGrid.style.display = 'none';
        } else {
            noResults.classList.add('hidden');
            pinoutsGrid.style.display = 'grid';
        }
    }

    // Actualizar contador de resultados
    function updateResultCount(count) {
        resultCount.textContent = count;
    }

    // Animación escalonada de tarjetas al cargar
    function animateCards() {
        pinoutCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    animateCards();

    // Efecto de brillo al pasar el mouse (opcional)
    pinoutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // === MENÚ HAMBURGUESA (compartido con otras páginas) ===
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});
