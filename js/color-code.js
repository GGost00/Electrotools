// ========== DATOS DE COLORES ==========
const colorData = {
    // Valores de dígitos (0-9)
    digits: {
        'black': 0,
        'brown': 1,
        'red': 2,
        'orange': 3,
        'yellow': 4,
        'green': 5,
        'blue': 6,
        'violet': 7,
        'gray': 8,
        'white': 9
    },
    
    // Multiplicadores
    multipliers: {
        'black': 1,
        'brown': 10,
        'red': 100,
        'orange': 1000,
        'yellow': 10000,
        'green': 100000,
        'blue': 1000000,
        'violet': 10000000,
        'gray': 100000000,
        'white': 1000000000,
        'gold': 0.1,
        'silver': 0.01
    },
    
    // Tolerancias
    tolerances: {
        'brown': '±1%',
        'red': '±2%',
        'green': '±0.5%',
        'blue': '±0.25%',
        'violet': '±0.1%',
        'gray': '±0.05%',
        'gold': '±5%',
        'silver': '±10%',
        'none': '±20%'
    },
    
    // Coeficientes térmicos (ppm/K)
    tempCoefficients: {
        'black': 250,
        'brown': 100,
        'red': 50,
        'orange': 15,
        'yellow': 25,
        'blue': 10,
        'violet': 5
    }
};

// ========== ELEMENTOS DEL DOM ==========
const bandCountSelect = document.getElementById('bandCount');
const resultValue = document.getElementById('resultValue');
const resultTolerance = document.getElementById('resultTolerance');
const resultTempco = document.getElementById('resultTempco');
const resistorMain = document.querySelector('.resistor-main');

// Selectores de color
const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const color3 = document.getElementById('color3');
const color4 = document.getElementById('color4');
const color5 = document.getElementById('color5');
const color6 = document.getElementById('color6');

// Bandas visuales
const band1 = document.getElementById('band1');
const band2 = document.getElementById('band2');
const band3 = document.getElementById('band3');
const band4 = document.getElementById('band4');
const band5 = document.getElementById('band5');
const band6 = document.getElementById('band6');

// Grupos de selectores
const selector3 = document.getElementById('selector3');
const selector4 = document.getElementById('selector4');
const selector5 = document.getElementById('selector5');
const selector6 = document.getElementById('selector6');

// ========== FUNCIONES AUXILIARES ==========

/**
 * Actualiza los selectores de color según el número de bandas
 */
function updateSelectors(bandCount) {
    const count = parseInt(bandCount);
    
    // Actualizar clases de la resistencia
    resistorMain.className = 'resistor-main bands-' + count;
    
    if (count === 4) {
        // 4 bandas: Dígito, Dígito, Multiplicador, Tolerancia
        selector3.querySelector('label').textContent = '3ª Banda (Multiplicador)';
        selector4.querySelector('label').textContent = '4ª Banda (Tolerancia)';
        
        // Actualizar opciones del selector 3 a multiplicadores
        updateSelector3ToMultiplier();
        
        // Actualizar opciones del selector 4 a tolerancias
        updateSelector4ToTolerance();
        
        // Mostrar/ocultar selectores
        selector3.style.display = 'block';
        selector4.style.display = 'block';
        selector5.style.display = 'none';
        selector6.style.display = 'none';
        
        // Mostrar/ocultar bandas
        band3.style.display = 'block';
        band4.style.display = 'block';
        band5.style.display = 'none';
        band6.style.display = 'none';
        
        // Ocultar coeficiente térmico
        resultTempco.style.display = 'none';
        
    } else if (count === 5) {
        // 5 bandas: Dígito, Dígito, Dígito, Multiplicador, Tolerancia
        selector3.querySelector('label').textContent = '3ª Banda (Dígito)';
        selector4.querySelector('label').textContent = '4ª Banda (Multiplicador)';
        
        // Actualizar opciones del selector 3 a dígitos
        updateSelector3ToDigit();
        
        // Actualizar opciones del selector 4 a multiplicadores
        updateSelector4ToMultiplier();
        
        // Mostrar/ocultar selectores
        selector3.style.display = 'block';
        selector4.style.display = 'block';
        selector5.style.display = 'block';
        selector6.style.display = 'none';
        
        // Mostrar/ocultar bandas
        band3.style.display = 'block';
        band4.style.display = 'block';
        band5.style.display = 'block';
        band6.style.display = 'none';
        
        // Ocultar coeficiente térmico
        resultTempco.style.display = 'none';
        
    } else if (count === 6) {
        // 6 bandas: Dígito, Dígito, Dígito, Multiplicador, Tolerancia, Coef. Térmico
        selector3.querySelector('label').textContent = '3ª Banda (Dígito)';
        selector4.querySelector('label').textContent = '4ª Banda (Multiplicador)';
        
        // Actualizar opciones del selector 3 a dígitos
        updateSelector3ToDigit();
        
        // Actualizar opciones del selector 4 a multiplicadores
        updateSelector4ToMultiplier();
        
        // Mostrar todos los selectores
        selector3.style.display = 'block';
        selector4.style.display = 'block';
        selector5.style.display = 'block';
        selector6.style.display = 'block';
        
        // Mostrar todas las bandas
        band3.style.display = 'block';
        band4.style.display = 'block';
        band5.style.display = 'block';
        band6.style.display = 'block';
        
        // Mostrar coeficiente térmico
        resultTempco.style.display = 'block';
    }
}

