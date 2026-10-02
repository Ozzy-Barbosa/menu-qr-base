# Menú QR Base · Nami

Un menú digital estático y reutilizable para restaurantes. Nami es el restaurante ficticio incluido como demostración: 30 productos, seis categorías, tres fotografías ilustrativas y una experiencia diseñada para el celular.

- **Demo:** [Abrir Nami](https://ozzy-barbosa.github.io/menu-qr-base/)
- **QR y tarjeta imprimible:** [Abrir página QR](https://ozzy-barbosa.github.io/menu-qr-base/qr/)
- **Encargo reutilizable:** [Prompt maestro](PROMPT-MAESTRO.md)
- **Mantenimiento:** [Guía de edición y duplicación](docs/GUIA-DE-USO.md)
- **Comprobaciones:** [Registro de verificación](docs/VERIFICACION.md)

## Qué incluye

Búsqueda por nombre e ingredientes, categorías, filtro vegetariano, fichas con ingredientes y alérgenos de ejemplo, estado agotado, navegación por teclado, movimiento reducido, menú legible sin JavaScript, imágenes optimizadas, fuentes locales y QR SVG/PNG. La página QR tiene estilos de impresión para una tarjeta en A5.

La marca, los colores y el contenido se editan en JSON. Es una base mantenida desde archivos; no incluye un panel de administración, sincronización de inventario, pedidos ni pagos.

## Empezar

Requisitos: Node.js 24 y npm. Las versiones efectivas están en `package-lock.json`.

```sh
npm ci
npm run dev
```

Abre la dirección que indique el servidor, incluida la subruta `/menu-qr-base/`. Para comprobar la exportación estática:

```sh
npm run qr
npm test
npm run build
npm run preview
```

Para las pruebas de navegador:

```sh
npx playwright install chromium
npm run test:e2e
```

En Windows, si la política de ejecución bloquea módulos nativos, ejecuta desde una terminal autorizada. Para desactivar telemetría de Astro en PowerShell: `$env:ASTRO_TELEMETRY_DISABLED='1'`.

## Archivos que se editan

| Necesidad | Archivo |
| --- | --- |
| Marca, moneda, URL, portada y colores | `src/data/business.json` |
| Categorías, platillos, precios y disponibilidad | `src/data/menu.json` |
| Fotografías originales | `src/assets/` |
| Diseño y medidas | `src/styles/global.css` |
| Nueva identidad mínima de ejemplo | `examples/cafe/` |
| Validación y generación del QR | `scripts/` |
| Publicación automática | `.github/workflows/deploy.yml` |

`npm run demo:check` verifica otra marca, otra carta y otra subruta usando el ejemplo de cafetería, y restaura los datos originales y su compilación. No lo ejecutes mientras otra persona edita esos archivos; cambia los JSON temporalmente durante la comprobación. No publica la cafetería ni genera un QR para ella.

## Publicación

GitHub Actions ejecuta validación, pruebas y compilación antes del despliegue. Configura **Settings → Pages → Source → GitHub Actions**. Los cambios confirmados en `main` se publican al completar correctamente el flujo. Una compilación local correcta no confirma una publicación: revisa Actions y abre la URL pública.

La base utiliza Astro con salida estática; el contenido de `dist/` puede trasladarse a otro alojamiento. `business.url` controla `site`, `base`, metadatos, rutas y destino del QR.

## Límites de esta demostración

El negocio, recetas, precios y disponibilidad son ficticios. Las fotografías generadas son ilustrativas y pueden diferir en el número exacto de piezas. Las etiquetas de alérgenos no certifican recetas ni ausencia de contaminación cruzada. No hay contactos reales, pedidos, cuentas, pagos ni rastreadores añadidos. El modo demo se entrega con `noindex`.

GitHub Pages aloja este prototipo. Para un restaurante operativo o un servicio comercial, revisa las [condiciones y límites vigentes de Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) y elige un alojamiento que permita esa actividad. No asumas que Pages puede sostener una plataforma de ventas o un SaaS comercial.

El QR estático conserva su utilidad al actualizar la carta si se mantiene la misma URL. Cambiar o borrar el dominio/repositorio puede romperlo. No depende de acortadores ni suscripciones de QR, pero sí de que el sitio continúe disponible.

## Recursos y derechos

Consulta [imágenes y prompts](docs/IMAGENES.md) y [avisos de terceros](THIRD-PARTY-NOTICES.md). No se concede una licencia general de redistribución del proyecto: el propietario debe elegirla antes de ofrecer esta plantilla públicamente bajo una licencia abierta. La publicación del repositorio no sustituye esa decisión.
