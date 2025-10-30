// ========== DATOS DE COLORES ==========
const colorData = {
    // Valores de dígitos (0-9)
    digits: {
        '0': 'black',
        '1': 'brown',
        '2': 'red',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'blue',
        '7': 'violet',
        '8': 'gray',
        '9': 'white'
    },
    
    // Multiplicadores (valor numérico -> color)
    multipliers: {
        1: 'black',
        10: 'brown',
        100: 'red',
        1000: 'orange',
        10000: 'yellow',
        100000: 'green',
        1000000: 'blue',
        10000000: 'violet',
        100000000: 'gray',
        1000000000: 'white',
        0.1: 'gold',
        0.01: 'silver'
    },
    
    // Nombres de colores en español
    colorNames: {
        'black': 'Negro',
        'brown': 'Marrón',
        'red': 'Rojo',
        'orange': 'Naranja',
        'yellow': 'Amarillo',
        'green': 'Verde',
        'blue': 'Azul',
        'violet': 'Violeta',
        'gray': 'Gris',
        'white': 'Blanco',
        'gold': 'Dorado',
        'silver': 'Plateado'
    },
    
    // Tolerancias (color -> valor)
    tolerances: {
        'brown': '±1%',
        'red': '±2%',
        'green': '±0.5%',
        'blue': '±0.25%',
        'violet': '±0.1%',
        'gray': '±0.05%',
        'gold': '±5%',
        'silver': '±10%'
    },
    
    // Coeficientes térmicos (color -> valor)
    tempCoefficients: {
        'black': '250 ppm/K',
        'brown': '100 ppm/K',
        'red': '50 ppm/K',
        'orange': '15 ppm/K',
        'yellow': '25 ppm/K',
        'blue': '10 ppm/K',
        'violet': '5 ppm/K'
    }
};

// ========== ELEMENTOS DEL DOM ==========
const resistanceInput = document.getElementById('resistanceValue');
const unitSelector = document.getElementById('unitSelector');
const bandCountSelect = document.getElementById('bandCount');
const toleranceSelect = document.getElementById('toleranceSelect');
const tempCoefSelect = document.getElementById('tempCoefSelect');
const tempCoefControl = document.getElementById('tempCoefControl');
const calculateBtn = document.getElementById('calculateBtn');

const errorMessage = document.getElementById('errorMessage');
const resultDisplay = document.getElementById('resultDisplay');
const resultValue = document.getElementById('resultValue');
const resultTolerance = document.getElementById('resultTolerance');
const resultTempco = document.getElementById('resultTempco');

const resistorDisplay = document.getElementById('resistorDisplay');
const resistorMain = document.querySelector('.resistor-main');
const bandExplanation = document.getElementById('bandExplanation');
const explanationList = document.getElementById('explanationList');

// Bandas visuales
const band1 = document.getElementById('band1');
const band2 = document.getElementById('band2');
const band3 = document.getElementById('band3');
const band4 = document.getElementById('band4');
const band5 = document.getElementById('band5');
const band6 = document.getElementById('band6');

// ========== FUNCIONES AUXILIARES ==========

/**
 * Convierte el valor ingresado a ohmios
 */
function parseResistanceValue(input, unit) {
    // Eliminar espacios
    input = input.trim().toLowerCase();
    
    // Detectar unidad en el texto (k, m, kohm, mohm, etc.)
    let multiplier = 1;
    
    // Buscar unidades en el texto
    if (input.includes('m') && input.includes('ohm')) {
        multiplier = 1000000;
        input = input.replace(/mohm|mω|mΩ/gi, '');
    } else if (input.includes('k') && input.includes('ohm')) {
        multiplier = 1000;
        input = input.replace(/kohm|kω|kΩ/gi, '');
    } else if (input.includes('m')) {
        multiplier = 1000000;
        input = input.replace(/m/gi, '');
    } else if (input.includes('k')) {
        multiplier = 1000;
        input = input.replace(/k/gi, '');
    }
    
    // Remover cualquier símbolo de ohm restante
    input = input.replace(/ohm|ω|Ω/gi, '');
    
    // Parsear el número
    const value = parseFloat(input);
    
    if (isNaN(value) || value <= 0) {
        return null;
    }
    
    // Aplicar multiplicador del selector si no se detectó en el texto
    if (multiplier === 1) {
        if (unit === 'kohm') multiplier = 1000;
        else if (unit === 'mohm') multiplier = 1000000;
    }
    
    return value * multiplier;
}

