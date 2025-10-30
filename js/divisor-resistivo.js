// === Calculadora de Divisor de Voltaje ===

// Variables de estado
const locks = {
    vin: false,
    r1: false,
    r2: false,
    vout: false
};

// Elementos del DOM
const vinInput = document.getElementById('vin');
const r1Input = document.getElementById('r1');
const r2Input = document.getElementById('r2');
const voutInput = document.getElementById('vout');
const ratioRInput = document.getElementById('ratioR');
const ratioVInput = document.getElementById('ratioV');

const lockVinBtn = document.getElementById('lockVin');
const lockR1Btn = document.getElementById('lockR1');
const lockR2Btn = document.getElementById('lockR2');
const lockVoutBtn = document.getElementById('lockVout');

const calculateBtn = document.getElementById('calculateBtn');
const clearBtn = document.getElementById('clearBtn');
const messageBox = document.getElementById('messageBox');
const resultsSection = document.getElementById('resultsSection');

// Event Listeners para bloqueos
lockVinBtn.addEventListener('click', () => toggleLock('vin', lockVinBtn, vinInput));
lockR1Btn.addEventListener('click', () => toggleLock('r1', lockR1Btn, r1Input));
lockR2Btn.addEventListener('click', () => toggleLock('r2', lockR2Btn, r2Input));
lockVoutBtn.addEventListener('click', () => toggleLock('vout', lockVoutBtn, voutInput));

// Event Listeners para cálculos
calculateBtn.addEventListener('click', calculate);
clearBtn.addEventListener('click', clearAll);

// Auto-calcular relaciones
ratioRInput.addEventListener('input', updateFromRatioR);
ratioVInput.addEventListener('input', updateFromRatioV);

/**
 * Alterna el estado de bloqueo de un campo
 */
function toggleLock(field, button, input) {
    locks[field] = !locks[field];
    
    const lockIcon = button.querySelector('.lock-icon');
    
    if (locks[field]) {
        button.classList.add('locked');
        input.parentElement.classList.add('locked');
        input.disabled = true;
        lockIcon.textContent = '🔒';
    } else {
        button.classList.remove('locked');
        input.parentElement.classList.remove('locked');
        input.disabled = false;
        lockIcon.textContent = '🔓';
    }
}

/**
 * Actualiza valores desde la relación R1/R2
 */
function updateFromRatioR() {
    const ratio = parseFloat(ratioRInput.value);
    if (isNaN(ratio) || ratio <= 0) return;
    
    // Si R1 está bloqueado, calcular R2
    if (locks.r1 && !locks.r2) {
        const r1 = parseFloat(r1Input.value);
        if (!isNaN(r1) && r1 > 0) {
            r2Input.value = (r1 / ratio).toFixed(2);
        }
    }
    // Si R2 está bloqueado, calcular R1
    else if (locks.r2 && !locks.r1) {
        const r2 = parseFloat(r2Input.value);
        if (!isNaN(r2) && r2 > 0) {
            r1Input.value = (r2 * ratio).toFixed(2);
        }
    }
}

/**
 * Actualiza valores desde la relación Vin/Vout
 */
function updateFromRatioV() {
    const ratio = parseFloat(ratioVInput.value);
    if (isNaN(ratio) || ratio <= 0) return;
    
    // Si Vin está bloqueado, calcular Vout
    if (locks.vin && !locks.vout) {
        const vin = parseFloat(vinInput.value);
        if (!isNaN(vin) && vin > 0) {
            voutInput.value = (vin / ratio).toFixed(2);
        }
    }
    // Si Vout está bloqueado, calcular Vin
    else if (locks.vout && !locks.vin) {
        const vout = parseFloat(voutInput.value);
        if (!isNaN(vout) && vout > 0) {
            vinInput.value = (vout * ratio).toFixed(2);
        }
    }
}

/**
 * Realiza el cálculo principal
 */
