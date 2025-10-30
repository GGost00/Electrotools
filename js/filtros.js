// === Calculadora de Filtros RC, RL, RLC ===

// Variables globales
let frequencyChart = null;
const PI = Math.PI;

// Elementos del DOM
const filterType = document.getElementById('filterType');
const circuitType = document.getElementById('circuitType');
const resistanceInput = document.getElementById('resistance');
const resistanceUnit = document.getElementById('resistanceUnit');
const capacitanceInput = document.getElementById('capacitance');
const capacitanceUnit = document.getElementById('capacitanceUnit');
const inductanceInput = document.getElementById('inductance');
const inductanceUnit = document.getElementById('inductanceUnit');
const capacitanceGroup = document.getElementById('capacitanceGroup');
const inductanceGroup = document.getElementById('inductanceGroup');
const calculateBtn = document.getElementById('calculateBtn');
const errorMessage = document.getElementById('errorMessage');
const resultSection = document.getElementById('resultSection');
const chartSection = document.getElementById('chartSection');
const resultLabel = document.getElementById('resultLabel');
const resultValue = document.getElementById('resultValue');
const periodValue = document.getElementById('periodValue');

// Event Listeners
circuitType.addEventListener('change', updateInputFields);
calculateBtn.addEventListener('click', calculate);

// Inicializar
updateInputFields();

/**
 * Actualiza los campos de entrada según el tipo de circuito seleccionado
 */
function updateInputFields() {
    const circuit = circuitType.value;
    
    // Resetear visibilidad
    capacitanceGroup.style.display = 'none';
    inductanceGroup.style.display = 'none';
    
    // Mostrar campos según tipo de circuito
    if (circuit === 'RC') {
        capacitanceGroup.style.display = 'block';
    } else if (circuit === 'RL') {
        inductanceGroup.style.display = 'block';
    } else if (circuit === 'RLC') {
        capacitanceGroup.style.display = 'block';
        inductanceGroup.style.display = 'block';
    }
    
    // Limpiar resultados previos
    hideError();
    hideResults();
}

/**
 * Realiza el cálculo de la frecuencia según el tipo de filtro
 */
function calculate() {
    hideError();
    hideResults();
    
    // Obtener valores
    const R = getResistanceValue();
    const C = getCapacitanceValue();
    const L = getInductanceValue();
    const circuit = circuitType.value;
    const filter = filterType.value;
    
    // Validar inputs según tipo de circuito
    if (!validateInputs(R, C, L, circuit)) {
        return;
    }
    
    // Calcular frecuencia
    let frequency;
    let isResonance = false;
    
    try {
        if (circuit === 'RC') {
            frequency = calculateRC(R, C);
        } else if (circuit === 'RL') {
            frequency = calculateRL(R, L);
        } else if (circuit === 'RLC') {
            frequency = calculateRLC(L, C);
            isResonance = true;
        }
        
        // Mostrar resultados
        displayResults(frequency, isResonance);
        
        // Generar gráfica
        generateChart(frequency, circuit, filter);
        
    } catch (error) {
        showError('Error en el cálculo: ' + error.message);
    }
}

/**
 * Calcula la frecuencia de corte para circuito RC
 * fc = 1 / (2 * π * R * C)
 */
function calculateRC(R, C) {
    if (R <= 0 || C <= 0) {
        throw new Error('Los valores deben ser mayores a cero');
    }
    return 1 / (2 * PI * R * C);
}

/**
 * Calcula la frecuencia de corte para circuito RL
 * fc = R / (2 * π * L)
 */
function calculateRL(R, L) {
    if (R <= 0 || L <= 0) {
        throw new Error('Los valores deben ser mayores a cero');
    }
    return R / (2 * PI * L);
}

/**
 * Calcula la frecuencia de resonancia para circuito RLC
 * fr = 1 / (2 * π * √(L * C))
 */
