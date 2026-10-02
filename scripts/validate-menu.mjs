import { readFileSync, existsSync } from 'node:fs';
import { validateMenu } from '../src/lib/catalog.mjs';
const read = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const menu = read('../src/data/menu.json');
const business = read('../src/data/business.json');
const errors = validateMenu(menu);
for (const field of ['name', 'descriptor', 'description', 'locale', 'currency', 'url']) if (!business[field] || typeof business[field] !== 'string') errors.push(`Falta ${field} en business.json`);
if (!Array.isArray(business.headline) || business.headline.length !== 2 || business.headline.some(v => typeof v !== 'string' || !v.trim())) errors.push('headline debe contener dos líneas.');
try { const url = new URL(business.url); if (url.protocol !== 'https:' || !url.pathname.endsWith('/')) errors.push('La URL debe ser HTTPS y terminar en /.'); } catch { errors.push('URL pública inválida.'); }
try { new Intl.NumberFormat(business.locale, { style: 'currency', currency: business.currency }); } catch { errors.push('Moneda o idioma inválidos.'); }
for (const [key, value] of Object.entries(business.theme || {})) if (!/^#[\da-f]{6}$/i.test(value)) errors.push(`Color inválido: ${key}`);
for (const key of ['paper', 'ink', 'accent', 'accentSoft']) if (!business.theme?.[key]) errors.push(`Falta el color ${key}.`);
if (business.contact?.phone && !/^\+[1-9]\d{7,14}$/.test(business.contact.phone)) errors.push('El teléfono debe estar en formato internacional, por ejemplo +52 seguido de diez dígitos.');
for (const p of [...menu.products, { id: 'portada', image: business.hero?.image }]) if (p.image && !existsSync(new URL(`../src/assets/${p.image.replace('images/', '')}`, import.meta.url))) errors.push(`No existe la imagen de ${p.id}: ${p.image}`);
if (typeof business.demo !== 'boolean') errors.push('demo debe ser true o false.');
if (business.hero?.productId && !menu.products.some(p => p.id === business.hero.productId)) errors.push('El producto de portada no existe.');
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Contenido válido: ${menu.products.length} productos, ${menu.categories.length} categorías, ${business.currency}.`);
