export const normalize = (value) => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();

export function matchesProduct(product, { query = '', category = 'all', vegetarian = false } = {}) {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  const searchable = normalize([product.name, product.description, ...product.ingredients].join(' '));
  return (category === 'all' || product.category === category)
    && (!vegetarian || product.vegetarian)
    && terms.every(term => searchable.includes(term));
}

export function validateMenu(menu) {
  const errors = [];
  if (!Array.isArray(menu?.categories) || !Array.isArray(menu?.products)) return ['Se requieren listas de categorías y productos.'];
  if (!menu.categories.length || !menu.products.length) errors.push('El menú necesita al menos una categoría y un producto.');
  const categories = new Set();
  for (const c of menu.categories) {
    if (!c.id || !/^[a-z0-9-]+$/.test(c.id) || categories.has(c.id)) errors.push(`Categoría inválida o repetida: ${c.id}`);
    categories.add(c.id);
    for (const field of ['name', 'description', 'eyebrow', 'icon']) if (typeof c[field] !== 'string' || !c[field].trim()) errors.push(`Falta ${field} en categoría ${c.id}`);
  }
  const ids = new Set();
  for (const p of menu.products) {
    if (!p.id || !/^[a-z0-9-]+$/.test(p.id) || ids.has(p.id)) errors.push(`ID inválido o repetido: ${p.id}`);
    ids.add(p.id);
    if (!categories.has(p.category)) errors.push(`Categoría inexistente en ${p.id}`);
    for (const field of ['name', 'description', 'portion']) if (typeof p[field] !== 'string' || !p[field].trim()) errors.push(`Falta ${field} en ${p.id}`);
    if (typeof p.price !== 'number' || !Number.isFinite(p.price) || p.price < 0) errors.push(`Precio inválido en ${p.id}`);
    for (const field of ['ingredients', 'allergens']) if (!Array.isArray(p[field]) || p[field].some(v => typeof v !== 'string' || !v.trim())) errors.push(`Lista ${field} inválida en ${p.id}`);
    if (!p.ingredients?.length) errors.push(`Sin ingredientes: ${p.id}`);
    for (const field of ['available', 'vegetarian', 'raw']) if (typeof p[field] !== 'boolean') errors.push(`Valor ${field} inválido en ${p.id}`);
    if (![0, 1, 2, 3].includes(p.spicy)) errors.push(`Picante inválido en ${p.id}`);
    if (p.image && (!/^images\/[a-z0-9-]+\.(png|jpg|jpeg|webp|avif)$/.test(p.image) || !p.imageAlt)) errors.push(`Imagen o descripción inválida en ${p.id}`);
    if (p.featured && !p.image) errors.push(`Un destacado necesita imagen: ${p.id}`);
  }
  return errors;
}
