# SelectoTech · Portal de Comisiones

Landing page interactiva para el equipo de ventas de **SelectoTech**.

## Qué incluye

- **Calculadora de comisiones (20% por defecto, ajustable)** con vistas por día, semana y mes, y proyecciones automáticas semanal / mensual / anual.
- **Metas con bonos**: muestra el progreso visual de las ventas del mes y desbloquea niveles (Vendedor activo, Top performer, Élite, Leyenda).
- **Asistente de respuestas a clientes**: pega el mensaje del cliente y obtén una respuesta sugerida (precio, envío, garantía, descuento, pagos, queja, factura, horario, stock, saludo o combinación de varios).
- **Guiones rápidos** listos para WhatsApp, llamada o tienda.
- **Animación de billetes cayendo** sobre toda la página, con un botón "¡Hacer llover billetes!" que dispara una lluvia extra.
- Tipografías llamativas (`Bebas Neue`, `Russo One`, `Montserrat`) y paleta inspirada en el logo de SelectoTech.

## Cómo abrirla

Es una página estática 100% en el navegador. Basta con abrir `index.html` o servirla con cualquier servidor estático:

```bash
# Opción 1: doble click sobre index.html

# Opción 2: servidor simple con Python
python3 -m http.server 8080
# Luego abre http://localhost:8080
```

No requiere build, dependencias ni claves API.

## Archivos

- `index.html` – estructura de la landing.
- `styles.css` – estilos, tipografías y animaciones.
- `script.js` – calculadora, metas, asistente y lluvia de billetes en canvas.
