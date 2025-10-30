# 📁 Estructura de Archivos - ElectroTools

## 🎯 Archivos INDEX Principales

### 1. **index.html** (Página Principal)
- **Ubicación**: `/index.html`
- **También como**: `/index-principal.html` (copia de respaldo)
- **Función**: Landing page principal del sitio web
- **Acceso**: Raíz del sitio - Primera página que ve el usuario

### 2. **index-calculadoras.html**
- **Ubicación**: `/calculadoras/index.html`
- **También como**: `/calculadoras/index-calculadoras.html` (copia de respaldo)
- **Función**: Hub/índice de todas las calculadoras disponibles
- **Muestra**: 6 tarjetas interactivas con las calculadoras
- **Acceso**: Desde menú "Calculadoras" → "Ver todas las Calculadoras"

### 3. **index-pinouts.html**
- **Ubicación**: `/pinouts/index.html`
- **También como**: `/pinouts/index-pinouts.html` (copia de respaldo)
- **Función**: Hub/índice de todos los pinouts disponibles
- **Muestra**: 7 categorías de pinouts (Arduino, Raspberry Pi, Displays, etc.)
- **Acceso**: Desde menú "Pinouts" → "Ver todos los Pinouts"

### 4. **index-arduino.html**
- **Ubicación**: `/pinouts/arduino/index.html`
- **También como**: `/pinouts/arduino/index-arduino.html` (copia de respaldo)
- **Función**: Hub/índice de placas Arduino
- **Muestra**: 4 tarjetas con Arduino Uno, Mega, Nano, Leonardo
- **Acceso**: Desde menú "Pinouts" → "Arduino" O desde `/pinouts/index.html` → tarjeta Arduino

---

## 🔗 Rutas de Navegación

### Desde la Página Principal (`/index.html`)
```
/index.html
  ├── Menú "Calculadoras" → /calculadoras/index.html
  │   └── Ver todas las calculadoras (6 opciones)
  │
  ├── Menú "Pinouts" → /pinouts/index.html
  │   ├── Ver todos los Pinouts (7 categorías)
  │   └── Arduino → /pinouts/arduino/index.html
  │       ├── Arduino Uno → /pinouts/arduino/uno.html
  │       ├── Arduino Mega → /pinouts/arduino/mega.html
  │       ├── Arduino Nano → /pinouts/arduino/nano.html
  │       └── Arduino Leonardo → /pinouts/arduino/leonardo.html
  │
  └── Menú "Recursos" → (pendiente)
      ├── Datasheets
      ├── Tutoriales
      └── Herramientas
```

---

## 📂 Estructura Completa de Carpetas

```
electrotools/
│
├── index.html                          # ✅ Página principal del sitio
├── index-principal.html                # 📋 Copia de respaldo
├── README.md                           # Documentación del proyecto
├── ESTRUCTURA.md                       # 📄 Este archivo
│
├── assets/                             # Recursos generales
│
├── calculadoras/                       # 🧮 Sección de Calculadoras
│   ├── index.html                      # ✅ Hub de calculadoras
│   ├── index-calculadoras.html         # 📋 Copia de respaldo
│   ├── color-code.html                 # Calculadora: Código de colores
│   ├── buscar-color-resistencia.html   # Calculadora: Buscar colores
│   ├── ley-de-ohm.html                 # Calculadora: Ley de Ohm
│   ├── filtros.html                    # Calculadora: Filtros RC/RL/RLC
│   ├── divisor-resistivo.html          # Calculadora: Divisor de voltaje
│   └── serie-paralelo.html             # Calculadora: Serie-Paralelo
│
├── pinouts/                            # 📌 Sección de Pinouts
│   ├── index.html                      # ✅ Hub de pinouts (7 categorías)
│   ├── index-pinouts.html              # 📋 Copia de respaldo
│   │
│   └── arduino/                        # Subsección Arduino
│       ├── index.html                  # ✅ Hub de placas Arduino
│       ├── index-arduino.html          # 📋 Copia de respaldo
│       ├── uno.html                    # Pinout Arduino Uno
│       ├── mega.html                   # Pinout Arduino Mega 2560
│       ├── nano.html                   # Pinout Arduino Nano
│       └── leonardo.html               # Pinout Arduino Leonardo
│
├── css/                                # 🎨 Estilos
│   ├── style.css                       # Estilos globales
│   ├── calculadoras-index.css          # Estilos del hub de calculadoras
│   ├── pinouts.css                     # Estilos de pinouts (todas las páginas)
│   ├── color-code.css
│   ├── buscar-color-resistencia.css
│   ├── ley-de-ohm.css
│   ├── filtros.css
│   ├── divisor-resistivo.css
│   └── serie-paralelo.css
│
├── js/                                 # 📜 JavaScript
│   ├── main.js                         # Script principal
│   ├── pinouts.js                      # Búsqueda/filtrado de pinouts
│   ├── color-code.js
│   ├── buscar-color-resistencia.js
│   ├── ley-de-ohm.js
│   ├── filtros.js
│   ├── divisor-resistivo.js
│   └── serie-paralelo.js
│
└── img/                                # 🖼️ Imágenes
    ├── pinouts/                        # SVG de categorías de pinouts
    │   ├── arduino.svg
    │   ├── raspberry-pi.svg
    │   ├── displays.svg
    │   ├── conectores.svg
    │   ├── sensores.svg
    │   ├── modulos-comunicacion.svg
    │   └── componentes-basicos.svg
    │
    └── (pendiente)                     # PNG de pinouts Arduino
        ├── arduino-uno.png             # ⏳ Agregar aquí
        ├── arduino-mega.png            # ⏳ Agregar aquí
        ├── arduino-nano.png            # ⏳ Agregar aquí
        └── arduino-leonardo.png        # ⏳ Agregar aquí
```

