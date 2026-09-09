# 06_PROMPTS_GOOGLE_STITCH.md
**Proyecto:** Fábrica de Bocadillos La Esperanza  
**Dominio:** Agroindustria Veleña, Gestión de Ventas Mayoristas, Acopio de Guayaba y Despachos  
**Estilo Visual Seleccionado:** Estilo #10 - Warm Retro Vintage (Warm Retro Academic / Archival Ledger)  
**Herramienta Destino:** Google Stitch (`stitch.withgoogle.com`)  
**Autor:** Staff UI/UX Lead & Design Systems Engineer  

---

## 1. Token de Identidad Visual Compartido (Visual System Specs)

Todos los prompts de la suite comparten rigurosamente este bloque de especificaciones de diseño para garantizar consistencia óptica, jerarquía tipográfica y coherencia de componentes en Google Stitch.

```yaml
design_system:
  name: "Warm Retro Vintage Veleño #10"
  archetype: "Archival Agroindustrial Ledger & Mid-Century Editorial"
  palette:
    surface: "#FEFAE0"                # Fondo pergamino cálido principal
    surface_alt: "#F4F1DE"            # Inset cards y paneles alternos
    surface_white: "#FFFFFF"          # Fondos interiores de tarjetas de datos
    primary: "#BC6C25"                # Terracota / Paila de cobre (acentos y marcos)
    primary_dark: "#8F4A00"           # Terracota oscuro para textos de alta jerarquía
    secondary: "#283618"              # Verde oliva bosque profundo (autoridad y sombra)
    secondary_light: "#546341"        # Verde hoja de bijao
    mustard: "#DDA15E"                # Mostaza cálido para tabs y badges
    sage_container: "#D7E9BD"         # Verde salvia para tags de verificación
    error: "#9A031E"                  # Rojo carmín artesanal (advertencias y mermas)
    error_container: "#FFDAD6"        # Fondo suave para banners de error
    outline: "#877366"                # Sepia para guías y bordes sutiles
    text_main: "#1D1C0D"              # Negro tinta profunda sobre pergamino
    text_muted: "#544438"             # Marrón ceniza para etiquetas secundarias
  typography:
    headings: "Playfair Display, serif (pesos 600, 700)"
    body: "Inter, -apple-system, sans-serif (pesos 400, 500, 600)"
    technical_data: "JetBrains Mono, monospace (pesos 500, 700)"
  elevation_and_borders:
    hard_shadow: "3px 3px 0px #283618"
    hard_shadow_subtle: "2px 2px 0px #544438"
    hard_shadow_lg: "5px 5px 0px #121F05"
    double_border: "3px double #BC6C25"
    border_radius: "4px (0.25rem) general, pill para badges métricos"
    active_press: "translate(2px, 2px) con shadow: 0px 0px 0px"
  mandated_ui_states:
    empty_state: "Ilustración o iconografía retro de paila/caja vacía, texto explicativo y botón de acción de reposición"
    loading_skeleton: "Efecto de pulso en contenedor pergamino con barras simuladas en #E7E3CA"
    success_toast: "Toast flotante inferior derecho en verde oliva #283618 con borde crema y texto de confirmación"
    error_alert: "Banner superior en #FFDAD6 con borde doble #9A031E, ícono de alerta y botón reintentar"
  domain_entities:
    enterprise: "Fábrica de Bocadillos La Esperanza S.A.S."
    location: "Vélez, Santander, Colombia"
    operator: "Don Carlos Ruiz (Administrador General & Maestro Dulcero)"
    buyer: "Distribuidora Dulces del Fonce S.A.S. (San Gil, Santander - NIT 890.102.948-1)"
    runtime: "Payara Server 7.x JVM • MySQL 8.x • Denominación de Origen Ley 2020"
```

---

## 2. Suite Completa de Prompts Individuales (PROMPT 1 a PROMPT 7)

A continuación se presenta la suite íntegra de los 7 prompts listos para copiar y pegar en la consola de `stitch.withgoogle.com`.

---

### PROMPT 1 (SCR-01): Autenticación & Onboarding (`/index.html`)