/**
 * Actualiza el selector 3 para mostrar opciones de multiplicador
 */
function updateSelector3ToMultiplier() {
    color3.innerHTML = `
        <option value="black">Negro (×1)</option>
        <option value="brown">Marrón (×10)</option>
        <option value="red">Rojo (×100)</option>
        <option value="orange">Naranja (×1k)</option>
        <option value="yellow">Amarillo (×10k)</option>
        <option value="green">Verde (×100k)</option>
        <option value="blue">Azul (×1M)</option>
        <option value="violet">Violeta (×10M)</option>
        <option value="gray">Gris (×100M)</option>
        <option value="white">Blanco (×1G)</option>
        <option value="gold">Dorado (×0.1)</option>
        <option value="silver">Plateado (×0.01)</option>
    `;
    color3.value = 'black';
}

/**
 * Actualiza el selector 3 para mostrar opciones de dígito
 */
function updateSelector3ToDigit() {
    color3.innerHTML = `
        <option value="black">Negro (0)</option>
        <option value="brown">Marrón (1)</option>
        <option value="red">Rojo (2)</option>
        <option value="orange">Naranja (3)</option>
        <option value="yellow">Amarillo (4)</option>
        <option value="green">Verde (5)</option>
        <option value="blue">Azul (6)</option>
        <option value="violet">Violeta (7)</option>
        <option value="gray">Gris (8)</option>
        <option value="white">Blanco (9)</option>
    `;
    color3.value = 'black';
}

/**
 * Actualiza el selector 4 para mostrar opciones de multiplicador
 */
function updateSelector4ToMultiplier() {
    color4.innerHTML = `
        <option value="black">Negro (×1)</option>
        <option value="brown">Marrón (×10)</option>
        <option value="red">Rojo (×100)</option>
        <option value="orange">Naranja (×1k)</option>
        <option value="yellow">Amarillo (×10k)</option>
        <option value="green">Verde (×100k)</option>
        <option value="blue">Azul (×1M)</option>
        <option value="violet">Violeta (×10M)</option>
        <option value="gray">Gris (×100M)</option>
        <option value="white">Blanco (×1G)</option>
        <option value="gold">Dorado (×0.1)</option>
        <option value="silver">Plateado (×0.01)</option>
    `;
    color4.value = 'black';
}

/**
 * Actualiza el selector 4 para mostrar opciones de tolerancia
 */
function updateSelector4ToTolerance() {
    color4.innerHTML = `
        <option value="brown">Marrón (±1%)</option>
        <option value="red">Rojo (±2%)</option>
        <option value="green">Verde (±0.5%)</option>
        <option value="blue">Azul (±0.25%)</option>
        <option value="violet">Violeta (±0.1%)</option>
        <option value="gray">Gris (±0.05%)</option>
        <option value="gold" selected>Dorado (±5%)</option>
        <option value="silver">Plateado (±10%)</option>
    `;
    color4.value = 'gold';
}