/**
 * Formatea el valor de resistencia a unidades apropiadas
 */
function formatResistanceValue(ohms) {
    if (ohms >= 1000000) {
        return (ohms / 1000000).toFixed(2).replace(/\.?0+$/, '') + ' MΩ';
    } else if (ohms >= 1000) {
        return (ohms / 1000).toFixed(2).replace(/\.?0+$/, '') + ' kΩ';
    } else {
        return ohms.toFixed(2).replace(/\.?0+$/, '') + ' Ω';
    }
}

/**
 * Encuentra el multiplicador más cercano disponible
 */
function findBestMultiplier(value) {
    const availableMultipliers = [0.01, 0.1, 1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000];
    
    let bestMultiplier = 1;
    let minRemainder = Infinity;
    
    for (const mult of availableMultipliers) {
        const divided = value / mult;
        const remainder = divided % 1;
        
        if (divided >= 10 && divided < 1000 && remainder < minRemainder) {
            minRemainder = remainder;
            bestMultiplier = mult;
        }
    }
    
    return bestMultiplier;
}

/**
 * Calcula los colores de las bandas
 */
function calculateBandColors(ohms, bandCount) {
    const bands = [];
    
    // Encontrar el mejor multiplicador
    let multiplier = findBestMultiplier(ohms);
    let baseValue = ohms / multiplier;
    
    // Redondear a los dígitos disponibles
    if (bandCount === 4) {
        // 2 dígitos significativos
        baseValue = Math.round(baseValue);
        if (baseValue >= 100) {
            multiplier *= 10;
            baseValue = Math.round(baseValue / 10);
        }
    } else {
        // 3 dígitos significativos (5 o 6 bandas)
        baseValue = Math.round(baseValue * 10) / 10;
        if (baseValue >= 1000) {
            multiplier *= 10;
            baseValue = Math.round(baseValue / 10);
        }
    }
    
    // Convertir a string y extraer dígitos
    const valueStr = baseValue.toString().replace('.', '');
    const digits = valueStr.split('');
    
    if (bandCount === 4) {
        // 4 bandas: Dígito, Dígito, Multiplicador, Tolerancia
        if (digits.length >= 2) {
            bands.push({
                color: colorData.digits[digits[0]],
                meaning: `Primer dígito: ${digits[0]}`
            });
            bands.push({
                color: colorData.digits[digits[1]],
                meaning: `Segundo dígito: ${digits[1]}`
            });
            bands.push({
                color: colorData.multipliers[multiplier],
                meaning: `Multiplicador: ×${formatMultiplier(multiplier)}`
            });
        }
    } else {
        // 5-6 bandas: Dígito, Dígito, Dígito, Multiplicador, Tolerancia, [Coef. Térmico]
        if (digits.length >= 2) {
            bands.push({
                color: colorData.digits[digits[0]],
                meaning: `Primer dígito: ${digits[0]}`
            });
            bands.push({
                color: colorData.digits[digits[1]],
                meaning: `Segundo dígito: ${digits[1]}`
            });
            
            // Tercer dígito (si existe, sino 0)
            const thirdDigit = digits[2] || '0';
            bands.push({
                color: colorData.digits[thirdDigit],
                meaning: `Tercer dígito: ${thirdDigit}`
            });
            
            // Ajustar multiplicador si es necesario
            if (digits.length === 2) {
                multiplier /= 10;
            }
            
            bands.push({
                color: colorData.multipliers[multiplier],
                meaning: `Multiplicador: ×${formatMultiplier(multiplier)}`
            });
        }
    }
    
    return bands;
}

/**
 * Formatea el multiplicador para mostrar
 */