```text
Create an authentic Warm Retro Vintage authentication and onboarding screen for 'Fábrica de Bocadillos La Esperanza S.A.S.' (Vélez, Santander, Colombia) running on Payara Server 7.x JVM. 

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Archival agroindustrial register).
- Color Palette: Warm parchment background (#FEFAE0), deep olive typography and borders (#283618), terracotta and copper accents (#BC6C25, #8F4A00), golden mustard tags (#DDA15E), sage green accents (#606C38, #D7E9BD), and archival paper containers (#F4F1DE, #FFFFFF).
- Typography: Display titles in 'Playfair Display' (bold serif), interface body in 'Inter', and technical registry stamps in 'JetBrains Mono'.
- Elevation & Framing: Tangible hard offset shadow (3px 3px 0px #283618), crisp double borders (3px double #BC6C25), and 4px subtle rounded corners.

SCREEN LAYOUT & COMPONENTS:
1. Top Switchboard Bar: Include an interactive dev state switcher with 4 clickable pills: '[1] Inicial', '[2] Cargando', '[3] Error', '[4] Éxito' to simulate real UI states.
2. Masthead: Centered vintage circular seal with guava logo, pill badge 'PRODUCCIÓN VELEÑA • PRO v2.4', company title 'Fábrica de Bocadillos La Esperanza' and subtitle 'Sistema de Gestión de Ventas, Inventario de Guayaba y Despachos Agroindustriales'.
3. Archival Auth Card: Centered card with double terracotta border and hard shadow.
   - Top Header Ribbon: 'SEC // 04-B AGROINDUSTRIA' and 'REG. SANTANDER № 1898'.
   - Illustrated Banner: Woodcut engraving banner of artisan guava harvest with bijao leaves and copper caldrons, with badges 'Hojas de Bijao Auténticas' and 'Payara Server 7.x JVM'.
   - Quick Operator Pill: Showing active node 'admin_laesperanza' (Adm. General de Planta) linked to 'Nodo Vélez #1'.
4. Form Controls:
   - Header: 'Ingreso al Sistema JSP' with vintage lock icon.
   - User Input: Field labeled 'USUARIO / CORREO INSTITUCIONAL' with default value 'admin_laesperanza' and keyboard icon.
   - Password Input: Field labeled 'CONTRASEÑA DE ACCESO' with masked characters, show/hide eye toggle, and '¿Olvidó su clave?' link.
   - Session Utilities: Checkbox 'Recordar sesión en Payara 7' and status indicator 'Activo'.
   - Primary Submit Button: Solid terracotta button '#8F4A00' with label 'Ingresar al Sistema →', hard shadow 3px 3px 0px #283618, and mechanical click press effect.
   - Security Footer: 'Cifrado Industrial 256-bit SSL' and 'Certificado Veleño N° 9942'.
5. Operational Bento Ribbon (Bottom): 3 metric cards: '14.2 t Guayaba Acopiada', '3,850 Cajas en Bijao', '100% Denom. Origen'.
6. System Footer: 'Bocadillos La Esperanza S.A.S. • Vélez, Santander, Colombia • Servidor Payara 7.2.1 • Edición Industrial Agropecuaria • JDK 21 LTS'.

MANDATED 4 UI STATES SPECIFICATION:
- Normal/Initial: Clean form ready for input with all fields crisp and accessible.
- Loading Skeleton: Animated pulse container showing progress bar 'Verificando sesión HTTP en Payara Server 7.x...' and pulsing placeholders.
- Error Alert: High-visibility banner in #FFDAD6 with #9A031E border and message '✕ Acceso Denegado: Usuario o contraseña incorrectos. Verifique sus credenciales con el administrador de planta.' and retry button.
- Success Toast: Floating notification at bottom-right in olive #283618 with cream text '¡Sesión Autorizada! ✓ Bienvenido Don Carlos Ruiz. Cargando Libro Mayor...'.
```

---

### PROMPT 2 (SCR-02): Dashboard Principal con 4 KPIs y Gráficos (`/WEB-INF/JSPF/menu.jsp`)

```text
Design a comprehensive administrative Dashboard for 'Fábrica de Bocadillos La Esperanza' (Vélez, Santander) displaying real-time agroindustrial inventory, production batches, and wholesale orders.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Ledger & Archival Broadsheet).
- Color Tokens: Canvas #FEFAE0, olive borders #283618, terracotta accents #BC6C25 / #8F4A00, sage highlights #D7E9BD / #546341, and mustard indicators #DDA15E.
- Typography: Headers in 'Playfair Display', body in 'Inter', ledger codes & figures in 'JetBrains Mono'.
- Borders & Shadows: Double borders (3px double #BC6C25) and hard-offset 3px 3px 0px #283618 shadows with responsive active states.

SCREEN STRUCTURE & SIDEBAR:
1. Fixed Left Sidebar (288px width):
   - Header with La Esperanza emblem, subtitle 'FÁBRICA DE BOCADILLOS', and badge '[§] PRO PRODUCCIÓN VELEÑA'.
   - Navigation Menu with items: 'Dashboard' (Active with terracotta highlight and hard shadow), 'Catálogo de Bocadillos', 'Clientes y Distribuidores', 'Punto de Venta & Pedidos', 'Proveedores de Guayaba', 'Ajustes del Sistema'.
   - Bottom Profile Card: Avatar of 'Don Carlos Ruiz', title 'Administrador General', and logout button.
2. Top Navigation Bar: Search bar for lots/invoices (with 'Ctrl + K' badge), notification bell with unread badge, and primary action button '+ Nuevo Registro'.
3. State Controller Bar: Interactive switcher pills to test: Normal, Vacío (Empty), Skeleton KPI #3, Alerta Sincronización, and Disparar Toast.
4. Hero Banner: 'Libro Mayor de Producción y Despachos', subtitle 'Monitoreo en tiempo real de molienda de guayaba regional, empaquetado en hoja de bijao de Barbosa y despachos mayoristas interdepartamentales', badge 'DENOMINACIÓN DE ORIGEN PROTEGIDA • VÉLEZ SANTANDER', and botanical guava engraving thumbnail.
5. 4 Executive KPI Cards:
   - KPI 1: 'SEC // 01 · ACTIVOS' -> '48 Lotes de bocadillo en bodega', indicator '+12% vs mes ant.', footer 'Capacidad en estiba: 82% Utilizada'.
   - KPI 2: 'SEC // 02 · CUMPLIMIENTO' -> '94.2% Entregas a tiempo en Santander', badge 'Óptimo Vélez', footer 'Reclamos por empaque: 0.08%'.
   - KPI 3: 'SEC // 03 · VELOCIDAD' -> '2.3 días Procesamiento de pedido', badge '-0.4 días', footer 'Enfriado de jalea: 14 Horas ref.'. (Toggleable to loading skeleton).
   - KPI 4: 'SEC // 04 · ALIANZAS' -> '16 Distribuidores mayoristas autorizados', badge 'Red Andina', footer 'Nuevas solicitudes: 3 En Verificación'.
6. Analytics Section (2 Columns):
   - Left (8 cols): Title 'Rendimiento y Ventas Mensuales: Bocadillo Veleño Extra'. Tab switcher 'Vista Resumen & Molienda' vs 'Vista Libro de Pedidos' with time filters (1M, 3M, 6M, 1A). Vintage bar chart (Oct to Mar) showing 'Caja x 24 Und' vs 'Lonja en Bijao' with highlighted peak in December '8,420 Cajas'.
   - Right (4 cols): Two ledger summary cards: '62.4 Toneladas Guayaba acopiada en Vélez, Guavatá y Chipatá (78% de cuota anual)' and '38,450 Cajas Despachadas en hoja de bijao 100% biodegradable'.
7. Orders Ledger Table:
   - Status filters: 'Todos (48)', 'Completado (34)', 'En Proceso (9)', 'Pendiente de Stock (5)'.
   - In-table search input and export buttons ('CSV Contable', 'Imprimir Remisión').
   - Columns: Código Pedido (#VE-2026-089), Cliente Mayorista (Distribuidora Boyacá S.A., Almacenes El Cóndor Tunja, Supermercados del Chicamocha, Dulcería Tradición Bogotana), Producto Artesanal (Lonja en Bijao x 500g, Caja Surtida x 24, Combinado Guayaba-Arequipe, Tumaco Extra Rojo), Cantidad, Estado de Despacho ([✓] Completado, [•] En Proceso, [§] Pendiente Stock), and Acciones ([Editar], [Remisión]).

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: Full ledger replacement card showing vintage woodcut empty crate illustration, 'No hay pedidos registrados en este periodo', and button 'Restablecer Filtros'.
- Loading Skeleton: KPI #3 toggles into pulsing wireframe placeholders for metric numbers and labels.
- Success Toast: Floating badge at bottom-right in olive #283618 confirming '✓ Inventario de Bocadillo Veleño Lonja actualizado correctamente.'
- Error Alert: Crimson top banner '#FFDAD6' with warning: 'Advertencia de Comunicación de Lotes: Error al sincronizar stock con el servidor MySQL Vélez-Central (Error 504 Gateway Timeout)' with 'Reintentar Ahora'.
```

