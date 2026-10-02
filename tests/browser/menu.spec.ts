import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import rawMenu from '../../src/data/menu.json' with { type: 'json' };
import type { Menu } from '../../src/lib/content';
import business from '../../src/data/business.json' with { type: 'json' };
import { normalize, matchesProduct } from '../../src/lib/catalog.mjs';
const menu: Menu = rawMenu;
const mainProduct = menu.products.find(p => p.image && p.allergens.length) || menu.products[0];
const category = menu.categories[0];
const categoryProducts = menu.products.filter(p => p.category === category.id);

test('Carta, recursos, metadatos y accesibilidad inicial', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('./');
  await expect(page.locator('[data-product]')).toHaveCount(menu.products.length);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(business.headline[0]);
  if (business.demo) await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
  await expect(page.locator('.item-thumbnail')).toHaveCount(menu.products.filter(p => p.image).length);
  await page.evaluate(async () => {
    await document.fonts.ready;
    // Load offscreen thumbnails too, so a broken image anywhere in the menu fails this check.
    const images = Array.from(document.images).filter(i => i.hasAttribute('src'));
    images.forEach(i => { i.loading = 'eager'; });
    await Promise.all(images.map(i => i.decode()));
  });
  expect(await page.locator('img').evaluateAll(images => images.every(img => (img as HTMLImageElement).naturalWidth > 0 || !img.hasAttribute('src')))).toBeTruthy();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) }))).toEqual([]);
  await page.screenshot({ path: 'evidence/desktop.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('Cada producto abre su fotografía ampliada', async ({ page }) => {
  test.setTimeout(60000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  for (const product of menu.products.filter(p => p.image)) {
    const thumbnail = page.locator(`#producto-${product.id} .item-thumbnail`);
    await thumbnail.click();
    await expect(page.locator('#dialog-title')).toHaveText(product.name);
    const photo = page.locator('#dialog-photo');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveAttribute('alt', product.imageAlt!);
    await photo.evaluate(async (img: HTMLImageElement) => { await img.decode(); });
    expect(await photo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThanOrEqual(600);
    await page.keyboard.press('Escape');
  }
});

test('Búsqueda, filtros combinados, vacío y restablecimiento', async ({ page }) => {
  await page.goto('./');
  const query = normalize(mainProduct.name).toUpperCase();
  await page.locator('#search').fill(query);
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.filter(p => matchesProduct(p, { query })).length);
  await page.locator(`[data-category="${mainProduct.category}"]`).click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.filter(p => matchesProduct(p, { query, category: mainProduct.category })).length);
  await page.locator('#vegetarian').click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.filter(p => matchesProduct(p, { query, category: mainProduct.category, vegetarian: true })).length);
  await page.locator('#reset-filters').click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.length);
  await page.locator(`[data-category="${category.id}"]`).click();
  await page.locator('#vegetarian').click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(categoryProducts.filter(p => p.vegetarian).length);
  await page.locator('#reset-filters').click();
  await page.locator('#search').fill('zzzzsinresultados');
  await expect(page.locator('#empty-state')).toBeVisible();
  await page.getByRole('button', { name: 'Borrar búsqueda' }).click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.length);
  await page.locator('#search').fill('zzzzsinresultados');
  await page.locator('#empty-reset').click();
  await expect(page.locator('[data-product]:visible')).toHaveCount(menu.products.length);
});

test('Ficha, teclado, cierre y regreso del foco', async ({ page }) => {
  await page.goto('./');
  const trigger = page.locator(`summary[data-open="${mainProduct.id}"]`);
  await trigger.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#product-dialog')).toBeVisible();
  await expect(page.locator('#dialog-title')).toHaveText(mainProduct.name);
  const formatted = new Intl.NumberFormat(business.locale, { style: 'currency', currency: business.currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(mainProduct.price);
  await expect(page.locator('#dialog-price')).toContainText(formatted);
  await expect(page.locator('#dialog-allergens')).toContainText(mainProduct.allergens[0] || 'Sin alérgenos declarados');
  await expect(page.getByRole('button', { name: 'Cerrar detalles' })).toBeFocused();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map(v => v.id)).toEqual([]);
  await page.keyboard.press('Shift+Tab');
  await expect(page.locator('#dialog-back')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#product-dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  const soldOut = menu.products.find(p => !p.available);
  if (soldOut) {
    await page.locator(`summary[data-open="${soldOut.id}"]`).click();
    await expect(page.locator('#dialog-tags')).toContainText('Agotado');
    if (!soldOut.image) await expect(page.locator('#dialog-photo-wrap')).toBeHidden();
  }
});

test('Móvil, tableta, zoom y movimiento reducido sin desbordamiento', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    await page.locator(`[data-category="${category.id}"]`).click();
    await expect(page.locator('[data-product]:visible')).toHaveCount(categoryProducts.length);
    await page.locator(`summary[data-open="${categoryProducts[0].id}"]`).click();
    await expect(page.locator('#product-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await page.screenshot({ path: 'evidence/mobile.png', fullPage: true });
  await page.locator('#carta').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'evidence/mobile-menu.png' });
  // 200% CSS zoom from a desktop viewport, in addition to real 320 px reflow.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBeTruthy();
});

test('Sin JavaScript la carta y las fichas siguen disponibles', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('[data-product]')).toHaveCount(menu.products.length);
  await page.locator(`summary[data-open="${mainProduct.id}"]`).click();
  await expect(page.locator(`#producto-${mainProduct.id} .fallback-details`)).toBeVisible();
  await expect(page.locator(`#producto-${mainProduct.id} .fallback-details`)).toContainText(mainProduct.ingredients[0]);
  await context.close();
});

test('Página QR, destinos de descarga y tarjeta imprimible', async ({ page, request }) => {
  await page.goto('qr/');
  await expect(page.locator('.qr-code')).toBeVisible();
  const svgResponse = await request.get('qr/menu.svg');
  expect(svgResponse.ok()).toBeTruthy();
  const pngResponse = await request.get('qr/menu.png');
  expect(pngResponse.ok()).toBeTruthy();
  const destination = await request.get('qr/destination.json');
  const manifest = await destination.json();
  expect(manifest.url).toBe(manifest.decoded);
  await page.reload();
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations.map(v => v.id)).toEqual([]);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.site-header')).toBeHidden();
  await expect(page.locator('.qr-card')).toBeVisible();
  await page.screenshot({ path: 'evidence/qr-print.png' });
});
