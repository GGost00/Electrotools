// === Calculadora Serie-Paralelo ===

// Variables globales
let componentCount = 0;
const components = [];

// Valores comunes para combinaciones
const COMMON_RESISTORS = [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000];

const COMMON_CAPACITORS = [1, 2.2, 3.3, 4.7, 10, 22, 33, 47, 100, 220, 330, 470, 1000, 2200, 3300, 4700, 10000];

// Elementos del DOM
const componentType = document.getElementById('componentType');
const connectionType = document.getElementById('connectionType');
const componentsContainer = document.getElementById('componentsContainer');
const addComponentBtn = document.getElementById('addComponentBtn');
const clearBtn = document.getElementById('clearBtn');
const targetValue = document.getElementById('targetValue');
const targetUnit = document.getElementById('targetUnit');
const findCombinationsBtn = document.getElementById('findCombinationsBtn');
const messageBox = document.getElementById('messageBox');
const resultsSection = document.getElementById('resultsSection');
const combinationsSection = document.getElementById('combinationsSection');
const mainResultTitle = document.getElementById('mainResultTitle');
const altResultTitle = document.getElementById('altResultTitle');
const mainResult = document.getElementById('mainResult');
const altResult = document.getElementById('altResult');
const componentsList = document.getElementById('componentsList');
const targetDisplay = document.getElementById('targetDisplay');
const combinationsList = document.getElementById('combinationsList');
const formulasContent = document.getElementById('formulasContent');

// Event Listeners
componentType.addEventListener('change', updateUI);
connectionType.addEventListener('change', updateUI);
addComponentBtn.addEventListener('click', addComponent);
clearBtn.addEventListener('click', clearAll);
findCombinationsBtn.addEventListener('click', findCombinations);

// Inicializar
init();

function init() {
    // Agregar 2 componentes iniciales
    addComponent();
    addComponent();
    updateUI();
    updateFormulas();
}

/**
 * Actualiza la interfaz según el tipo de componente
 */
function updateUI() {
    const isResistor = componentType.value === 'resistor';
    const unit = isResistor ? 'Ω' : 'F';
    
    // Actualizar unidades
    targetUnit.textContent = unit;
    
    // Actualizar unidades de componentes existentes
    document.querySelectorAll('.component-unit').forEach(el => {
        el.textContent = unit;
    });
    
    // Actualizar títulos de resultados
    const connType = connectionType.value === 'series' ? 'Serie' : 'Paralelo';
    const altType = connectionType.value === 'series' ? 'Paralelo' : 'Serie';
    
    mainResultTitle.textContent = `Valor Equivalente en ${connType}`;
    altResultTitle.textContent = `Si se conectaran en ${altType}`;
    
    // Actualizar fórmulas
    updateFormulas();
    
    // Recalcular si hay valores
    calculateEquivalent();
}

/**
 * Agrega un nuevo componente
 */
function addComponent() {
    componentCount++;
    
    const isResistor = componentType.value === 'resistor';
    const unit = isResistor ? 'Ω' : 'F';
    const prefix = isResistor ? 'R' : 'C';
    
    const componentDiv = document.createElement('div');
    componentDiv.className = 'component-item';
    componentDiv.dataset.id = componentCount;
    
    componentDiv.innerHTML = `
        <span class="component-label">${prefix}${componentCount}</span>
        <input type="number" class="component-input" data-id="${componentCount}" 
               placeholder="100" step="any" min="0">
        <span class="component-unit">${unit}</span>
        <button class="remove-component-btn" onclick="removeComponent(${componentCount})">✖</button>
    `;
    
    componentsContainer.appendChild(componentDiv);
    
    // Agregar event listener al input
    const input = componentDiv.querySelector('.component-input');
    input.addEventListener('input', calculateEquivalent);
    
    hideMessage();
}

/**
 * Elimina un componente
 */
function removeComponent(id) {
    const component = document.querySelector(`[data-id="${id}"]`).closest('.component-item');
    component.remove();
    
    // Recalcular
    calculateEquivalent();
    
    // Si no quedan componentes, ocultar resultados
    const remaining = document.querySelectorAll('.component-item').length;
    if (remaining === 0) {
        resultsSection.style.display = 'none';
    }
}

/**
 * Calcula el valor equivalente
 */
