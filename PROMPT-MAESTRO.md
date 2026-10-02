# Prompt maestro — Menú QR reutilizable

Actúa como diseñador de producto y desarrollador web. Construye, prueba y publica un menú QR profesional para un restaurante ficticio de sushi llamado Nami Sushi. Entrega una base que pueda adaptarse a otros restaurantes sin rehacer la interfaz. Ejecuta el trabajo hasta obtener una URL pública comprobada; no te detengas en una propuesta.

## Contexto y alcance

Trabaja en el proyecto actual. Revisa sus instrucciones y archivos antes de editar; conserva cambios ajenos. Para esta demostración está autorizado crear un repositorio público llamado `menu-qr-base` en la cuenta personal de GitHub autenticada y publicarlo en GitHub Pages. Si el repositorio ya existe, inspecciónalo antes de reutilizarlo. No reemplaces otro proyecto ni cambies la visibilidad de un repositorio existente sin autorización.

El negocio, sus productos y precios son ficticios. Usa español de México y MXN. Identifica claramente la página como demostración. No inventes domicilios, teléfonos, reseñas, premios, horarios operativos ni negocios asociados. No conectes personas reales, no recibas pagos ni envíes mensajes o pedidos.

## Skills y recursos

Consulta las skills realmente disponibles y lee sus instrucciones originales antes de aplicarlas. No inventes skills ni confundas una referencia guardada con una instalación.

- Usa `imagegen` para crear las fotografías ilustrativas necesarias. Conserva los archivos en el proyecto, registra los prompts y señala que las imágenes son ilustrativas.
- Usa `vercel:agent-browser` y `vercel:agent-browser-verify` para comprobar el servidor y la página publicada en un navegador. Su uso no implica desplegar en Vercel. Si esa herramienta no está disponible, utiliza el navegador de pruebas disponible y documenta la sustitución.
- Aplica `vercel:verification` a los recorridos reales de este sitio estático: contenido → interfaz → filtros → ficha → URL pública y QR. No añadas APIs o infraestructura para satisfacer un esquema genérico.
- Si está accesible la biblioteca local de prompts, utiliza P01, “Web y software: del brief a una entrega verificada”, como estructura de ejecución. Es una referencia documental, no una skill instalada.
- Usa skills de documentos o PDF solamente si necesitas esos formatos. No instales servicios o plugins innecesarios.

## Producto y diseño

Crea una identidad original, sobria y cálida: fondo marfil, tinta casi negra, acento coral y fotografía gastronómica con iluminación natural. Prioriza legibilidad, apetito y facilidad de consulta. Usa una marca tipográfica con un símbolo sencillo, composición cuidada, espacios amplios y microinteracciones discretas. Evita una portada tan grande que oculte el acceso al menú en el celular.

La experiencia principal debe permitir abrir el QR, entender la marca, elegir categoría, buscar un platillo, revisar ingredientes y precio, y volver al menú sin perder contexto. Incluye:

- Menú completo con al menos 30 productos: entradas, rollos, nigiri y sashimi, bowls, bebidas y postres.
- Nombres y recetas coherentes; descripciones breves, porciones y precios ficticios plausibles. Identifica las porciones de rollos, nigiri, sashimi y bebidas.
- Tres o cuatro productos destacados y fotografías pertinentes. Los productos sin fotografía deben tener una presentación deliberada y elegante, sin imágenes rotas o repetidas sin relación.
- Categorías navegables, búsqueda tolerante a mayúsculas y acentos, filtro vegetariano y restablecimiento de filtros. Muestra un estado comprensible cuando no haya coincidencias.
- Fichas accesibles con descripción, porción, ingredientes, nivel de picante, condición crudo/cocido cuando corresponda, y alérgenos declarados de la receta de ejemplo. No prometas ausencia de contaminación cruzada.
- Estado “Agotado” gobernado por datos, sin eliminar accidentalmente el producto. El estado es de demostración, no inventario en tiempo real.
- Una página para consultar y descargar el QR y una tarjeta imprimible con marca, dirección legible y aviso de demo.
- Aviso: “Demostración · Negocio, imágenes y precios de ejemplo”.

No implementes pagos, carrito, cuenta de usuario, panel falso ni botones que simulen pedidos. Deja el contacto opcional preparado en la configuración y oculto si no existe un dato confirmado. No publiques una dirección de ejemplo con apariencia de dirección operativa.

## Base técnica y mantenimiento

