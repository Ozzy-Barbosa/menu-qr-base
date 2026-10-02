import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { matchesProduct, validateMenu } from '../src/lib/catalog.mjs';
const menu = JSON.parse(readFileSync(new URL('../src/data/menu.json', import.meta.url), 'utf8'));
const fish = { name: 'Salmón de ejemplo', description: 'Prueba de búsqueda', ingredients: ['Salmón', 'Aguacate'], category: 'rollos', vegetarian: false, available: false };
const veg = { name: 'Verde', description: 'Prueba vegetariana', ingredients: ['Aguacate'], category: 'rollos', vegetarian: true, available: true };
test('El catálogo real satisface el contrato de contenido', () => assert.deepEqual(validateMenu(menu), []));
test('La búsqueda ignora acentos y mayúsculas y busca ingredientes', () => {
  const p = fish;
  assert.equal(matchesProduct(p, { query: 'SALMON aguacate' }), true);
  assert.equal(matchesProduct(p, { query: 'pollo' }), false);
});
test('Categoría, búsqueda y opción vegetariana se combinan', () => {
  const results = [fish, veg].filter(p => matchesProduct(p, { category: 'rollos', vegetarian: true, query: 'aguacate' }));
  assert.deepEqual(results, [veg]);
});
test('Los agotados siguen disponibles para consulta', () => assert.equal(matchesProduct(fish), true));
test('El validador rechaza cambios de contenido que romperían el menú', () => {
  const broken = structuredClone(menu);
  while (broken.products.length < 3) broken.products.push(structuredClone(broken.products[0]));
  broken.products[0].price = -10;
  broken.products[1].id = broken.products[0].id;
  broken.products[2].category = 'no-existe';
  const errors = validateMenu(broken);
  assert.ok(errors.some(e => e.includes('Precio inválido')));
  assert.ok(errors.some(e => e.includes('repetido')));
  assert.ok(errors.some(e => e.includes('Categoría inexistente')));
});
