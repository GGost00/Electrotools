// ========== LEY DE OHM - LÓGICA ==========

// Elementos del DOM
const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const resistanceInput = document.getElementById('resistance');
const powerResult = document.getElementById('powerResult');
const clearBtn = document.getElementById('clearBtn');

// Variable para rastrear el último campo modificado
let lastModified = null;

// ========== FUNCIONES DE CÁLCULO ==========

/**
 * Calcula el valor faltante usando la Ley de Ohm
 */
function calculateOhmsLaw() {
    // Obtener valores actuales
    const V = parseFloat(voltageInput.value) || null;
    const I = parseFloat(currentInput.value) || null;
    const R = parseFloat(resistanceInput.value) || null;

    // Contar cuántos valores están llenos
    const filledCount = [V, I, R].filter(val => val !== null).length;

    // Si hay menos de 2 valores, limpiar campos calculados
    if (filledCount < 2) {
        clearCalculatedFields();
        calculatePower();
        return;
    }

    // Si hay 2 valores, calcular el tercero
    if (filledCount === 2) {
        if (V !== null && I !== null && R === null) {
            // Calcular R = V / I
            if (I !== 0) {
                const calculatedR = V / I;
                resistanceInput.value = calculatedR.toFixed(2);
                resistanceInput.disabled = true;
                resistanceInput.classList.add('calculated');
            } else {
                showError('La corriente no puede ser 0 para calcular la resistencia');
            }
        } else if (V !== null && R !== null && I === null) {
            // Calcular I = V / R
            if (R !== 0) {
                const calculatedI = V / R;
                currentInput.value = calculatedI.toFixed(2);
                currentInput.disabled = true;
                currentInput.classList.add('calculated');
            } else {
                showError('La resistencia no puede ser 0 para calcular la corriente');
            }
        } else if (I !== null && R !== null && V === null) {
            // Calcular V = I * R
            const calculatedV = I * R;
            voltageInput.value = calculatedV.toFixed(2);
            voltageInput.disabled = true;
            voltageInput.classList.add('calculated');
        }
    }

    // Si hay 3 valores (el usuario modificó uno calculado), recalcular
    if (filledCount === 3) {
        // Determinar cuál campo recalcular basándose en el último modificado
        if (lastModified === 'voltage') {
            // Recalcular R
            if (I !== 0) {
                const newR = V / I;
                resistanceInput.value = newR.toFixed(2);
            }
        } else if (lastModified === 'current') {
            // Recalcular R
            if (I !== 0) {
                const newR = V / I;
                resistanceInput.value = newR.toFixed(2);
            }
        } else if (lastModified === 'resistance') {
            // Recalcular I
            if (R !== 0) {
                const newI = V / R;
                currentInput.value = newI.toFixed(2);
            }
        }
    }

    // Calcular potencia
    calculatePower();

    // Validar valores
    validateInputs();
}

/**
 * Calcula la potencia P = V * I
 */
function calculatePower() {
    const V = parseFloat(voltageInput.value) || 0;
    const I = parseFloat(currentInput.value) || 0;

    if (V > 0 && I > 0) {
        const P = V * I;
        const powerNumber = powerResult.querySelector('.power-number');
        powerNumber.textContent = P.toFixed(2);
        powerNumber.style.color = '#2ecc71';
    } else {
        const powerNumber = powerResult.querySelector('.power-number');
        powerNumber.textContent = '0.00';
        powerNumber.style.color = '#95a5a6';
    }
}

/**
 * Limpia los campos calculados automáticamente
 */
function clearCalculatedFields() {
    // Habilitar todos los campos
    voltageInput.disabled = false;
    currentInput.disabled = false;
    resistanceInput.disabled = false;

    // Remover clase de calculado
    voltageInput.classList.remove('calculated');
    currentInput.classList.remove('calculated');
    resistanceInput.classList.remove('calculated');
}

/**
 * Valida que los valores sean positivos
 */
function validateInputs() {
    [voltageInput, currentInput, resistanceInput].forEach(input => {
        const value = parseFloat(input.value);
        if (value && value < 0) {
            input.value = Math.abs(value).toFixed(2);
        }
    });
}

/**
 * Muestra un mensaje de error (temporal)
 */
function showError(message) {
    console.warn(message);
    // Opcional: mostrar una notificación visual
}

/**
 * Limpia todos los campos
 */
function clearAllFields() {
    voltageInput.value = '';
    currentInput.value = '';
    resistanceInput.value = '';
    
    voltageInput.disabled = false;
    currentInput.disabled = false;
    resistanceInput.disabled = false;
    
    voltageInput.classList.remove('calculated');
    currentInput.classList.remove('calculated');
    resistanceInput.classList.remove('calculated');
    
    lastModified = null;
    
    calculatePower();

    // Efecto visual
    [voltageInput, currentInput, resistanceInput].forEach(input => {
        input.style.transform = 'scale(1.05)';
        setTimeout(() => {
            input.style.transform = 'scale(1)';
        }, 200);
    });
}

/**
 * Maneja el evento de entrada en los campos
 */
function handleInput(event) {
    const inputId = event.target.id;
    
    // Guardar el último campo modificado
    if (inputId === 'voltage') {
        lastModified = 'voltage';
    } else if (inputId === 'current') {
        lastModified = 'current';
    } else if (inputId === 'resistance') {
        lastModified = 'resistance';
    }

    // Si el campo se está limpiando, habilitar todos
    if (event.target.value === '') {
        const V = voltageInput.value;
        const I = currentInput.value;
        const R = resistanceInput.value;
        
        // Si solo queda un campo lleno o ninguno, habilitar todos
        const filledCount = [V, I, R].filter(val => val !== '').length;
        if (filledCount <= 1) {
            clearCalculatedFields();
        }
    }

    // Recalcular
    calculateOhmsLaw();
}

