# Imágenes y recursos

Las 30 fotografías de esta demostración se crearon con la herramienta integrada `imagegen`. Son ilustraciones de recetas ficticias, no fotografías de un restaurante operativo. Los originales seleccionados se guardan en `src/assets/`. Astro genera derivados WebP optimizados: miniaturas de 240 × 240 píxeles, fichas de 600 píxeles de ancho y una imagen principal de 1200 píxeles. Las miniaturas cargan conforme el usuario recorre la carta; la foto de la ficha se solicita al abrir el producto.

Los prompts individuales de las 27 fotografías añadidas para completar la carta constan en [image-prompts-products.json](./image-prompts-products.json), junto con el identificador de producto, archivo y texto alternativo. Las tres fotografías iniciales se documentan a continuación. Para sustituir una imagen, reemplaza su original en `src/assets/` o cambia los campos `image` e `imageAlt` del producto en `src/data/menu.json`; la compilación vuelve a generar los tamaños optimizados. La plantilla también admite productos sin imagen.

## Prompts utilizados

### nami-roll.png
Use case: photorealistic-natural. Asset type: editorial food photography for a fictional Japanese restaurant menu. A refined appetizing plate of eight salmon sushi rolls, filled with salmon, avocado and cucumber, topped with thin salmon slices and a scattering of toasted sesame, a little ponzu glaze. Handmade warm ivory ceramic plate on a dark charcoal olive stone tabletop. A small ceramic soy dish and dark chopsticks subtly at the edge. Shot close-up from 45 degrees, natural directional daylight from the upper left, authentic rice texture, realistic fresh salmon, warm fine-grain editorial photography, quiet Japanese restaurant atmosphere. Landscape 3:2 composition, the plate centered and complete, food occupying most of the image, no people, no text, no lettering, no logos, no watermark, no neon colors. This is an illustrative image for a fictional restaurant.

### gyozas.png
Use case: photorealistic-natural. Asset type: food photo for a fictional Japanese restaurant menu. Five beautiful pan-seared pork and cabbage gyoza dumplings with a golden crispy skirt, finely sliced scallions and a tiny dark ceramic ponzu dipping bowl, served on a handmade warm ivory plate on a muted charcoal olive stone table. Close-up 45 degree view, natural side daylight, warm authentic editorial food photography, real textures, thoughtful minimal styling. Landscape 3:2 composition with complete plate centered, no people, no text, no watermark. Illustrative fictional dish.

### matcha.png
Use case: photorealistic-natural. Asset type: dessert photography for a fictional Japanese restaurant menu. One elegant triangular slice of pale green matcha cheesecake with a fine golden biscuit base, a light dusting of vivid matcha powder and a small off-white cream dollop beside it, on a handmade warm ivory ceramic plate over a muted charcoal olive stone table. A small brass dessert fork near the plate. Natural soft side daylight, warm editorial photography, realistic creamy texture, quiet restrained Japanese cafe atmosphere. Landscape 3:2 framing, centered plate, no people, no text, no lettering, no watermark. Illustrative fictional dessert.

## Tipografía e iconos

- Manrope e Instrument Serif: paquetes de Fontsource, autoalojados. Consulta los archivos de licencia OFL incluidos en los paquetes instalados y `THIRD-PARTY-NOTICES.md`.
- Símbolo de ola e iconos: SVG creados para esta interfaz; no representan una marca registrada o verificada.
- QR: generado de forma determinista con `qrcode`, no por IA. Validado con `jsQR`.