---

### PROMPT 3 (SCR-03): Explorador / Gestión con Tabla y Kanban (`/WEB-INF/formularioProducto.jsp`)

```text
Build the Product Catalog and Inventory Management view for 'Fábrica de Bocadillos La Esperanza' with dual Table and Kanban views, batch traceability, and agroindustrial stock tracking.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Artisanal Botanical & Ledger).
- Colors: Warm parchment #FEFAE0, olive #283618, terracotta #BC6C25, mustard #DDA15E, sage #546341 / #D7E9BD.
- Typography: Display titles in 'Playfair Display', table & labels in 'Inter', and SKUs/lot codes in 'JetBrains Mono'.
- Elevations: 3px 3px 0px #283618 hard offset shadows, double borders (3px double #BC6C25), and 4px corner rounding.

LAYOUT & FEATURES:
1. Left Navigation Sidebar: Persistent sidebar with 'Catálogo de Bocadillos' active, showing Don Carlos Ruiz profile and system badges.
2. Top Bar: Search input for SKUs, guava lots, and ingredients, notification icon with alert dot, and '+ Nuevo Producto' button.
3. Header & Archival Metadata:
   - Badge: 'REGISTRO DE PLANTA · VÉLEZ SANTANDER // CONTROL DE EXISTENCIAS Y LOTES'.
   - Title: 'Catálogo de Productos & Referencias de Bocadillo'.
   - Description: 'Gestión unificada de formulaciones artesanales, empaque tradicional en hoja de bijao, trazabilidad de pailas de guayaba regional y control de disponibilidad para mayoristas'.
   - 3 Metric Ledger Chips: 'Total Refs: 24', 'Stock Crítico: 02', 'Capacidad Bodega: 86% / 100t'.
4. Filter Toolbar:
   - Text input for SKU/Product filter.
   - Dropdowns: 'Todos los Estados', 'Todas las Categorías', 'Todos los Proveedores (Finca El Paraíso Chipatá, Asociación Guavatá, Cooperativa Barbosa)'.
   - View Mode Switcher: Toggle between '[Tabla]' and '[Kanban]'.
   - Action Button: 'Descargar Kárdex (CSV)'.
5. View A: Ruled Ledger Table:
   - Header: SKU/Código, Nombre & Presentación, Categoría, Precio Mayorista, Stock en Planta (con barra de nivel porcentual), Estado, Lote Activo, Acciones.
   - Row 1: BOC-101 | Bocadillo Veleño Lonja Tradicional (Hoja de Bijao x 500g) | $18.000 COP | 450 cajas (90%) | [✓ Disponible] | Lote #TAN-883 | Acciones (Editar, Duplicar, Eliminar).
   - Row 2: BOC-102 | Combinado Guayaba y Leche (Arequipe) (Caja x 24) | $24.000 COP | 12 cajas (15%) | [! Agotándose] | Lote #TAN-879.
   - Row 3: BOC-103 | Conserva de Guayaba Fina Especial 500g (Frasco vidrio) | $12.500 COP | 180 frascos (65%) | [✓ Disponible] | Lote #TAN-881.
   - Row 4: BOC-104 | Bocadillo Tumaco Extra Rojo (Bloque 1kg) | $28.000 COP | 95 cajas (48%) | [✓ Disponible] | Lote #TAN-875.
   - Row 5: BOC-105 | Herpos Tradicionales Veleños x 12 | $16.000 COP | 8 cajas (8%) | [✕ Crítico] | Lote #TAN-872.
   - Archival Pagination: 'Mostrando 1 a 5 de 24 referencias registradas en kárdex' with vintage page buttons.
6. View B: Production Kanban Board (4 Columns):
   - Column 1: '1. Receta & Ajuste' (1 ref) -> Card: Bocadillo con Panela Orgánica (#LOTE-2026-91, Paila #2).
   - Column 2: '2. Molienda & Cocción' (3 lotes) -> Cards: Pasta de Guayaba Tumaco (#TAN-884, Chipatá, 1.200kg) & Jalea Roja Concentrada (#TAN-885).
   - Column 3: '3. Empaque en Hoja Bijao' (4 lotes) -> Card: Lonja Veleña Auténtica x 500g (#TAN-882, Enfriamiento 14 hrs, taller artesanal).
   - Column 4: '4. Listo / Despacho' (6 refs) -> Card: Caja Surtida Veleña Premium (#TAN-880, 500 cajas paletizadas Muelle 1).

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: Full container with illustrated empty crate, 'No se encontraron lotes de bocadillo', and button '[ Limpiar Filtros y Restaurar Kárdex ]'.
- Loading Skeleton: Row 2 toggles into pulsing placeholder bars for thumbnail, product name, price, stock bar, and action icons.
- Success Toast: Floating notification at bottom-right in olive #283618: '✓ Producto BOC-101 duplicado con éxito en el catálogo.'
- Error Alert: Crimson banner in #FFDAD6 with title 'Acción Denegada en Lote Activo' and message: '✕ No se pudo eliminar el registro seleccionado. La referencia está asociada a un despacho y factura de venta activa (#FAC-2024-819).'
```