function calculateEquivalent() {
    const inputs = document.querySelectorAll('.component-input');
    const values = [];
    
    // Recopilar valores
    inputs.forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val) && val > 0) {
            values.push(val);
        }
    });
    
    // Validar cantidad mínima
    if (values.length < 2) {
        resultsSection.style.display = 'none';
        return;
    }
    
    const isResistor = componentType.value === 'resistor';
    const isSeries = connectionType.value === 'series';
    
    let mainValue, altValue;
    
    if (isResistor) {
        // Resistencias
        mainValue = isSeries ? calculateSeriesR(values) : calculateParallelR(values);
        altValue = isSeries ? calculateParallelR(values) : calculateSeriesR(values);
    } else {
        // Condensadores
        mainValue = isSeries ? calculateSeriesC(values) : calculateParallelC(values);
        altValue = isSeries ? calculateParallelC(values) : calculateSeriesC(values);
    }
    
    // Mostrar resultados
    displayResults(values, mainValue, altValue);
}

/**
 * Calcula resistencia en serie: R_total = R1 + R2 + R3 + ...
 */
function calculateSeriesR(values) {
    return values.reduce((sum, val) => sum + val, 0);
}

/**
 * Calcula resistencia en paralelo: 1/R_total = 1/R1 + 1/R2 + ...
 */
function calculateParallelR(values) {
    const sum = values.reduce((sum, val) => sum + (1 / val), 0);
    return 1 / sum;
}

/**
 * Calcula capacitancia en serie: 1/C_total = 1/C1 + 1/C2 + ...
 */
function calculateSeriesC(values) {
    const sum = values.reduce((sum, val) => sum + (1 / val), 0);
    return 1 / sum;
}

/**
 * Calcula capacitancia en paralelo: C_total = C1 + C2 + C3 + ...
 */
function calculateParallelC(values) {
    return values.reduce((sum, val) => sum + val, 0);
}

/**
 * Muestra los resultados
 */
function displayResults(values, mainValue, altValue) {
    const isResistor = componentType.value === 'resistor';
    const prefix = isResistor ? 'R' : 'C';
    
    // Formatear valores
    mainResult.textContent = formatValue(mainValue, isResistor);
    altResult.textContent = formatValue(altValue, isResistor);
    
    // Listar componentes
    componentsList.innerHTML = '';
    values.forEach((val, index) => {
        const li = document.createElement('li');
        li.textContent = `${prefix}${index + 1} = ${formatValue(val, isResistor)}`;
        componentsList.appendChild(li);
    });
    
    // Mostrar sección
    resultsSection.style.display = 'block';
}

/**
 * Formatea el valor con la unidad apropiada
 */
function formatValue(value, isResistor) {
    if (isResistor) {
        // Resistencia
        if (value >= 1000000) {
            return (value / 1000000).toFixed(3) + ' MΩ';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(3) + ' kΩ';
        } else {
            return value.toFixed(3) + ' Ω';
        }
    } else {
        // Capacitancia
        if (value >= 1) {
            return value.toFixed(6) + ' F';
        } else if (value >= 0.001) {
            return (value * 1000).toFixed(6) + ' mF';
        } else if (value >= 0.000001) {
            return (value * 1000000).toFixed(3) + ' µF';
        } else if (value >= 0.000000001) {
            return (value * 1000000000).toFixed(3) + ' nF';
        } else {
            return (value * 1000000000000).toFixed(3) + ' pF';
        }
    }
}

/**
 * Busca combinaciones que aproximen al valor deseado
 */
function findCombinations() {
    const target = parseFloat(targetValue.value);
    
    if (isNaN(target) || target <= 0) {
        showMessage('Por favor ingresa un valor objetivo válido mayor a cero.', 'warning');
        return;
    }
    
    const isResistor = componentType.value === 'resistor';
    const commonValues = isResistor ? COMMON_RESISTORS : COMMON_CAPACITORS;
    
    // Aplicar multiplicadores para diferentes rangos
    const multipliers = isResistor ? [1, 10, 100, 1000, 10000, 100000, 1000000] 
                                    : [0.000000000001, 0.000000001, 0.000001, 0.001, 1];
    
    const allValues = [];
    multipliers.forEach(mult => {
        commonValues.forEach(val => {
            allValues.push(val * mult);
        });
    });
    
    // Filtrar valores cercanos al objetivo
    const relevantValues = allValues.filter(val => val <= target * 10 && val >= target * 0.1);
    
    // Encontrar combinaciones
    const combinations = [];
    
    // Combinaciones de 2 componentes
    for (let i = 0; i < Math.min(relevantValues.length, 50); i++) {
        for (let j = i; j < Math.min(relevantValues.length, 50); j++) {
            const v1 = relevantValues[i];
            const v2 = relevantValues[j];
            
            // Serie
            let seriesVal, parallelVal;
            if (isResistor) {
                seriesVal = v1 + v2;
                parallelVal = 1 / (1/v1 + 1/v2);
            } else {
                seriesVal = 1 / (1/v1 + 1/v2);
                parallelVal = v1 + v2;
            }
            
            // Verificar si está cerca del objetivo
            const seriesError = Math.abs(seriesVal - target) / target * 100;
            const parallelError = Math.abs(parallelVal - target) / target * 100;
            
            if (seriesError < 5) {
                combinations.push({
                    type: 'Serie',
                    values: [v1, v2],
                    result: seriesVal,
                    error: seriesError
                });
            }
            
            if (parallelError < 5) {
                combinations.push({
                    type: 'Paralelo',
                    values: [v1, v2],
                    result: parallelVal,
                    error: parallelError
                });
            }
        }
    }
    
    // Ordenar por error
    combinations.sort((a, b) => a.error - b.error);
    
    // Limitar a las mejores 10
    const bestCombinations = combinations.slice(0, 10);
    
    if (bestCombinations.length === 0) {
        showMessage('No se encontraron combinaciones cercanas al valor deseado con componentes comunes.', 'warning');
        combinationsSection.style.display = 'none';
        return;
    }
    
    // Mostrar combinaciones
    displayCombinations(target, bestCombinations, isResistor);
    showMessage(`Se encontraron ${bestCombinations.length} combinaciones cercanas al valor deseado.`, 'success');
}

