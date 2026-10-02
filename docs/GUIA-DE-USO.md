# Cambiar y reutilizar el menú

## 1. Cambiar un precio

Abre `src/data/menu.json`, localiza el producto por su `id` y cambia `price`. Es un número, sin símbolo de moneda: `195` o `195.50`. Se respetan hasta dos decimales. La moneda se define una sola vez en `business.json`.

Guarda, ejecuta `npm run build` y revisa la vista previa. Confirma y sube el cambio a `main`. Espera la comprobación y el despliegue en Actions. Abre el menú publicado; el QR conserva la misma dirección.

## 2. Añadir o quitar un producto

Copia un producto del JSON y cambia su identificador por uno único con minúsculas y guiones. Mantén estos campos:

```json
{
  "id": "nuevo-platillo",
  "category": "entradas",
  "name": "Nombre confirmado",
  "description": "Descripción breve de la receta.",
  "portion": "Porción confirmada",
  "price": 100,
  "ingredients": ["Ingrediente confirmado"],
  "allergens": [],
  "vegetarian": false,
  "spicy": 0,
  "raw": false,
  "available": true
}
```

Este fragmento solo ilustra el formato; sustitúyelo por datos verificados del negocio. `allergens: []` significa que no se declararon alérgenos en el archivo, no que se certifique su ausencia. Valida también salsas, aderezos y productos procesados con el responsable de cocina.

`category` debe coincidir con una categoría existente. El orden de las listas determina el orden de presentación. `spicy` admite 0, 1, 2 o 3: sin picante, toque picante o picante para 2/3. `raw` indica pescado sin cocción en este demo. Ajusta la redacción si adaptas la base a otro tipo de crudo.

Para retirar un producto, borra su objeto completo cuidando las comas. Si era el producto de portada, cambia también `hero.productId`. No borres todos los productos.

## 3. Agotados e imágenes

- Cambia `available` a `false` para mostrar “Agotado”. Es una edición manual; no hay control de existencias en vivo.
- Coloca una fotografía autorizada en `src/assets/`, por ejemplo `nuevo-platillo.webp`.
- Añade `"image": "images/nuevo-platillo.webp"` y `"imageAlt": "Descripción breve de lo que se ve"` al producto. `images/` es la clave lógica; el archivo físico va en `src/assets/`.
- Para destacar un producto añade `"featured": true`. Los destacados requieren foto. Puedes tener uno, varios o ninguno.
- Evita usar una fotografía de un platillo diferente. Conserva licencias y atribuciones de material de terceros. Al pasar a un negocio real, sustituye estas imágenes por fotos propias o autorizadas.

## 4. Marca, contacto y apariencia

En `src/data/business.json` cambia `name`, `descriptor`, `headline`, `description`, `hero`, `locale`, `currency` y `theme`. El tema tiene cuatro colores hexadecimales de seis dígitos. Las tipografías se importan en `src/layouts/Layout.astro`; el resto de los estilos está en `src/styles/global.css`.

`hero.productId` abre la ficha de un producto existente. Puede omitirse: el botón llevará entonces al menú. `hero.image` y su texto alternativo son obligatorios.

`contact.phone`, `contact.address` y `contact.hours` están en `null` y permanecen ocultos. Solo publica valores confirmados. El teléfono usa formato internacional con `+` y dígitos; el enlace abre la función de llamada, no envía mensajes ni pedidos.

Para un negocio real: valida ingredientes, alérgenos, porciones, precios, impuestos aplicables, contactos, disponibilidad y permisos de imágenes; después cambia `demo` a `false`. Revisa y adapta los textos que hablan de recetas de ejemplo o de disponibilidad de demostración en `index.astro` y `menu.ts`. Este cambio exige una revisión editorial, no solo apagar un indicador.

## 5. Crear otro menú

1. En GitHub usa **Use this template → Create a new repository** o copia el proyecto conservando su estructura. Elige la visibilidad adecuada y no copies secretos.
2. Clona el nuevo repositorio e instala con `npm ci`.
3. Sustituye `business.json`, `menu.json` y las fotografías. `examples/cafe/` muestra una cafetería ficticia con tres productos; no es una carta lista para un cliente.
4. Define `url` con la dirección HTTPS final y `/` al final. En Pages de proyecto normalmente será `https://usuario.github.io/repositorio/`. No dejes la dirección del demo ni `example.org`.
5. Activa GitHub Actions como origen de Pages si ese alojamiento corresponde al caso de uso. Para otro alojamiento, publica el resultado de `npm run build` y adapta el flujo automático.
6. Ejecuta `npm run qr`, `npm test`, `npm run build` y `npm run test:e2e`. Revisa también el resultado visual: un tema nuevo puede cambiar el contraste.
7. Publica y abre la URL final desde móvil y escritorio. Descarga el QR desde `/qr/`, escanéalo físicamente y revisa una impresión de prueba antes de producir material para el negocio.

Las pruebas toman los datos del menú activo; no requieren que la nueva marca se llame Nami ni que tenga 30 productos. La comprobación automatizada de accesibilidad es parcial y no sustituye una revisión humana.

## 6. QR e impresión

`npm run qr` genera `public/qr/menu.svg`, `menu.png` (1200 × 1200) y `destination.json`. El PNG se decodifica automáticamente con una biblioteca distinta a la generadora. El SVG mantiene bordes definidos al ampliar; la página `/qr/` imprime una tarjeta A5.

Conserva el margen blanco del QR. Haz una prueba de lectura con el teléfono y en el tamaño/material de impresión final. La verificación digital no equivale a probar una cámara o una impresión.

Puedes actualizar el contenido manteniendo el mismo QR si la URL no cambia. Si cambias la dirección, conserva una redirección que controles o genera y distribuye otro QR. No hay redirección automática incluida.

## 7. Recuperar un cambio

Usa el historial de GitHub para identificar el último commit correcto y revierte el cambio mediante un nuevo commit; evita reescribir el historial compartido. Actions volverá a comprobar y publicar esa versión. Comprueba el despliegue y recarga la página publicada para confirmar el resultado.

Si falla la publicación, abre el paso rojo de Actions. Una validación fallida puede indicar un producto con ID repetido, una categoría inexistente o una foto ausente. La versión pública anterior permanece hasta un despliegue válido; no declares una edición publicada solo porque el archivo se guardó.
