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

La prueba de la cafetería terminó correctamente: otra marca, otro tema, otra subruta, tres productos y un precio con decimales. Nami y su compilación quedaron restaurados. La última compilación devolvió cero errores, cero advertencias y cero sugerencias de tipos.

**Publicación confirmada:** [Nami en GitHub Pages](https://ozzy-barbosa.github.io/menu-qr-base/). [Ejecución de publicación completada correctamente](https://github.com/Ozzy-Barbosa/menu-qr-base/actions/runs/36957009558). Commit del sitio desplegado: `2706a3717719801d0eec048bc39d72e60ad3f8d8`.

Se repitieron los seis recorridos de navegador contra la URL pública: seis aprobados. No se detectaron errores de consola ni respuestas fallidas en la revisión de recursos de la página. La auditoría axe no reportó infracciones dentro de las reglas y páginas comprobadas.

El menú público contiene exactamente las mismas 30 fichas y seis categorías que los JSON locales. Se descargó el PNG desde la página pública y jsQR decodificó exactamente `https://ozzy-barbosa.github.io/menu-qr-base/`.

La huella SHA-256 del HTML público coincide con la exportación estática local: `45bfae02e1297d884411bfe85b8964bcfa100e7f523e06b086c5c09c9e3ca31c`. [Registro de comparación pública](evidence/public-verification.json). Estas comprobaciones documentan esta versión; cambios posteriores requieren ejecutar de nuevo las pruebas pertinentes.

## Actualización: fotografía en los 30 productos

- Se añadieron 27 originales generados con imagegen y se conservaron las tres imágenes iniciales.
- Los 30 productos muestran una miniatura WebP de 240 × 240 y una fotografía ampliada de 600 px en la ficha. La imagen principal mantiene su versión de 1200 px.
- Compilación y contrato de contenido correctos; cero errores, advertencias o sugerencias de tipos. Cinco pruebas de lógica aprobadas.
- Siete pruebas de navegador aprobadas localmente, incluida la apertura y decodificación de las 30 fotografías ampliadas. También se verifica la carga de todas las miniaturas, incluso fuera de pantalla.
- Revisión visual de la carta de bebidas en celular, la ficha de matcha latte y la carta de rollos en escritorio. Sin desbordamientos detectados a 320, 390, 768 y 1440 px.
- Miniaturas de aproximadamente 6 a 14 KB, con carga diferida. Imágenes de las fichas de aproximadamente 28 a 55 KB, solicitadas al abrir cada ficha (las tres destacadas también aparecen en la portada).
- Prompts y asociación entre producto y archivo documentados en `image-prompts-products.json`.

## Límites prácticos de la verificación

- Pruebas automatizadas en Chromium; no se verificó físicamente Safari/iPhone o Android.
- QR decodificado digitalmente; falta el escaneo de una impresión real en el tamaño y material elegidos.
- Sin prueba de carga ni promesas de disponibilidad o ventas.
- Edición mediante archivos y nueva publicación; sin administrador visual ni inventario en tiempo real.
- Demo con `noindex`. Negocio, imágenes, recetas, precios y disponibilidad de ejemplo.
- El uso comercial futuro requiere contenido validado y alojamiento compatible con sus condiciones vigentes.