Si el proyecto está vacío, usa Astro estático, TypeScript y CSS. Elige versiones estables compatibles y fija las dependencias con un archivo de bloqueo. Usa JavaScript solo donde aporta interacción; el listado y los precios deben seguir legibles sin JavaScript. No añadas backend, base de datos ni dependencias grandes sin necesidad.

Separa al menos:

- Datos del negocio: nombre, idioma, moneda, descripción, URL pública, condición de demo y contacto opcional.
- Categorías y productos: identificadores estables, orden, nombre, descripción, porción, precio numérico, ingredientes, etiquetas, alérgenos, imagen opcional y disponibilidad.
- Tema: colores, tipografías y estilos reutilizables.
- Componentes visuales, lógica de filtros y validación de contenido.

Usa JSON fácil de editar y validación que detecte IDs repetidos, precios negativos, categorías inexistentes y campos obligatorios. Centraliza la moneda y las rutas para evitar referencias rotas cuando cambie el nombre del repositorio. El mismo contenido debe alimentar tarjetas, fichas y búsqueda.

Documenta cómo editar un precio, añadir un platillo, cambiar una foto, marcar agotado y crear otro menú desde esta base. Explica que los cambios se publican al guardar un commit y completar el despliegue; no prometas un administrador visual. Comprueba temporalmente una segunda identidad para demostrar que la marca no está dispersa por el código, y restablece Nami antes de publicar. Deja un ejemplo mínimo de contenido alternativo sin crear otra publicación.

## GitHub, publicación y QR

Verifica la cuenta autenticada y la disponibilidad del repositorio. Revisa lo que se va a publicar; excluye secretos, archivos personales, dependencias instaladas y evidencias temporales. Configura GitHub Actions para comprobar y publicar la rama principal; utiliza permisos mínimos y versiones verificadas de las acciones oficiales.

Configura correctamente el origen y la subruta de GitHub Pages. Comprueba CSS, imágenes, fuentes, navegación y recarga directa en la URL con el nombre del repositorio. Espera el resultado del despliegue y revisa la página pública antes de afirmar que está publicada.

Marca el repositorio nuevo como plantilla reutilizable si los permisos lo permiten. No añadas una licencia de redistribución comercial en nombre del propietario sin que este la elija; documenta la procedencia de los recursos de terceros.

Genera el QR mediante una biblioteca específica para QR, nunca mediante generación de imágenes. Su contenido debe ser exactamente la URL HTTPS final comprobada, sin acortadores de pago ni intermediarios. Entrega SVG y PNG, con contraste alto y margen de seguridad. Decodifica el PNG con una herramienta independiente y compara el resultado con la URL publicada. No declares haber realizado un escaneo físico si solo hiciste validación digital.

Explica que el QR seguirá sirviendo cuando cambien productos y precios mientras se conserve la dirección. Cambiar de dominio o repositorio requiere conservar una redirección controlada o reimprimir el código. Un QR estático no garantiza disponibilidad perpetua.

GitHub Pages se usa aquí para el prototipo demostrativo. Antes de implantar esta base como servicio comercial, revisa las condiciones vigentes del alojamiento y elige uno compatible con la operación real. Mantén la exportación estática portable.

## Verificación y entrega

Comprueba móvil estrecho, móvil habitual, tableta y escritorio; legibilidad con zoom, teclado, foco visible, cierre de fichas con Escape y retorno del foco. Respeta movimiento reducido. Evita desplazamiento horizontal y controles que cubran el contenido. Usa metadatos adecuados y `noindex` para esta demostración.

Prueba búsqueda, categorías, combinación de filtros, ausencia de resultados, ficha, agotados, imágenes, enlaces y QR. Revisa la consola y respuestas fallidas. Ejecuta validación de datos, tipos, compilación y pruebas de los recorridos importantes. Guarda capturas y un registro breve con resultados reales. Corrige los fallos encontrados sin inventar puntuaciones o pruebas.

Entrega:

1. URL pública de GitHub Pages y enlace al repositorio.
2. Este prompt guardado y los archivos editables.
3. QR SVG, PNG y tarjeta imprimible.
4. README y guía en español para modificar y duplicar el menú.
5. Fuentes y prompts de imágenes, registro de verificación y limitaciones concretas.

Avanza de forma autónoma con decisiones reversibles. Si un acceso necesario está bloqueado, completa lo que no dependa de él e informa exactamente qué falta. No marques la publicación o una prueba como completada sin evidencia.
