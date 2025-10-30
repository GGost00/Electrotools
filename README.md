# 📁 Estructura del Proyecto ElectroTools

## Organización de Archivos

```
electrotools/
│
├── index.html                    ← Página principal (con el menú superior)
│
├── /css/
│   ├── style.css                 ← Estilos generales del sitio (navbar, fuentes, layout)
│   └── color-code.css            ← Estilos específicos de la calculadora de colores
│
├── /js/
│   ├── main.js                   ← Código general del sitio (navegación, menús)
│   └── color-code.js             ← Lógica de la calculadora de colores
│
├── /calculadoras/
│   └── color-code.html           ← Calculadora de código de colores de resistencias
│   └── buscar-color-resistencia.html ← Calculadora para buscar colores (inversa)
│   └── ley-de-ohm.html           ← Calculadora de la Ley de Ohm (V, I, R, P)
│   └── divisor-resistivo.html    ← (Próximamente) Calculadora divisor resistivo
│   └── reactancia.html           ← (Próximamente) Calculadora reactancia/resonancia
│
├── /pinouts/
│   └── arduino.html              ← (Próximamente) Pinouts Arduino
│   └── esp32.html                ← (Próximamente) Pinouts ESP32
│   └── raspberry-pi.html         ← (Próximamente) Pinouts Raspberry Pi
│   └── sensores.html             ← (Próximamente) Pinouts sensores
│
├── /recursos/
│   └── datasheets.html           ← (Próximamente) Datasheets
│   └── tutoriales.html           ← (Próximamente) Tutoriales
│   └── herramientas.html         ← (Próximamente) Herramientas
│
├── /img/                         ← Imágenes, logos, íconos
│
└── /assets/                      ← Fuentes, íconos SVG, recursos estáticos
```

## 📝 Descripción de Archivos

### Archivos Principales
- **index.html**: Página de inicio con menú de navegación y secciones principales
- **css/style.css**: Estilos globales (header, footer, navegación, diseño general)
- **js/main.js**: JavaScript global (menú hamburguesa, dropdowns, scroll effects)

### Calculadoras
- **calculadoras/color-code.html**: Calculadora de código de colores de resistencias
- **calculadoras/buscar-color-resistencia.html**: Calculadora inversa para buscar colores
- **calculadoras/ley-de-ohm.html**: Calculadora de la Ley de Ohm (V = I × R)
- **css/color-code.css**: Estilos específicos de la calculadora de colores
- **css/buscar-color-resistencia.css**: Estilos específicos del buscador de colores
- **css/ley-de-ohm.css**: Estilos específicos de la calculadora de Ley de Ohm
- **js/color-code.js**: Lógica de cálculo y actualización visual de resistencias
- **js/buscar-color-resistencia.js**: Lógica para calcular colores a partir del valor
- **js/ley-de-ohm.js**: Lógica para cálculos de voltaje, corriente, resistencia y potencia

## 🚀 Cómo agregar nuevas páginas

### Para agregar una nueva calculadora:
1. Crear archivo HTML en `/calculadoras/`
2. Crear archivo CSS específico en `/css/` (si es necesario)
3. Crear archivo JS específico en `/js/` (si es necesario)
4. Actualizar los enlaces en el menú de navegación en `index.html`

### Patrón de enlaces:
```html
<!-- En index.html -->
<link rel="stylesheet" href="css/style.css">
<script src="js/main.js"></script>

<!-- En calculadoras/nombre.html -->
<link rel="stylesheet" href="../css/style.css">
<link rel="stylesheet" href="../css/nombre.css">
<script src="../js/main.js"></script>
<script src="../js/nombre.js"></script>
```

## 🎨 Convenciones de Nombres

- **HTML**: Usar guiones (`color-code.html`, `ley-ohm.html`)
- **CSS**: Usar guiones (`style.css`, `color-code.css`)
- **JS**: Usar guiones (`main.js`, `color-code.js`)
- **Carpetas**: Usar minúsculas sin espacios (`calculadoras`, `pinouts`, `recursos`)

## 📦 Estado del Proyecto

✅ **Completado:**
- Página principal (index.html)
- Sistema de navegación responsivo
- Calculadora de código de colores de resistencias
- Calculadora de búsqueda de colores (inversa)
- Calculadora de la Ley de Ohm

🔄 **En desarrollo:**
- Calculadora divisor resistivo
- Calculadora reactancia/resonancia
- Secciones de Pinouts
- Secciones de Recursos

## 🛠️ Tecnologías

- HTML5
- CSS3 (Flexbox, Grid, Animaciones)
- JavaScript Vanilla (ES6+)
- Diseño Responsivo (Mobile First)

## 📱 Compatibilidad

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

---

**ElectroTools** - Tu portal completo de herramientas y recursos para electrónica