---

### PROMPT 4 (SCR-04): Detalle 360 del Registro con Tabs y Timeline (`/WEB-INF/formularioDetalleVenta.jsp`)

```text
Create the 360 Comprehensive Order Record and Dispatch Dossier for 'FACT-2026-8942' of Fábrica de Bocadillos La Esperanza, featuring invoice breakdowns, compliance gauges, tabs, and real-time shipment timelines.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Notarial Dossier & Broadsheet Archival).
- Colors: Canvas #FEFAE0, borders #283618, terracotta highlights #BC6C25, olive accents #546341, mustard pills #DDA15E, and paper cards #FFFFFF / #F4F1DE.
- Typography: 'Playfair Display' for formal document titles, 'Inter' for ledger body, 'JetBrains Mono' for fiscal IDs, NITs, CUFE, and timestamps.
- Elevation: 3px 3px 0px #544438 hard shadows, authentic slanted rubber stamp effect, and double line borders.

SCREEN LAYOUT & DOSSIER STRUCTURE:
1. Left Navigation Sidebar: Persistent sidebar with 'Punto de Venta & Pedidos' active.
2. Top Bar & Breadcrumb: 'Punto de Venta & Pedidos / Facturación Histórica / FACT-2026-8942'.
3. Dossier Master Header:
   - Title: 'Expediente: FACT-2026-8942' with verified seal emblem.
   - Slanted Vintage Rubber Stamp: '[✓] COMPLETADO & FACTURADO' in emerald/olive badge rotated -2 degrees.
   - Customer Metadata: 'Distribuidora Dulces del Fonce S.A.S. • NIT: 890.102.948-1 • San Gil, Santander'.
   - Action Toolbar: 'Imprimir PDF', 'Exportar Datos', 'Anular', and '+ Nueva Transacción'.
4. Split 2-Column Dossier Body:
   - Left Column (8 cols):
     * Archival Tabs Header: 'FOLIO REGISTRAL // LIBRO MAYOR #2026-S2' and tabs: 'Información General' (Active), 'Historial de Lote & Paila', 'Facturación & Pagos', and 'Documentos Adjuntos (0)'.
     * Tab 1 Content - Key-Value Ledger: Cliente Mayorista, Documento Fiscal DIAN (FACT-88412, Res. 18764028), Fecha y Hora (14 de Octubre, 2026 • 09:42 AM - Turno Mañana Paila #2), Condición (5% Pronto Pago Mayorista Convenio #044-B), Método de Pago (Transferencia Bancolombia Cta Cte #9021 con ID BC-994102).
     * Grand Total Highlight Box: '$1.850.000 COP' (Base: $1.554.622, IVA 19%: $295.378 COP).
     * Itemized Products Table: BOC-101 Bocadillo Veleño Lonja Hoja x 50 Cajas ($18.000 = $900.000 COP, Lote #TAN-883 Paila Guavatá) & BOC-102 Combinado Guayaba-Arequipe x 50 Cajas ($19.000 = $950.000 COP, Lote #TAN-879 Barbosa). Subtotal: $1.850.000 COP, Descuento (-5%): -$92.500 COP, Total Neto: $1.757.500 COP [PAGADO TOTAL].
     * Guava Provenance Certificate Box: Botanical guava thumbnail, INVIMA RSA-001928-2022 stamp, and description of 75° Brix cooking in copper caldrons and cured bijao leaves.
   - Right Column (4 cols):
     * Quality Compliance Gauge: Circular SVG progress meter at 98% with label 'Puntaje de Cumplimiento: 98/100 (Grado Excelencia)', micro metrics: Puntualidad Despacho 100%, Calidad Bijao & Sello 99.4%, Fidelización Nivel Oro.
     * Live Vertical Activity Timeline: 5 connected archival milestones:
       1. Orden Recibida y Verificada (14 Oct, 07:15 AM - Don Carlos Ruiz).
       2. Pago Confirmado Bancolombia (14 Oct, 08:30 AM - Webhook Payara 7).
       3. Empaque Bijao & Sanidad (14 Oct, 09:00 AM - Lotes #TAN-883 y #TAN-879).
       4. Despacho Camión TermoKing (14 Oct, 09:42 AM - Guía #TR-7729 a San Gil).
       5. Factura Archivada en DIAN (14 Oct, 10:15 AM - Copia Contable Generada).
     * Protected Designation of Origin Card: 'Denominación de Origen Protegida • Bocadillo Veleño • Ley 2020 de la República'.

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: Switching to Tab 4 'Documentos Adjuntos' renders a dedicated empty state with an archival folder icon, text 'Sin Archivos Digitales Adjuntos', and button '+ Subir Documento Escaneado'.
- Loading Skeleton: The 98% Circular Gauge card can toggle into an animated pulse overlay with circular and line placeholders.
- Success Toast: Floating card at bottom-right in olive #283618 confirming '✓ Comprobante PDF Generado: Listo para descarga o envío por valija'.
- Error Alert: Collapsible banner in #FFDAD6 with title 'Aviso de Infraestructura Contable' and message: 'El servidor de transacciones Payara 7 Micro-Cluster #4 no responde a la validación remota DIAN' with retry button.
```