function calculateRLC(L, C) {
    if (L <= 0 || C <= 0) {
        throw new Error('Los valores deben ser mayores a cero');
    }
    return 1 / (2 * PI * Math.sqrt(L * C));
}

/**
 * Obtiene el valor de resistencia en Ohms
 */
function getResistanceValue() {
    const value = parseFloat(resistanceInput.value);
    const multiplier = parseFloat(resistanceUnit.value);
    return value * multiplier;
}

/**
 * Obtiene el valor de capacitancia en Faradios
 */
function getCapacitanceValue() {
    const value = parseFloat(capacitanceInput.value);
    const multiplier = parseFloat(capacitanceUnit.value);
    return value * multiplier;
}

/**
 * Obtiene el valor de inductancia en Henrios
 */
function getInductanceValue() {
    const value = parseFloat(inductanceInput.value);
    const multiplier = parseFloat(inductanceUnit.value);
    return value * multiplier;
}

/**
 * Valida los inputs según el tipo de circuito
 */
function validateInputs(R, C, L, circuit) {
    if (isNaN(R) || R <= 0) {
        showError('Por favor ingresa un valor válido de resistencia mayor a cero');
        return false;
    }
    
    if (circuit === 'RC') {
        if (isNaN(C) || C <= 0) {
            showError('Por favor ingresa un valor válido de capacitancia mayor a cero');
            return false;
        }
    }
    
    if (circuit === 'RL') {
        if (isNaN(L) || L <= 0) {
            showError('Por favor ingresa un valor válido de inductancia mayor a cero');
            return false;
        }
    }
    
    if (circuit === 'RLC') {
        if (isNaN(C) || C <= 0) {
            showError('Por favor ingresa un valor válido de capacitancia mayor a cero');
            return false;
        }
        if (isNaN(L) || L <= 0) {
            showError('Por favor ingresa un valor válido de inductancia mayor a cero');
            return false;
        }
    }
    
    return true;
}

/**
 * Muestra los resultados del cálculo
 */
function displayResults(frequency, isResonance) {
    // Actualizar etiqueta
    if (isResonance) {
        resultLabel.textContent = 'Frecuencia de Resonancia:';
    } else {
        resultLabel.textContent = 'Frecuencia de Corte:';
    }
    
    // Formatear y mostrar frecuencia
    resultValue.textContent = formatFrequency(frequency);
    
    // Calcular y mostrar período
    const period = 1 / frequency;
    periodValue.textContent = formatPeriod(period);
    
    // Mostrar sección de resultados
    resultSection.style.display = 'block';
}

/**
 * Formatea la frecuencia con la unidad apropiada
 */
function formatFrequency(freq) {
    if (freq >= 1e9) {
        return (freq / 1e9).toFixed(3) + ' GHz';
    } else if (freq >= 1e6) {
        return (freq / 1e6).toFixed(3) + ' MHz';
    } else if (freq >= 1e3) {
        return (freq / 1e3).toFixed(3) + ' kHz';
    } else {
        return freq.toFixed(3) + ' Hz';
    }
}

/**
 * Formatea el período con la unidad apropiada
 */
function formatPeriod(period) {
    if (period >= 1) {
        return period.toFixed(6) + ' s';
    } else if (period >= 1e-3) {
        return (period * 1e3).toFixed(6) + ' ms';
    } else if (period >= 1e-6) {
        return (period * 1e6).toFixed(6) + ' µs';
    } else if (period >= 1e-9) {
        return (period * 1e9).toFixed(6) + ' ns';
    } else {
        return (period * 1e12).toFixed(6) + ' ps';
    }
}

/**
 * Genera la gráfica de respuesta en frecuencia
 */