function formatMultiplier(mult) {
    if (mult >= 1000000000) return (mult / 1000000000) + 'G';
    if (mult >= 1000000) return (mult / 1000000) + 'M';
    if (mult >= 1000) return (mult / 1000) + 'k';
    if (mult < 1) return mult.toString();
    return mult.toString();
}

/**
 * Actualiza el color visual de una banda
 */
function updateBandColor(bandElement, color) {
    bandElement.setAttribute('data-color', color);
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    resultDisplay.style.display = 'none';
    resistorDisplay.style.display = 'none';
    bandExplanation.style.display = 'none';
}

/**
 * Oculta el mensaje de error
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Actualiza la visualización de las bandas
 */
function updateBandDisplay(bandCount) {
    resistorMain.className = 'resistor-main bands-' + bandCount;
    
    // Resetear todas las bandas
    band1.style.display = 'block';
    band2.style.display = 'block';
    band3.style.display = 'block';
    band4.style.display = 'block';
    band5.style.display = bandCount >= 5 ? 'block' : 'none';
    band6.style.display = bandCount === 6 ? 'block' : 'none';
}

/**
 * Genera la explicación de las bandas
 */
function generateExplanation(bands, tolerance, tempCoef, bandCount) {
    explanationList.innerHTML = '';
    
    bands.forEach((band, index) => {
        const item = document.createElement('div');
        item.className = 'explanation-item';
        
        const colorDiv = document.createElement('div');
        colorDiv.className = 'explanation-color';
        colorDiv.setAttribute('data-color', band.color);
        // Aplicar el mismo estilo que las bandas
        const colorStyle = getColorStyle(band.color);
        colorDiv.style.background = colorStyle;
        if (band.color === 'white') {
            colorDiv.style.border = '2px solid #ccc';
        }
        
        const text = document.createElement('div');
        text.className = 'explanation-text';
        text.innerHTML = `<strong>Banda ${index + 1}:</strong> ${colorData.colorNames[band.color]} - ${band.meaning}`;
        
        item.appendChild(colorDiv);
        item.appendChild(text);
        explanationList.appendChild(item);
    });
    
    // Agregar tolerancia
    const toleranceItem = document.createElement('div');
    toleranceItem.className = 'explanation-item';
    
    const toleranceColor = document.createElement('div');
    toleranceColor.className = 'explanation-color';
    toleranceColor.style.background = getColorStyle(tolerance);
    if (tolerance === 'white') {
        toleranceColor.style.border = '2px solid #ccc';
    }
    
    const toleranceText = document.createElement('div');
    toleranceText.className = 'explanation-text';
    toleranceText.innerHTML = `<strong>Banda ${bands.length + 1}:</strong> ${colorData.colorNames[tolerance]} - Tolerancia: ${colorData.tolerances[tolerance]}`;
    
    toleranceItem.appendChild(toleranceColor);
    toleranceItem.appendChild(toleranceText);
    explanationList.appendChild(toleranceItem);
    
    // Agregar coeficiente térmico si es 6 bandas
    if (bandCount === 6 && tempCoef) {
        const tempCoefItem = document.createElement('div');
        tempCoefItem.className = 'explanation-item';
        
        const tempCoefColor = document.createElement('div');
        tempCoefColor.className = 'explanation-color';
        tempCoefColor.style.background = getColorStyle(tempCoef);
        
        const tempCoefText = document.createElement('div');
        tempCoefText.className = 'explanation-text';
        tempCoefText.innerHTML = `<strong>Banda 6:</strong> ${colorData.colorNames[tempCoef]} - Coef. Térmico: ${colorData.tempCoefficients[tempCoef]}`;
        
        tempCoefItem.appendChild(tempCoefColor);
        tempCoefItem.appendChild(tempCoefText);
        explanationList.appendChild(tempCoefItem);
    }
}

/**
 * Obtiene el estilo CSS de un color
 */