function calculate() {
    hideMessage();
    
    // Obtener valores
    let vin = parseFloat(vinInput.value);
    let r1 = parseFloat(r1Input.value);
    let r2 = parseFloat(r2Input.value);
    let vout = parseFloat(voutInput.value);
    
    // Contar valores válidos y bloqueados
    const values = { vin, r1, r2, vout };
    const validCount = Object.values(values).filter(v => !isNaN(v) && v > 0).length;
    const lockedCount = Object.values(locks).filter(v => v).length;
    
    // Validar que hay suficientes datos
    if (validCount < 3) {
        showMessage('Por favor ingresa al menos 3 valores válidos para calcular.', 'warning');
        return;
    }
    
    // Validar que no estén todos bloqueados
    if (lockedCount >= 4) {
        showMessage('No se puede calcular con todos los valores bloqueados.', 'error');
        return;
    }
    
    try {
        // Determinar qué calcular según valores bloqueados
        if (lockedCount === 3) {
            // Calcular el único valor no bloqueado
            if (!locks.vin) {
                vin = calculateVin(vout, r1, r2);
                vinInput.value = vin.toFixed(3);
            } else if (!locks.r1) {
                r1 = calculateR1(vin, vout, r2);
                r1Input.value = r1.toFixed(2);
            } else if (!locks.r2) {
                r2 = calculateR2(vin, vout, r1);
                r2Input.value = r2.toFixed(2);
            } else if (!locks.vout) {
                vout = calculateVout(vin, r1, r2);
                voutInput.value = vout.toFixed(3);
            }
        } else {
            // Calcular valores faltantes
            if (isNaN(vin) || vin <= 0) {
                if (!isNaN(vout) && !isNaN(r1) && !isNaN(r2)) {
                    vin = calculateVin(vout, r1, r2);
                    vinInput.value = vin.toFixed(3);
                }
            }
            if (isNaN(r1) || r1 <= 0) {
                if (!isNaN(vin) && !isNaN(vout) && !isNaN(r2)) {
                    r1 = calculateR1(vin, vout, r2);
                    r1Input.value = r1.toFixed(2);
                }
            }
            if (isNaN(r2) || r2 <= 0) {
                if (!isNaN(vin) && !isNaN(vout) && !isNaN(r1)) {
                    r2 = calculateR2(vin, vout, r1);
                    r2Input.value = r2.toFixed(2);
                }
            }
            if (isNaN(vout) || vout <= 0) {
                if (!isNaN(vin) && !isNaN(r1) && !isNaN(r2)) {
                    vout = calculateVout(vin, r1, r2);
                    voutInput.value = vout.toFixed(3);
                }
            }
        }
        
        // Actualizar valores finales
        vin = parseFloat(vinInput.value);
        r1 = parseFloat(r1Input.value);
        r2 = parseFloat(r2Input.value);
        vout = parseFloat(voutInput.value);
        
        // Validar resultados
        if (isNaN(vin) || isNaN(r1) || isNaN(r2) || isNaN(vout)) {
            showMessage('No hay suficientes datos para calcular todos los valores.', 'warning');
            return;
        }
        
        // Calcular parámetros adicionales
        const rtotal = r1 + r2;
        const current = vin / rtotal;
        const vr1 = vin - vout;
        const ptotal = vin * current;
        const p1 = current * current * r1;
        const p2 = current * current * r2;
        
        // Mostrar resultados
        displayResults({
            vin, vout, vr1,
            r1, r2, rtotal,
            current, ptotal, p1, p2
        });
        
        showMessage('Cálculo completado exitosamente.', 'info');
        
    } catch (error) {
        showMessage('Error en el cálculo: ' + error.message, 'error');
    }
}

/**
 * Calcula Vout: Vout = Vin × (R2 / (R1 + R2))
 */
function calculateVout(vin, r1, r2) {
    if (r1 <= 0 || r2 <= 0) {
        throw new Error('Las resistencias deben ser mayores a cero');
    }
    return vin * (r2 / (r1 + r2));
}

/**
 * Calcula Vin: Vin = Vout × (R1 + R2) / R2
 */
function calculateVin(vout, r1, r2) {
    if (r2 <= 0) {
        throw new Error('R2 debe ser mayor a cero');
    }
    return vout * (r1 + r2) / r2;
}

/**
 * Calcula R1: R1 = R2 × (Vin - Vout) / Vout
 */