/**
 * Muestra las combinaciones encontradas
 */
function displayCombinations(target, combinations, isResistor) {
    targetDisplay.textContent = formatValue(target, isResistor);
    
    combinationsList.innerHTML = '';
    
    combinations.forEach(comb => {
        const card = document.createElement('div');
        card.className = 'combination-card';
        
        const prefix = isResistor ? 'R' : 'C';
        const componentsText = comb.values.map((val, idx) => 
            `${prefix}${idx + 1} = ${formatValue(val, isResistor)}`
        ).join(' + ');
        
        card.innerHTML = `
            <div class="combination-header">
                <span class="combination-type">${comb.type}</span>
                <span class="combination-value">${formatValue(comb.result, isResistor)}</span>
            </div>
            <div class="combination-components">${componentsText}</div>
            <div class="combination-error">Error: ${comb.error.toFixed(2)}%</div>
        `;
        
        combinationsList.appendChild(card);
    });
    
    combinationsSection.style.display = 'block';
}

/**
 * Actualiza las fórmulas según el tipo de componente
 */
function updateFormulas() {
    const isResistor = componentType.value === 'resistor';
    
    if (isResistor) {
        formulasContent.innerHTML = `
            <div class="formula-card">
                <h4>Resistencias en Serie</h4>
                <p class="formula-text">R_total = R1 + R2 + R3 + ...</p>
            </div>
            <div class="formula-card">
                <h4>Resistencias en Paralelo</h4>
                <p class="formula-text">1/R_total = 1/R1 + 1/R2 + 1/R3 + ...</p>
            </div>
            <div class="variables-info">
                <h4>Variables:</h4>
                <ul>
                    <li><strong>R:</strong> Resistencia (Ω)</li>
                    <li><strong>R_total:</strong> Resistencia equivalente</li>
                    <li><strong>Serie:</strong> Las resistencias se suman</li>
                    <li><strong>Paralelo:</strong> El inverso de la suma de inversos</li>
                </ul>
            </div>
        `;
    } else {
        formulasContent.innerHTML = `
            <div class="formula-card">
                <h4>Condensadores en Serie</h4>
                <p class="formula-text">1/C_total = 1/C1 + 1/C2 + 1/C3 + ...</p>
            </div>
            <div class="formula-card">
                <h4>Condensadores en Paralelo</h4>
                <p class="formula-text">C_total = C1 + C2 + C3 + ...</p>
            </div>
            <div class="variables-info">
                <h4>Variables:</h4>
                <ul>
                    <li><strong>C:</strong> Capacitancia (F)</li>
                    <li><strong>C_total:</strong> Capacitancia equivalente</li>
                    <li><strong>Serie:</strong> El inverso de la suma de inversos</li>
                    <li><strong>Paralelo:</strong> Las capacitancias se suman</li>
                </ul>
            </div>
        `;
    }
}

/**
 * Muestra un mensaje
 */
function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message-box ' + type;
    messageBox.style.display = 'block';
}

/**
 * Oculta el mensaje
 */
function hideMessage() {
    messageBox.style.display = 'none';
}

/**
 * Limpia todo
 */
function clearAll() {
    // Limpiar componentes
    componentsContainer.innerHTML = '';
    componentCount = 0;
    
    // Limpiar valor objetivo
    targetValue.value = '';
    
    // Ocultar resultados
    resultsSection.style.display = 'none';
    combinationsSection.style.display = 'none';
    hideMessage();
    
    // Agregar 2 componentes iniciales
    addComponent();
    addComponent();
}