// ========== EVENT LISTENERS ==========

// Listeners para los inputs
voltageInput.addEventListener('input', handleInput);
currentInput.addEventListener('input', handleInput);
resistanceInput.addEventListener('input', handleInput);

// Listener para el botón limpiar
clearBtn.addEventListener('click', clearAllFields);

// Prevenir valores negativos en tiempo real
[voltageInput, currentInput, resistanceInput].forEach(input => {
    input.addEventListener('keydown', (e) => {
        // Permitir teclas especiales (backspace, delete, flechas, etc.)
        if (e.key === '-' || e.key === 'e' || e.key === 'E') {
            e.preventDefault();
        }
    });

    // Efecto visual al enfocar
    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.05)';
        input.style.transition = 'transform 0.2s ease';
    });

    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
});

// ========== FUNCIONES AUXILIARES ==========

/**
 * Formatea un número con separadores de miles
 */
function formatNumber(num) {
    return num.toLocaleString('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Detecta si un valor es válido
 */
function isValidNumber(value) {
    return !isNaN(value) && isFinite(value) && value > 0;
}

// ========== EJEMPLOS PREDEFINIDOS (OPCIONAL) ==========

/**
 * Carga un ejemplo predefinido
 */
function loadExample(V, I, R) {
    clearAllFields();
    
    setTimeout(() => {
        if (V !== null) voltageInput.value = V;
        if (I !== null) currentInput.value = I;
        if (R !== null) resistanceInput.value = R;
        
        calculateOhmsLaw();
    }, 100);
}

// Función global para cargar ejemplos (opcional, se puede llamar desde la consola)
window.loadOhmExample = loadExample;

// ========== ATAJOS DE TECLADO ==========

document.addEventListener('keydown', (e) => {
    // Ctrl + L o Cmd + L para limpiar
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        clearAllFields();
    }
    
    // Escape para limpiar
    if (e.key === 'Escape') {
        clearAllFields();
    }
});

// ========== TOOLTIPS INFORMATIVOS ==========

/**
 * Agrega tooltips a los inputs con información adicional
 */
function addTooltips() {
    voltageInput.title = 'Voltaje en voltios (V)\nEjemplo: 12, 5, 220';
    currentInput.title = 'Corriente en amperios (A)\nEjemplo: 0.5, 2, 10';
    resistanceInput.title = 'Resistencia en ohmios (Ω)\nEjemplo: 100, 470, 1000';
}

// ========== PERSISTENCIA LOCAL (OPCIONAL) ==========

/**
 * Guarda los valores en localStorage
 */
function saveToLocalStorage() {
    const data = {
        voltage: voltageInput.value,
        current: currentInput.value,
        resistance: resistanceInput.value
    };
    localStorage.setItem('ohmCalculatorData', JSON.stringify(data));
}

/**
 * Carga los valores desde localStorage
 */
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('ohmCalculatorData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            if (data.voltage) voltageInput.value = data.voltage;
            if (data.current) currentInput.value = data.current;
            if (data.resistance) resistanceInput.value = data.resistance;
            calculateOhmsLaw();
        } catch (e) {
            console.error('Error al cargar datos guardados:', e);
        }
    }
}

// Guardar automáticamente cada vez que cambie un valor
[voltageInput, currentInput, resistanceInput].forEach(input => {
    input.addEventListener('change', saveToLocalStorage);
});

// ========== INICIALIZACIÓN ==========

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c⚡ Calculadora Ley de Ohm', 'font-size: 18px; color: #f1c40f; font-weight: bold;');
    console.log('%cV = I × R | I = V / R | R = V / I', 'font-size: 12px; color: #3498db;');
    
    // Agregar tooltips
    addTooltips();
    
    // Cargar datos guardados (comentar si no se desea)
    // loadFromLocalStorage();
    
    // Calcular potencia inicial
    calculatePower();
    
    // Enfocar el primer input
    voltageInput.focus();
    
    // Ejemplos disponibles en consola
    console.log('%cPrueba estos ejemplos:', 'font-size: 12px; color: #2ecc71; font-weight: bold;');
    console.log('loadOhmExample(12, null, 6)    - Calcula corriente');
    console.log('loadOhmExample(5, 0.5, null)   - Calcula resistencia');
    console.log('loadOhmExample(null, 2, 100)   - Calcula voltaje');
});

// ========== MANEJO DE ERRORES GLOBALES ==========

window.addEventListener('error', (e) => {
    console.error('Error en la calculadora:', e.error);
});

// ========== EXPORTAR RESULTADO (OPCIONAL) ==========

/**
 * Genera un texto con el resultado actual
 */
function exportResult() {
    const V = voltageInput.value || '?';
    const I = currentInput.value || '?';
    const R = resistanceInput.value || '?';
    const P = powerResult.querySelector('.power-number').textContent;
    
    const text = `
Cálculo de Ley de Ohm - ElectroTools
=====================================
Voltaje (V):     ${V} V
Corriente (I):   ${I} A
Resistencia (R): ${R} Ω
Potencia (P):    ${P} W

Fórmulas aplicadas:
V = I × R
P = V × I
    `.trim();
    
    console.log(text);
    
    // Copiar al portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('✓ Resultado copiado al portapapeles');
        });
    }
    
    return text;
}

// Hacer disponible globalmente
window.exportOhmResult = exportResult;

console.log('%cUsa exportOhmResult() para copiar el resultado', 'font-size: 11px; color: #95a5a6; font-style: italic;');
