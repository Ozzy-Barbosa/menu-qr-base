import { readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';
const businessPath = new URL('../src/data/business.json', import.meta.url);
const menuPath = new URL('../src/data/menu.json', import.meta.url);
const originalBusiness = readFileSync(businessPath);
const originalMenu = readFileSync(menuPath);
const runBuild = () => {
  const result = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], { stdio: 'inherit', shell: process.platform === 'win32', env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' } });
  if (result.status !== 0) throw new Error('Falló la compilación de la plantilla.');
};
try {
  writeFileSync(businessPath, readFileSync(new URL('../examples/cafe/business.json', import.meta.url)));
  writeFileSync(menuPath, readFileSync(new URL('../examples/cafe/menu.json', import.meta.url)));
  runBuild();
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes('Bruma'));
  assert.ok(html.includes('Americano'));
  assert.ok(html.includes('$62.5'));
  assert.ok(!html.includes('Nami roll'));
  assert.ok(html.includes('/cafe-demo/'));
  console.log('Reutilización comprobada: otra marca, otro tema, otra subruta y 3 productos; precios con decimales conservados.');
} finally {
  writeFileSync(businessPath, originalBusiness);
  writeFileSync(menuPath, originalMenu);
  runBuild();
  console.log('Contenido y compilación originales restaurados.');
}