---

### PROMPT 5 (SCR-05): Formulario Modal Wizard POS por Pasos (`/WEB-INF/formularioVenta.jsp`)

```text
Design a multi-step Modal Wizard for wholesale Point-of-Sale (POS) order dispatch creation at 'Fábrica de Bocadillos La Esperanza', featuring live pricing math, stock validation, and HTTP-session persistence.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Tactile Modal Desk & Ledger Register).
- Colors: Background overlay in warm olive tint (#283618/70), parchment modal body (#FEFAE0), crisp white containers (#FFFFFF), terracotta accents (#BC6C25, #8F4A00), and dark green buttons (#283618).
- Typography: Step headers in 'Playfair Display', calculation metrics in 'JetBrains Mono', dialog labels in 'Inter'.
- Borders & Accents: Double borders (3px double #BC6C25), decorative corner tick accents, and hard drop shadow (6px 6px 0px #121F05).

MODAL WINDOW STRUCTURE & WIZARD FLOW:
1. Modal Backdrop: Dimmed olive-sepia overlay framing the central high-density transaction modal.
2. Window Header:
   - Archival strip: 'MÓDULO TRANSACCIONAL POS // VÉLEZ SANTANDER • FACTURACIÓN MAYORISTA'.
   - Status badge: 'BORRADOR #ORD-2026-9041' and close window button '✕'.
   - Title: 'Nueva Orden de Despacho & Venta Mayorista'.
   - Customer banner: 'Distribuidora Dulces del Fonce S.A.S. (NIT 890.102.948-1 • San Gil, Santander) - Tarifa Especial Distribuidor A+'.
   - Operator label: 'OPERADOR POS: Don Carlos Ruiz (Caja Central)'.
3. 3-Step Wizard Navigation Strip:
   - Step 1: 'PASO 1 [COMPLETADO] Datos del Cliente Mayorista' (green checkmark, strikethrough).
   - Step 2: 'PASO 2 [ACTUAL] Selección de Bocadillos & Stock' (active terracotta highlight, hard shadow).
   - Step 3: 'PASO 3 [PENDIENTE] Confirmación & Facturación' (dashed outline, grayed out).
4. Step 2 Content (2-Column Layout):
   - Left Column (Product Entry & Draft Table):
     * Search bar: Input for bocadillo or lot with presentation dropdown (Lonja Hoja Bijao, Caja Litografiada, Frasco Dulce, Herpo) and '+ Agregar al Pedido' button.
     * Table of Selected Items:
       - Header: 'ÍTEMS EN BORRADOR ACTUAL (2 renglones) • PERSISTENCIA: HTTP-SESSION (PAYARA 7)'.
       - Item 1: BOC-101 | Bocadillo Veleño Lonja Hoja Bijao (Lote #TAN-883 Paila Guavatá) | Interactive Qty Counter [- 20 +] | $18.000 un. -> $360.000 COP | Delete trash icon.
       - Item 2: BOC-106 | Caja Regalo Bocadillo Surtido (Lote #TAN-891 Bodega Central) | Interactive Qty Counter [- 10 +] | $25.000 un. -> $250.000 COP | Delete trash icon.
     * Stock Verification Strip: 'Stock Verificado en Bodega: 450 cajas en existencia (15 cajas restantes para despacho prioritario). REMISIÓN VÉLEZ-04'.
     * Packaging Guarantee: 'Empaque tradicional garantizado: Las lonjas se despachan con hojas de bijao frescas recolectadas de la cuenca del Río Suárez'.
   - Right Column (Live Calculation & Totals Box):
     * Title: 'Liquidación // TURNO PAILA #2'.
     * Subtotal Mercancía (30 Cajas): $610.000 COP.
     * Descuento Mayorista (5% Pronto Pago): -$30.500 COP.
     * Base Gravable Neta: $579.500 COP.
     * IVA Agroindustrial (19%): $110.105 COP.
     * ReteFuente Estimada (2.5%): -$14.487 COP.
     * Grand Total Highlight Box: 'TOTAL NETO A FACTURAR: $725.900 COP', notice '[✓] Crédito aprobado • Plazo de pago: 15 días'.
     * Delivery Conditions Note: Furgón climatizado Fábrica La Esperanza, Ruta Vélez-Barbosa-San Gil.
5. Modal Footer:
   - Left: Button 'Guardar Borrador en Sesión' (diskette icon) and link 'Limpiar Selección'.
   - Right: Button 'Paso Anterior: Datos Cliente' and prominent primary button 'Confirmar y Facturar →'.

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: When draft is cleared, table displays empty box icon, title 'Carrito Vacío: No has agregado ningún lote de bocadillo al borrador', and button '+ Explorar Catálogo de Fábrica'.
- Loading Skeleton: The Liquidación sidebar dynamically replaces figures with animated pulsating lines with text 'Recalculando tarifas DIAN y fletes...'.
- Success Toast: Floating notification at bottom-right in olive #283618 confirming 'Borrador Guardado: Transacción persistida en HttpSession (Payara 7)'.
- Error Alert: Warning strip inside modal stating: '⚠️ Stock Insuficiente: Solo quedan 2 cajas disponibles para Caja Regalo Bocadillo Surtido en la bodega de Vélez (Solicitadas: 10)' with one-click 'Ajustar a 2 Cajas' button.
```