---

## 🔄 Conexiones de Navegación

### ✅ CORREGIDO: Link de Arduino
**Antes (incorrecto):**
```html
<li><a href="pinouts/arduino.html">Arduino</a></li>
```

**Ahora (correcto):**
```html
<li><a href="pinouts/arduino/index.html">Arduino</a></li>
```

### Archivos actualizados con la ruta correcta:
- ✅ `/index.html` (principal)
- ✅ `/index-principal.html`
- ✅ `/calculadoras/index.html`
- ✅ `/calculadoras/index-calculadoras.html`
- ✅ `/calculadoras/color-code.html`
- ✅ `/calculadoras/buscar-color-resistencia.html`
- ✅ `/calculadoras/ley-de-ohm.html`
- ✅ `/calculadoras/filtros.html`
- ✅ `/calculadoras/divisor-resistivo.html`
- ✅ `/calculadoras/serie-paralelo.html`
- ✅ `/pinouts/index.html`
- ✅ `/pinouts/index-pinouts.html`

---

## 📝 Notas Importantes

### Archivos Duplicados (Respaldo + Identificación)
**AMBOS archivos existen y deben MANTENERSE:**

| Archivo Principal | Copia de Respaldo | Razón |
|------------------|-------------------|-------|
| `index.html` | `index-principal.html` | Los servidores web buscan `index.html` por defecto |
| `calculadoras/index.html` | `calculadoras/index-calculadoras.html` | Funcionalidad normal del servidor |
| `pinouts/index.html` | `pinouts/index-pinouts.html` | Necesario para navegación automática |
| `pinouts/arduino/index.html` | `pinouts/arduino/index-arduino.html` | Compatibilidad con URLs |

**¿Por qué mantener ambos?**
1. ✅ `index.html` - **OBLIGATORIO**: Los navegadores y servidores web buscan este archivo automáticamente cuando accedes a una carpeta
2. ✅ `index-###.html` - **ÚTIL**: Copia de respaldo con nombre descriptivo para identificar fácilmente qué hace cada archivo

**Ejemplo práctico:**
```
URL: http://tudominio.com/calculadoras/
→ El servidor busca automáticamente: calculadoras/index.html
→ Si solo tuvieras index-calculadoras.html, daría error 404
```

**Recomendación**: **MANTENER AMBOS archivos**. No eliminan espacio significativo y garantizan compatibilidad total.

### Imágenes Pendientes
Los archivos de pinouts Arduino están listos pero esperan las imágenes PNG:
1. Coloca las imágenes en: `/img/`
2. Nombres esperados:
   - `arduino-uno.png`
   - `arduino-mega.png`
   - `arduino-nano.png`
   - `arduino-leonardo.png`
3. Descomenta las etiquetas `<img>` en cada archivo HTML

### Secciones Futuras
Pendientes por crear:
- `/pinouts/raspberry-pi.html`
- `/pinouts/displays.html`
- `/pinouts/conectores.html`
- `/pinouts/sensores.html`
- `/pinouts/modulos-comunicacion.html`
- `/pinouts/componentes-basicos.html`
- `/recursos/` (carpeta completa)

---

## 🎯 Resumen Rápido

| Archivo | Ubicación | Función |
|---------|-----------|---------|
| **index-principal.html** | `/` | Landing page del sitio |
| **index-calculadoras.html** | `/calculadoras/` | Hub de 6 calculadoras |
| **index-pinouts.html** | `/pinouts/` | Hub de 7 categorías de pinouts |
| **index-arduino.html** | `/pinouts/arduino/` | Hub de 4 placas Arduino |

---

**Fecha de actualización**: 27 de octubre de 2025  
**Estado**: ✅ Navegación completamente conectada y funcional
