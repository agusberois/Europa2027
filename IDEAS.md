# Ideas de funcionalidades — Europa2027

Lista de ideas para ir analizando una por una. Estado: 💡 pendiente · 🔍 en análisis · ✅ implementado · ❌ descartado

---

## Diario y contenido propio

### 💡 Notas de diario por día
Texto libre por día (además del checklist de actividades) para anotar qué pasó, anécdotas, qué comieron.
**Notas:**

### 💡 Subida de fotos desde el celular
Reemplazar/complementar `photos.js` (estático) con subida in situ desde el móvil.
**Notas:**

### 💡 Registro de gastos
Gastos por ciudad/categoría (comida, transporte, alojamiento, souvenirs), con total y conversión EUR↔UYU.
**Notas:**

### 💡 Packing list / checklist de equipaje
Lista de qué llevar, separada de las actividades diarias.
**Notas:**

---

## Utilidad durante el viaje

### ✅ Mapa interactivo de la ruta
Usar `coordinates.js` con Leaflet (u otra lib) para ver la ruta completa y la ciudad actual.
**Notas:** Implementado con Leaflet + tiles de OpenStreetMap. Marcadores con el emoji de bandera por ciudad (agrupando visitas repetidas, ej. Madrid), línea punteada conectando las paradas en orden real del itinerario, y popup con país + fechas + link a `/destino/:slug`. Vive en `/herramientas/mapa`, accesible desde Herramientas.

### ✅ Amanecer/atardecer por ciudad
Especialmente relevante en Rovaniemi en enero, con pocas horas de luz.
**Notas:** Implementado usando `sunrise`/`sunset` de Open-Meteo (ya se pedía `daily=...` en `useWeather`). Se muestra en `CityDetail` (header, junto al clima) y en el Dashboard (card "Estás en" durante el viaje).

### ✅ Pronóstico de aurora boreal a futuro
Hoy solo se muestra el Kp actual; agregar predicción de próximas noches.
**Notas:** Implementado con `noaa-planetary-k-index-forecast.json` (en vez del endpoint de solo el índice actual). Da hoy + los días futuros que la API alcance a pronosticar (normalmente 2 días completos y un tercero parcial); se agregó un `<select>` en `AuroraStatus` para elegir el día, mostrando el Kp máximo de ese día y si es dato observado/estimado o pronóstico.

### 💡 Info de vuelos/trenes con horario
Número de vuelo/tren, horario, countdown a la próxima salida.
**Notas:**

### 💡 PWA instalable + soporte offline
Instalar en el celular y que funcione sin conexión (útil viajando fuera del país).
**Notas:**

### ✅ Qué ponerte hoy (recomendador de abrigo)
Traducir la temperatura de cada ciudad en una recomendación de ropa concreta, dado el rango de +25°C (Montevideo) a -20°C (Rovaniemi) del viaje.
**Notas:** Implementado reutilizando `useWeather` (sin API nueva). Bandas de temperatura con consejo de abrigo (`data/clothingAdvice.js`) + aviso de lluvia/nieve según el `weather_code`. Muestra todas las ciudades del itinerario a la vez. Vive en `/herramientas/abrigo`.

### ✅ Frases básicas / mini traductor
Frases útiles por idioma (húngaro y finlandés no son triviales).
**Notas:** Implementado como lista estática (15 frases por idioma: saludos, cortesía, sí/no, "no entiendo", "¿hablás inglés?", precio, baño, cuenta, brindis, adiós) para alemán (Austria), húngaro, checo y finés — se excluyó español porque ya lo hablamos. Selector por pestañas con bandera. Cada frase muestra cómo se escribe y una pronunciación aproximada (transcripta con ortografía del español, marcada como "aproximada" ya que no es fonética IPA). Vive en `/herramientas/frases`, accesible desde Herramientas.

### ✅ Conversor de moneda en vivo
EUR ↔ UYU (y otras monedas locales si aplica) con tasa actualizada.
**Notas:** Implementado con las 4 monedas del viaje (UYU, EUR, HUF, CZK) usando la API gratuita open.er-api.com (base UYU, sin API key). Permite elegir moneda de origen e ingresar un monto; muestra la conversión a las otras 3 en vivo. Vive en `/herramientas/conversor`, accesible desde un botón "Herramientas" en el Dashboard → `/herramientas` → conversor. Pensado como la primera de varias herramientas futuras en esa sección.

### 💡 Info práctica por país
Enchufes/voltaje, SIM/datos, emergencias, seguro de viaje.
**Notas:**

### 💡 Exportar itinerario a calendario
Generar .ics o integración con Google Calendar para las fechas/ciudades.
**Notas:**

### 💡 Notificaciones/recordatorios
Aviso del próximo transporte o actividad del día (browser notifications).
**Notas:**

### ✅ Reloj mundial
Hora actual de cada ciudad del itinerario comparada con Montevideo.
**Notas:** Implementado con `Intl.DateTimeFormat` y zonas horarias IANA (`data/timezones.js`), sin API externa. Actualiza cada segundo y marca "ayer/mañana" cuando el día calendario difiere del de Montevideo. Vive en `/herramientas/reloj`.

### ✅ Calculadora de propinas
Cuánto dejar de propina según el país, con costumbres que varían mucho en el itinerario.
**Notas:** Implementado con guía de costumbres por país (`data/tipping.js`: España, Hungría, Austria, Chequia, Finlandia) con % sugerido que se autocompleta al elegir país, y cálculo de propina/total/por persona. Vive en `/herramientas/propinas`.

---

## Checklist pre-viaje

### 💡 Sección de preparativos
Pasaporte, seguro, reservas, equipaje — checklist separado de las actividades in-situ.
**Notas:**

---

## Compartir con familia

### 💡 Vista pública de solo lectura
Link para que la familia siga el viaje sin poder editar nada.
**Notas:**

### 💡 Compartir ubicación en vivo (opcional)
Considerar bien el tema privacidad antes de avanzar.
**Notas:**

---

## Gamificación / stats

### 💡 Contador de distancia recorrida
Km totales del itinerario, calculado desde `coordinates.js`.
**Notas:**

### 💡 Bucket list vs. completado
Marcar actividades "imprescindibles" y trackear cuántas se cumplieron.
**Notas:**

---

## Cierre del viaje / recuerdos

### 💡 Recap final
Pantalla resumen al volver: países, ciudades, noches, fotos destacadas, gastos totales.
**Notas:**