---

### PROMPT 6 (SCR-06): Configuración & Perfil de Usuario (`/WEB-INF/configuracion.jsp`)

```text
Create the System Settings and User Profile Administration screen for 'Fábrica de Bocadillos La Esperanza' with MySQL connection parameters, toggle switches, and Don Carlos Ruiz's master profile.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Archival Registry & Master Controls).
- Color Palette: Parchment #FEFAE0, deep olive #283618, terracotta #BC6C25 / #8F4A00, mustard #DDA15E, sage green #D7E9BD / #546341, crimson #9A031E.
- Typography: Headlines in 'Playfair Display', form fields in 'Inter', cryptographic hashes and JDBC URLs in 'JetBrains Mono'.
- Elevation: Tactile 3px 3px 0px #283618 shadows, double borders (3px double #BC6C25), and inset container styling.

LAYOUT & SECTION BREAKDOWN:
1. Left Navigation Sidebar: Persistent sidebar with 'Ajustes del Sistema' active (highlighted with mustard background and hard shadow).
2. Top Bar: Search field for system logs and audit, notification icon, and primary button 'Guardar Cambios' with disk icon.
3. Page Masthead:
   - Breadcrumb: 'Ajustes del Sistema / Configuración General & Perfil'.
   - Title: 'Configuración del Sistema & Perfil'.
   - Description: 'Administración de credenciales de planta, sincronización con Payara Server 7.x / MySQL y preferencias maestras de Don Carlos Ruiz'.
   - Status Tag: 'NODO: VÉLEZ CENTRAL #1 • ÚLTIMO ACCESO: HOY, 08:15 AM'.
4. Split Settings Grid (3 cols nav / 9 cols content):
   - Left Navigation Panel (3 cols):
     * Menu sections: 'Mi Perfil' (Active with arrow indicator), 'Seguridad & Claves', 'Preferencias Alertas', 'Conexión MySQL & API (3 Endpoints)', 'Facturación de Planta'.
     * Certified Seal Box: 'Denominación de Origen Bocadillo Veleño - Resolución No. 34819 de Calidad Agroartesanal'.
     * Database Health Card: 'PAYARA POOL MYSQL: ESTABLE (Hilos: 22/25 Activos, Latencia: 14ms)'.
   - Right Content Area (9 cols):
     * Section 1: 'SEC // 01-A • Información de Perfil' ([✓] ACTIVO EN TURNO).
       - Avatar Upload Row: Vintage sepia portrait of Don Carlos Ruiz with verified check, title 'Don Carlos Alberto Ruiz Mendoza (Administrador General & Maestro Dulcero - Responsable de pailas desde 1994)', and buttons 'Cambiar Imagen' and 'Eliminar'.
       - 2-Column Form Fields:
         1. Nombre Completo: 'Carlos Alberto Ruiz' (with user icon).
         2. Correo Institucional: 'carlos.ruiz@bocadilloslaesperanza.com' (with mail icon).
         3. Teléfono de Planta: '+57 (607) 756-3210' (with phone icon).
         4. Rol en la Planta: 'Administrador General & Head Admin' (Disabled field with lock icon '[🔒 Rol Asignado por Gerencia]').
         5. Sede Agroindustrial Asignada (Full width): 'Planta Central Vélez - Paila Guavatá #2 (Sector Las Riberas)'.
     * Section 2: 'SEC // 01-B • Preferencias del Sistema & Sincronización' (AUTO-GUARDADO LOCAL).
       - Toggle Switch 1: 'Notificaciones por Correo Electrónico: Recibir alertas automáticas de bajo stock en guayaba regional, mermas de panela y confirmaciones de pago mayorista' (Checked).
       - Toggle Switch 2: 'Sincronización Automática de Stock en MySQL: Reflejar movimientos de kárdex, pesado de cajas en hoja de plátano y lotes cada 5 minutos' (Checked).
       - Dropdown 1: 'Idioma de la Interfaz: Español (Colombia - Vélez)' with helper note 'Incluye terminología típica: paila, bijao, lonja'.
       - Dropdown 2: 'Tema Visual de Pantalla: Retro Vintage Veleño #10 (Activo)' with sample swatch dots (#FEFAE0, #DDA15E, #BC6C25, #283618).
5. Audit Footer Ribbon: 'Registro de Auditoría de Usuario #00192 • Firma Criptográfica Don Carlos Ruiz • [DIAN HABILITADO] • Versión de Software: v4.8.2-bocadillo'.

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: Clicking the 'Conexión MySQL & API' tab reveals an empty state with an archival key illustration, 'No hay claves de API creadas: Genere una credencial de acceso seguro para integrar el software POS o báscula de pesaje', and button '+ Generar Nueva Key'.
- Loading Skeleton: The avatar container toggles into a pulsing wireframe with text 'Subiendo nueva fotografía...'.
- Success Toast: Floating notification at bottom-right in olive #283618: 'Cambios Guardados con Éxito: Preferencias de perfil actualizadas correctamente en Payara 7 & MySQL'.
- Error Alert: Top crimson banner '#FFDAD6' with warning: 'Error de Autenticación de Nodo Local: Error al cambiar la contraseña: La contraseña actual no coincide con los registros del nodo Vélez (Payara AuthRealm v7.4)'.
```