function getColorStyle(color) {
    const styles = {
        'black': '#000000',
        'brown': '#8B4513',
        'red': '#FF0000',
        'orange': '#FFA500',
        'yellow': '#FFFF00',
        'green': '#008000',
        'blue': '#0000FF',
        'violet': '#8B00FF',
        'gray': '#808080',
        'white': '#FFFFFF',
        'gold': 'linear-gradient(135deg, #FFD700, #FFA500)',
        'silver': 'linear-gradient(135deg, #E8E8E8, #A8A8A8)'
    };
    return styles[color] || '#000';
}

/**
 * Función principal de cálculo
 */
function calculateColors() {
    hideError();
    
    // Obtener valores
    const inputValue = resistanceInput.value.trim();
    const unit = unitSelector.value;
    const bandCount = parseInt(bandCountSelect.value);
    const tolerance = toleranceSelect.value;
    const tempCoef = tempCoefSelect.value;
    
    // Validar entrada
    if (!inputValue) {
        showError('⚠️ Por favor, ingresa un valor de resistencia');
        return;
    }
    
    // Convertir a ohmios
    const ohms = parseResistanceValue(inputValue, unit);
    
    if (ohms === null) {
        showError('⚠️ Valor inválido. Usa formatos como: 4.7k, 470, 1M, 22');
        return;
    }
    
    // Validar rango (0.01Ω a 999GΩ)
    if (ohms < 0.01 || ohms > 999000000000) {
        showError('⚠️ Valor fuera de rango. Usa valores entre 0.01Ω y 999GΩ');
        return;
    }
    
    // Calcular colores de bandas
    const bands = calculateBandColors(ohms, bandCount);
    
    if (bands.length === 0) {
        showError('⚠️ No se pudieron calcular los colores para este valor');
        return;
    }
    
    // Actualizar display de resultado
    resultValue.textContent = 'Resistencia = ' + formatResistanceValue(ohms);
    resultTolerance.textContent = 'Tolerancia: ' + colorData.tolerances[tolerance];
    
    if (bandCount === 6) {
        resultTempco.textContent = 'Coef. Térmico: ' + colorData.tempCoefficients[tempCoef];
        resultTempco.style.display = 'block';
    } else {
        resultTempco.style.display = 'none';
    }
    
    // Mostrar resultado
    resultDisplay.style.display = 'block';
    
    // Actualizar bandas visuales
    updateBandDisplay(bandCount);
    
    // Asignar colores
    if (bands[0]) updateBandColor(band1, bands[0].color);
    if (bands[1]) updateBandColor(band2, bands[1].color);
    if (bands[2]) updateBandColor(band3, bands[2].color);
    if (bands[3]) updateBandColor(band4, bands[3].color);
    
    if (bandCount >= 5) {
        updateBandColor(band4, bands[3].color); // Multiplicador
        updateBandColor(band5, tolerance); // Tolerancia
    } else {
        updateBandColor(band3, bands[2].color); // Multiplicador
        updateBandColor(band4, tolerance); // Tolerancia
    }
    
    if (bandCount === 6) {
        updateBandColor(band6, tempCoef); // Coeficiente térmico
    }
    
    // Mostrar resistencia
    resistorDisplay.style.display = 'flex';
    
    // Generar explicación
    generateExplanation(bands, tolerance, tempCoef, bandCount);
    bandExplanation.style.display = 'block';
    
    // Scroll suave al resultado
    setTimeout(() => {
        resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

// ========== EVENT LISTENERS ==========

// Botón calcular
calculateBtn.addEventListener('click', calculateColors);

// Enter en el input
resistanceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateColors();
    }
});

// Cambio en número de bandas
bandCountSelect.addEventListener('change', () => {
    const bandCount = parseInt(bandCountSelect.value);
    if (bandCount === 6) {
        tempCoefControl.style.display = 'block';
    } else {
        tempCoefControl.style.display = 'none';
    }
});

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🔍 Buscar Colores de Resistencia', 'font-size: 18px; color: #2ecc71; font-weight: bold;');
    console.log('%cCalculadora cargada correctamente', 'font-size: 12px; color: #3498db;');
    
    // Enfocar el input
    resistanceInput.focus();
});