/**
 * Actualiza el color visual de una banda
 */
function updateBandColor(bandElement, color) {
    bandElement.setAttribute('data-color', color);
    bandElement.classList.add('changing');
    setTimeout(() => bandElement.classList.remove('changing'), 300);
}

/**
 * Formatea el valor de resistencia a unidades apropiadas
 */
function formatResistanceValue(value) {
    if (value >= 1000000000) {
        return (value / 1000000000).toFixed(2) + ' GΩ';
    } else if (value >= 1000000) {
        return (value / 1000000).toFixed(2) + ' MΩ';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(2) + ' kΩ';
    } else {
        return value.toFixed(2) + ' Ω';
    }
}

/**
 * Calcula el valor de la resistencia
 */
function calculateResistance() {
    const bandCount = parseInt(bandCountSelect.value);
    let resistance = 0;
    let tolerance = '';
    let tempCoef = '';
    
    try {
        if (bandCount === 4) {
            // 4 bandas: Dígito, Dígito, Multiplicador, Tolerancia
            const digit1 = colorData.digits[color1.value];
            const digit2 = colorData.digits[color2.value];
            const multiplier = colorData.multipliers[color3.value];
            tolerance = colorData.tolerances[color4.value];
            
            resistance = (digit1 * 10 + digit2) * multiplier;
            
        } else if (bandCount === 5) {
            // 5 bandas: Dígito, Dígito, Dígito, Multiplicador, Tolerancia
            const digit1 = colorData.digits[color1.value];
            const digit2 = colorData.digits[color2.value];
            const digit3 = colorData.digits[color3.value];
            const multiplier = colorData.multipliers[color4.value];
            tolerance = colorData.tolerances[color5.value];
            
            resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
            
        } else if (bandCount === 6) {
            // 6 bandas: Dígito, Dígito, Dígito, Multiplicador, Tolerancia, Coef. Térmico
            const digit1 = colorData.digits[color1.value];
            const digit2 = colorData.digits[color2.value];
            const digit3 = colorData.digits[color3.value];
            const multiplier = colorData.multipliers[color4.value];
            tolerance = colorData.tolerances[color5.value];
            const tempCoefValue = colorData.tempCoefficients[color6.value];
            
            resistance = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
            tempCoef = tempCoefValue + ' ppm/K';
        }
        
        // Actualizar display
        resultValue.textContent = 'Resistencia = ' + formatResistanceValue(resistance);
        resultTolerance.textContent = 'Tolerancia: ' + tolerance;
        
        if (bandCount === 6) {
            resultTempco.textContent = 'Coef. Térmico: ' + tempCoef;
        }
        
    } catch (error) {
        console.error('Error al calcular resistencia:', error);
        resultValue.textContent = 'Error en cálculo';
    }
}

// ========== EVENT LISTENERS ==========

// Cambio en el número de bandas
bandCountSelect.addEventListener('change', () => {
    updateSelectors(bandCountSelect.value);
    calculateResistance();
});

// Cambios en los selectores de color
color1.addEventListener('change', () => {
    updateBandColor(band1, color1.value);
    calculateResistance();
});

color2.addEventListener('change', () => {
    updateBandColor(band2, color2.value);
    calculateResistance();
});

color3.addEventListener('change', () => {
    updateBandColor(band3, color3.value);
    calculateResistance();
});

color4.addEventListener('change', () => {
    updateBandColor(band4, color4.value);
    calculateResistance();
});

color5.addEventListener('change', () => {
    updateBandColor(band5, color5.value);
    calculateResistance();
});

color6.addEventListener('change', () => {
    updateBandColor(band6, color6.value);
    calculateResistance();
});

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    // Configurar estado inicial (4 bandas)
    updateSelectors(4);
    
    // Calcular valor inicial
    calculateResistance();
    
    console.log('%c⚡ Calculadora de Código de Colores', 'font-size: 18px; color: #f1c40f; font-weight: bold;');
    console.log('%cCalculadora cargada correctamente', 'font-size: 12px; color: #2ecc71;');
});