---

### PROMPT 7 (SCR-07): Vista Especializada del Dominio (Consola & Calendario de Despachos `/WEB-INF/calendarioReportes.jsp`)

```text
Build the Specialized Agroindustrial Logistics Console and Dispatch Calendar for 'Fábrica de Bocadillos La Esperanza' (Vélez, Santander) integrating a monthly broadsheet calendar, real-time Payara 7.x event stream, and JasperReports generation cards.

STYLING SPECIFICATIONS:
- Aesthetic: Warm Retro Vintage #10 (Terminal Broadsheet & Vintage Printing Press).
- Colors: Warm parchment #FEFAE0, olive #283618, terracotta #BC6C25, terminal dark background #1B2413 with lime/amber text (#D7E9BD, #FABA75, #FFDCC4).
- Typography: Headers in 'Playfair Display', calendar dates & terminal logs in 'JetBrains Mono', reports in 'Inter'.
- Framing: Double borders (3px double #BC6C25 / #283618), hard shadows 3px 3px 0px #283618, and mechanical click buttons.

CONSOLE STRUCTURE & COMPONENTS:
1. Persistent Left Sidebar: Sidebar with 'Programación de Despachos & Logística' active, Don Carlos Ruiz profile, and company seal.
2. Top Bar: Search input for dispatches/Payara log, alert bell, and primary button '+ Programar Despacho'.
3. Console Header & Date Filter:
   - Header: 'LOGÍSTICA DE PLANTA / CONTROL DE DESPACHOS VELEÑOS § 05 • NODO: VÉLEZ CENTRAL #1 • SINCRONIZADO 12:44 PM'.
   - Title: 'Consola de Programación de Despachos & Reportes en Vivo'.
   - Description: 'Planificación de rutas de entrega interdepartamentales, acopio de guayaba regional de Vélez y monitoreo de eventos en Payara Server 7.x'.
   - Date Picker Pill: '01 Sept, 2026 - 30 Sept, 2026' with export buttons 'Exportar PDF' and 'Exportar CSV'.
4. Split 2-Column Grid (7 cols Calendar / 5 cols Live Console & Reports):
   - Left Column (7 cols):
     * Monthly Broadsheet Calendar (Septiembre 2026):
       - Toolbar with previous/next month buttons and filter tags: 'Todos (14)', 'Despachos (8)', 'Acopio Fruta (4)', 'Hitos (2)'.
       - 7-Column Weekday Grid: Lun, Mar, Mié, Jue, Vie, Sáb, Dom.
       - Key Populated Days:
         • Vie 04: Despacho Chicamocha (320 Cajas).
         • Lun 14 [HOY]: Highlighted active cell with thick olive border: '📦 Lote #884 Dulces Fonce (100 Cajas • TR-7729)'.
         • Vie 18: Acopio de Guayaba Finca El Paraíso (5 Toneladas • Paila #2).
         • Mar 22: Cierre Mensual Bijao & Kárdex.
         • Lun 28: Despacho Almacenes El Cóndor (1,200 Cajas - Tunja).
     * Selected Day Detail Drawer: 'JORNADA EN CURSO: LUNES 14 DE SEPTIEMBRE [EN RUTA] • DOC: REMISIÓN #REM-2026-0914' with Destinatario (Dulces del Fonce Ltda.), Carga (100 Cajas de Cartón Veleño), and Conductor (Héctor Fabio Celis, Placa TR-7729).
     * Logistics Metric Strip: 3 cards: 'Pulpa Procesada Hoy: 4.200 Kg (75° Brix)', 'Cajas Despachadas: 1.620 / 1.800 Meta', and 'Eficiencia en Ruta: 98.4% En Horario'.
   - Right Column (5 cols):
     * Section 1: Real-Time Payara 7.x Event Stream Console:
       - Header: Traffic light dots (red, yellow, pulsing green), title 'CONSOLA_EVENTOS // PAYARA 7.x & MYSQL', and badge 'STREAM ACTIVO'.
       - Terminal Body (Dark Olive #1B2413):
         • [12:42:10] SYS_OK: Sincronización de stock completada en MySQL (Latencia: 14ms).
         • [12:44:05] VENTA_NEW: Venta #FACT-8942 registrada por $1.850.000 COP.
         • [12:45:18] KARDEX: Reserva de 100 cajas Lote #TAN-883 para Dulces del Fonce.
         • [12:48:30] LOGISTICA: Camión TermoKing placa WTL-492 asignado a Ruta Bucaramanga.
         • [12:50:02] BATCH_CRON: Molienda de guayaba a 75° Brix verificada en Paila Central.
       - Terminal Controls: 'Payara 7.2026.3 JDK 17 LTS', button 'Limpiar Log', and button 'Pausar Stream'.
     * Section 2: Fast JasperReports Generator Cards:
       - Card 1: DOC // LOGÍSTICA-01 'Reporte de Cumplimiento de Entregas' with 'Generar PDF' button.
       - Card 2: DOC // FISCAL-09 'Resumen Transaccional de Ventas Veleñas' with 'Generar PDF' button.
       - Card 3: DOC // INSUMOS-04 'Kárdex de Materia Prima & Bijao' with 'Exportar CSV' button.
     * Operator Signature Footer: Avatar of Don Carlos Ruiz, title 'V° B° Don Carlos Ruiz (Director de Planta & Operaciones)', and badge 'FIRMA ACTIVA • CERT: VELEZ-1968'.

MANDATED 4 UI STATES SPECIFICATION:
- Empty State: Clicking an empty day replaces the calendar with a vintage illustration 'Sin despachos ni eventos programados para esta fecha: El libro mayor no tiene rutas asignadas' with button '+ Programar Evento en este Día'.
- Loading Skeleton: The terminal window can toggle into an animated pulse state simulating raw socket connection to Payara 7.
- Success Toast: Floating notification at bottom-right in olive #283618: '✓ Reporte Cumplimiento_Despachos_Sept2026.pdf generado con éxito'.
- Error Alert: High-priority crimson banner in #FFDAD6 with title 'Fallo de Comunicación con el Servidor Payara 7.x' and message: 'No se pudo compilar el archivo JasperReports en el nodo remoto core-payara7-velez.prod' with retry button.
```