function calculateR1(vin, vout, r2) {
    if (vout <= 0) {
        throw new Error('Vout debe ser mayor a cero');
    }
    if (vin <= vout) {
        throw new Error('Vin debe ser mayor que Vout');
    }
    return r2 * (vin - vout) / vout;
}

/**
 * Calcula R2: R2 = R1 × Vout / (Vin - Vout)
 */
function calculateR2(vin, vout, r1) {
    if (vin <= vout) {
        throw new Error('Vin debe ser mayor que Vout');
    }
    return r1 * vout / (vin - vout);
}

/**
 * Muestra los resultados del cálculo
 */
function displayResults(results) {
    // Voltajes
    document.getElementById('resultVin').textContent = formatVoltage(results.vin);
    document.getElementById('resultVout').textContent = formatVoltage(results.vout);
    document.getElementById('resultVR1').textContent = formatVoltage(results.vr1);
    
    // Resistencias
    document.getElementById('resultR1').textContent = formatResistance(results.r1);
    document.getElementById('resultR2').textContent = formatResistance(results.r2);
    document.getElementById('resultRtotal').textContent = formatResistance(results.rtotal);
    
    // Corriente y Potencia
    document.getElementById('resultCurrent').textContent = formatCurrent(results.current);
    document.getElementById('resultPtotal').textContent = formatPower(results.ptotal);
    document.getElementById('resultP1').textContent = formatPower(results.p1);
    document.getElementById('resultP2').textContent = formatPower(results.p2);
    
    // Mostrar sección de resultados
    resultsSection.style.display = 'block';
}

/**
 * Formatea voltaje con unidad apropiada
 */
function formatVoltage(v) {
    if (v >= 1000) {
        return (v / 1000).toFixed(3) + ' kV';
    } else if (v >= 1) {
        return v.toFixed(3) + ' V';
    } else if (v >= 0.001) {
        return (v * 1000).toFixed(3) + ' mV';
    } else {
        return (v * 1000000).toFixed(3) + ' µV';
    }
}

/**
 * Formatea resistencia con unidad apropiada
 */
function formatResistance(r) {
    if (r >= 1000000) {
        return (r / 1000000).toFixed(3) + ' MΩ';
    } else if (r >= 1000) {
        return (r / 1000).toFixed(3) + ' kΩ';
    } else {
        return r.toFixed(3) + ' Ω';
    }
}

/**
 * Formatea corriente con unidad apropiada
 */
function formatCurrent(i) {
    if (i >= 1) {
        return i.toFixed(6) + ' A';
    } else if (i >= 0.001) {
        return (i * 1000).toFixed(6) + ' mA';
    } else if (i >= 0.000001) {
        return (i * 1000000).toFixed(6) + ' µA';
    } else {
        return (i * 1000000000).toFixed(6) + ' nA';
    }
}

/**
 * Formatea potencia con unidad apropiada
 */
function formatPower(p) {
    if (p >= 1000) {
        return (p / 1000).toFixed(6) + ' kW';
    } else if (p >= 1) {
        return p.toFixed(6) + ' W';
    } else if (p >= 0.001) {
        return (p * 1000).toFixed(6) + ' mW';
    } else if (p >= 0.000001) {
        return (p * 1000000).toFixed(6) + ' µW';
    } else {
        return (p * 1000000000).toFixed(6) + ' nW';
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
 * Limpia todos los campos
 */
function clearAll() {
    // Limpiar inputs
    vinInput.value = '';
    r1Input.value = '';
    r2Input.value = '';
    voutInput.value = '';
    ratioRInput.value = '';
    ratioVInput.value = '';
    
    // Desbloquear todos
    if (locks.vin) toggleLock('vin', lockVinBtn, vinInput);
    if (locks.r1) toggleLock('r1', lockR1Btn, r1Input);
    if (locks.r2) toggleLock('r2', lockR2Btn, r2Input);
    if (locks.vout) toggleLock('vout', lockVoutBtn, voutInput);
    
    // Ocultar resultados y mensajes
    resultsSection.style.display = 'none';
    hideMessage();
}