function generateChart(cutoffFreq, circuit, filter) {
    const ctx = document.getElementById('frequencyChart').getContext('2d');
    
    // Destruir gráfica anterior si existe
    if (frequencyChart) {
        frequencyChart.destroy();
    }
    
    // Generar datos para la gráfica
    const data = generateFrequencyResponseData(cutoffFreq, circuit, filter);
    
    // Crear nueva gráfica
    frequencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Ganancia (dB)',
                data: data.points,
                borderColor: '#f1c40f',
                backgroundColor: 'rgba(241, 196, 15, 0.1)',
                borderWidth: 3,
                pointRadius: 0,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(26, 35, 50, 0.9)',
                    titleColor: '#f1c40f',
                    bodyColor: '#fff',
                    borderColor: '#f1c40f',
                    borderWidth: 1,
                    callbacks: {
                        title: function(context) {
                            return 'Frecuencia: ' + context[0].label;
                        },
                        label: function(context) {
                            return 'Ganancia: ' + context.parsed.y.toFixed(2) + ' dB';
                        }
                    }
                }
            },
            scales: {
                x: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Frecuencia',
                        color: '#f1c40f',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff',
                        callback: function(value) {
                            const freq = parseFloat(value);
                            // Usar notación científica para mejor legibilidad
                            const exponent = Math.floor(Math.log10(freq));
                            const mantissa = freq / Math.pow(10, exponent);
                            
                            // Simplificar la mantisa si es cercana a 1
                            if (mantissa >= 0.99 && mantissa <= 1.01) {
                                return '10^' + exponent + ' Hz';
                            } else {
                                return mantissa.toFixed(1) + '×10^' + exponent + ' Hz';
                            }
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Ganancia (dB)',
                        color: '#f1c40f',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#fff'
                    },
                    min: -60,
                    max: 5
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
    
    // Mostrar sección de gráfica
    chartSection.style.display = 'block';
}

/**
 * Genera los datos de respuesta en frecuencia
 */
function generateFrequencyResponseData(fc, circuit, filter) {
    const points = [];
    
    // Rango de frecuencias (3 décadas antes y después de fc)
    const fMin = fc / 1000;
    const fMax = fc * 1000;
    const numPoints = 200;
    
    // Generar puntos logarítmicamente espaciados
    for (let i = 0; i < numPoints; i++) {
        const logMin = Math.log10(fMin);
        const logMax = Math.log10(fMax);
        const logF = logMin + (logMax - logMin) * i / (numPoints - 1);
        const f = Math.pow(10, logF);
        
        // Calcular ganancia según tipo de filtro
        let gain;
        if (circuit === 'RLC') {
            // Filtro RLC (pasa banda)
            gain = calculateRLCGain(f, fc);
        } else {
            // Filtros RC o RL
            if (filter === 'lowpass') {
                gain = calculateLowPassGain(f, fc);
            } else {
                gain = calculateHighPassGain(f, fc);
            }
        }
        
        // Guardar como objeto {x: frecuencia, y: ganancia}
        points.push({ x: f, y: gain });
    }
    
    return { points };
}

/**
 * Calcula la ganancia para filtro pasa bajos
 */
function calculateLowPassGain(f, fc) {
    const ratio = f / fc;
    const magnitude = 1 / Math.sqrt(1 + ratio * ratio);
    return 20 * Math.log10(magnitude);
}

/**
 * Calcula la ganancia para filtro pasa altos
 */
function calculateHighPassGain(f, fc) {
    const ratio = f / fc;
    const magnitude = ratio / Math.sqrt(1 + ratio * ratio);
    return 20 * Math.log10(magnitude);
}

/**
 * Calcula la ganancia para filtro RLC (pasa banda)
 */
function calculateRLCGain(f, fr) {
    // Factor de calidad Q simplificado (asumiendo Q = 5)
    const Q = 5;
    const ratio = f / fr;
    const denominator = Math.sqrt(1 + Q * Q * (ratio - 1/ratio) * (ratio - 1/ratio));
    const magnitude = 1 / denominator;
    return 20 * Math.log10(magnitude);
}

/**
 * Muestra un mensaje de error
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

/**
 * Oculta el mensaje de error
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Oculta los resultados
 */
function hideResults() {
    resultSection.style.display = 'none';
    chartSection.style.display = 'none';
}