---

## 3. Protocolo de Prototipado para el Aprendiz en Google Stitch

Para materializar esta suite completa en la herramienta oficial de diseño visual `stitch.withgoogle.com`, sigue rigurosamente este protocolo secuencial paso a paso:

1. **Creación del Proyecto Inicial:**
   - Ingresa a `stitch.withgoogle.com` con tu cuenta autorizada.
   - Crea un nuevo proyecto y nómbralo: `Fábrica de Bocadillos La Esperanza - Sistema Agroindustrial`.
   - Asegúrate de que el lienzo base esté configurado en tema Claro con fondo pergamino `#FEFAE0`.

2. **Generación de la Primera Pantalla (SCR-01):**
   - En la barra de prompts principal de Google Stitch, copia y pega íntegramente el texto del bloque **PROMPT 1 (SCR-01)**.
   - Presiona `Generate` (Generar) y espera a que Stitch ensamble la tipografía `Playfair Display`, los botones terracota con sombra dura `3px 3px 0px #283618` y el banner ilustrado de guayaba.
   - Renombra la pantalla generada en el panel de capas como: `SCR-01_Autenticacion`.

3. **Adición Progresiva de Pantallas (`+ Add Screen`):**
   - Haz clic en el botón superior derecho `+ Add Screen` (Añadir Pantalla) para crear el siguiente lienzo en blanco dentro del mismo proyecto.
   - Pega el bloque de texto correspondiente:
     * Para la segunda pantalla, usa **PROMPT 2 (SCR-02)** -> Renombrar: `SCR-02_Dashboard`.
     * Clic en `+ Add Screen` -> Pega **PROMPT 3 (SCR-03)** -> Renombrar: `SCR-03_CatalogoProductos`.
     * Clic en `+ Add Screen` -> Pega **PROMPT 4 (SCR-04)** -> Renombrar: `SCR-04_DetalleVenta_360`.
     * Clic en `+ Add Screen` -> Pega **PROMPT 5 (SCR-05)** -> Renombrar: `SCR-05_ModalWizardPOS`.
     * Clic en `+ Add Screen` -> Pega **PROMPT 6 (SCR-06)** -> Renombrar: `SCR-06_ConfiguracionPerfil`.
     * Clic en `+ Add Screen` -> Pega **PROMPT 7 (SCR-07)** -> Renombrar: `SCR-07_CalendarioConsola`.

4. **Verificación de los 4 Estados UI en Cada Pantalla:**
   - Selecciona cada pantalla y verifica que contenga:
     a) El componente de **Empty State** (con ilustración contextualizada y botón de retorno).
     b) La estructura de **Loading Skeleton** (marcos pulsantes o barras simuladas).
     c) El **Success Toast** flotante anclado en la esquina inferior derecha.
     d) El **Error Alert Banner** en rojo carmín `#9A031E` / `#FFDAD6`.

5. **Enlace Interactivo de Flujos (Prototyping Connections):**
   - Conecta el botón `Ingresar al Sistema` de `SCR-01` hacia `SCR-02_Dashboard` con transición *Push Right*.
   - Conecta el ítem `Catálogo de Bocadillos` del sidebar de `SCR-02` hacia `SCR-03_CatalogoProductos`.
   - Conecta el botón `[Remisión]` de la tabla en `SCR-02` hacia `SCR-04_DetalleVenta_360`.
   - Conecta el botón `+ Nueva Transacción` o `+ Nuevo Registro` hacia `SCR-05_ModalWizardPOS` en modo *Open Overlay*.
   - Conecta el ítem `Ajustes del Sistema` del sidebar hacia `SCR-06_ConfiguracionPerfil`.
   - Conecta el ítem `Programación de Despachos & Logística` hacia `SCR-07_CalendarioConsola`.
   - Enlaza los botones de `Cerrar Sesión` de vuelta a `SCR-01_Autenticacion`.

6. **Revisión de Fidelidad y Exportación:**
   - Realiza un recorrido interactivo completo en modo `Preview`.
   - Comprueba que los datos reales de Vélez, Guavatá, Don Carlos Ruiz, Payara 7 y MySQL se mantengan intactos sin desviaciones a plantillas genéricas de software.
