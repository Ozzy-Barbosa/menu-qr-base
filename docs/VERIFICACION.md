# Registro de verificación

Fecha de trabajo: 1 de octubre de 2026 (America/Mazatlan).

## Alcance

Prototipo estático de un restaurante ficticio. Los recorridos revisados son: abrir el menú, explorar categorías, buscar, combinar filtro vegetariano, consultar ficha, volver a la carta y descargar el QR. No existen pruebas de pedidos ni pagos porque esas funciones no están implementadas.

## Evidencia local

- Validación de contenido: 30 productos y seis categorías.
- Cinco pruebas automatizadas de lógica: búsqueda sin acentos, ingredientes, filtros combinados, conservación de agotados y rechazo de datos incorrectos.
- Seis recorridos automatizados en Chromium: carta y recursos; búsqueda/filtros/estado vacío; ficha/teclado/foco; anchuras de 320, 390, 768 y 1440 px; consulta sin JavaScript; página QR y presentación de impresión.
- La prueba de ampliación usa zoom CSS de 200% desde una ventana de escritorio de 1280 px. No equivale a una prueba física de zoom en cada navegador móvil.
- Auditoría automatizada axe de la página principal, una ficha abierta y la página QR, con etiquetas WCAG 2 A/AA y 2.1 AA. No constituye una certificación de accesibilidad ni una auditoría manual completa.
- Contraste del agotado y ciclo de foco del diálogo corregidos tras detectar fallos en la primera ejecución.
- Fotografías y vista de escritorio/celular inspeccionadas visualmente.
- QR PNG de 1200 × 1200, margen de cuatro módulos y corrección M, decodificado con jsQR. El resultado coincide con `business.url`.

Las capturas y reportes de Playwright se guardan localmente en `evidence/` y se excluyen del repositorio. Las pruebas se ejecutan de nuevo antes de cada publicación automática.

## Publicación y reutilización

La comprobación de reutilización usa los datos de `examples/cafe/`, compila una marca, carta y subruta diferentes, y restaura los archivos originales. Su script verifica el nuevo contenido y la conservación de precios con decimales.

El estado definitivo del despliegue se registra al terminar la revisión pública. Consulta también el historial de Actions en el repositorio.

## Límites prácticos

- Pruebas automatizadas en Chromium; no se verificó físicamente Safari/iPhone o Android.
- QR decodificado digitalmente; falta el escaneo de una impresión real en el tamaño y material elegidos.
- Sin prueba de carga ni promesas de disponibilidad o ventas.
- Edición mediante archivos y nueva publicación; sin administrador visual ni inventario en tiempo real.
- Demo con `noindex`. Negocio, imágenes, recetas, precios y disponibilidad de ejemplo.
- El uso comercial futuro requiere contenido validado y alojamiento compatible con sus condiciones vigentes.
