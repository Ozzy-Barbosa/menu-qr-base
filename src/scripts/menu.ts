import { matchesProduct } from '../lib/catalog.mjs';
import type { Product } from '../lib/content';
type ClientProduct = Product & { photo: string | null };
const data = JSON.parse(document.getElementById('menu-data')!.textContent!) as { products: ClientProduct[]; categories: { id: string; name: string }[]; locale: string; currency: string };
const products = new Map(data.products.map(p => [p.id, p]));
const search = document.querySelector<HTMLInputElement>('#search')!;
const vegetarian = document.querySelector<HTMLButtonElement>('#vegetarian')!;
const clearSearch = document.querySelector<HTMLButtonElement>('.search-clear')!;
const reset = document.querySelector<HTMLButtonElement>('#reset-filters')!;
const dialog = document.querySelector<HTMLDialogElement>('#product-dialog')!;
const state = { query: '', category: 'all', vegetarian: false };
let previousFocus: HTMLElement | null = null;
const money = (n: number) => new Intl.NumberFormat(data.locale, { style: 'currency', currency: data.currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(n);
const text = (id: string, value: string) => { document.getElementById(id)!.textContent = value; };
const hidden = (id: string, value: boolean) => { const el = document.getElementById(id); if (el) el.hidden = value; };

function renderFilters() {
  let total = 0;
  const categories = new Set<string>();
  document.querySelectorAll<HTMLElement>('[data-product]').forEach(item => {
    const product = products.get(item.dataset.product!)!;
    const show = matchesProduct(product, state);
    item.hidden = !show;
    if (show) { total++; categories.add(product.category); }
  });
  document.querySelectorAll<HTMLElement>('[data-section]').forEach(section => { section.hidden = !categories.has(section.dataset.section!); });
  document.querySelectorAll<HTMLElement>('[data-category]').forEach(tab => {
    const active = tab.dataset.category === state.category;
    tab.classList.toggle('active', active);
    if (active) tab.setAttribute('aria-current', 'true'); else tab.removeAttribute('aria-current');
  });
  vegetarian.setAttribute('aria-pressed', String(state.vegetarian));
  const filtered = !!state.query.trim() || state.category !== 'all' || state.vegetarian;
  hidden('featured', filtered);
  hidden('empty-state', total !== 0);
  reset.hidden = !filtered;
  clearSearch.hidden = !search.value;
  text('result-count', `${total} ${total === 1 ? 'opción' : 'opciones'} ${filtered ? 'encontradas' : 'para disfrutar'}`);
}
function resetFilters() {
  state.query = ''; state.category = 'all'; state.vegetarian = false; search.value = '';
  renderFilters();
  search.focus({ preventScroll: true });
}
search.addEventListener('input', () => { state.query = search.value; renderFilters(); });
clearSearch.addEventListener('click', () => { search.value = ''; state.query = ''; renderFilters(); search.focus(); });
vegetarian.addEventListener('click', () => { state.vegetarian = !state.vegetarian; renderFilters(); });
reset.addEventListener('click', resetFilters);
document.getElementById('empty-reset')!.addEventListener('click', resetFilters);
document.querySelectorAll<HTMLAnchorElement>('[data-category]').forEach(tab => tab.addEventListener('click', e => {
  e.preventDefault();
  state.category = tab.dataset.category!;
  renderFilters();
  const menuTop = document.getElementById('carta')!.getBoundingClientRect().top;
  if (menuTop < -140) document.getElementById('carta')!.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}));

function openProduct(id: string, trigger: HTMLElement) {
  const p = products.get(id);
  if (!p) return;
  previousFocus = trigger;
  text('dialog-title', p.name); text('dialog-price', `${money(p.price)} ${data.currency}`);
  text('dialog-category', data.categories.find(c => c.id === p.category)!.name);
  text('dialog-portion', p.portion); text('dialog-description', p.description);
  text('dialog-ingredients', p.ingredients.join(' · '));
  text('dialog-allergens', p.allergens.length ? p.allergens.join(' · ') : 'Sin alérgenos declarados en esta receta de ejemplo. No garantiza ausencia de alérgenos.');
  const tagBox = document.getElementById('dialog-tags')!;
  tagBox.replaceChildren();
  const tags: [string, string][] = [];
  if (p.vegetarian) tags.push(['Vegetariano', 'tag-green']);
  if (p.spicy) tags.push([p.spicy > 1 ? 'Picante' : 'Toque picante', 'tag-spicy']);
  if (p.raw) tags.push(['Contiene pescado crudo', '']);
  if (!p.available) tags.push(['Agotado · demostración', 'tag-out']);
  tags.forEach(([label, style]) => { const span = document.createElement('span'); span.className = `tag ${style}`; span.textContent = label; tagBox.append(span); });
  const photo = document.querySelector<HTMLImageElement>('#dialog-photo')!;
  hidden('dialog-photo-wrap', !p.photo);
  if (p.photo) { photo.src = p.photo; photo.alt = p.imageAlt || p.name; } else { photo.removeAttribute('src'); photo.alt = ''; }
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.scrollTop = 0;
  dialog.querySelector<HTMLButtonElement>('.dialog-close')!.focus();
}
document.querySelectorAll<HTMLElement>('[data-open]').forEach(trigger => trigger.addEventListener('click', e => { e.preventDefault(); openProduct(trigger.dataset.open!, trigger); }));
dialog.querySelector('.dialog-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', e => {
  if (e.key !== 'Tab') return;
  const first = dialog.querySelector<HTMLButtonElement>('.dialog-close')!;
  const last = document.querySelector<HTMLButtonElement>('#dialog-back')!;
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
document.getElementById('dialog-back')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { const rect = dialog.getBoundingClientRect(); if (e.target === dialog && (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom)) dialog.close(); });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); previousFocus?.focus({ preventScroll: true }); });
// Direct category hashes remain useful when a menu is shared.
const initialCategory = location.hash.slice(1);
if (data.categories.some(c => c.id === initialCategory)) { state.category = initialCategory; renderFilters(); }
