import rawBusiness from '../data/business.json';
import rawMenu from '../data/menu.json';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export interface Product { id: string; category: string; name: string; description: string; portion: string; price: number; ingredients: string[]; allergens: string[]; vegetarian: boolean; spicy: number; raw: boolean; available: boolean; featured?: boolean; image?: string; imageAlt?: string; }
export interface Category { id: string; name: string; description: string; eyebrow: string; icon: string; }
export interface Menu { categories: Category[]; products: Product[]; }
export interface Business { name: string; descriptor: string; tagline: string; headline: string[]; description: string; locale: string; currency: string; url: string; demo: boolean; demoNotice: string; contact: { phone: string | null; address: string | null; hours: string | null }; hero: { image: string; alt: string; productId?: string; note: string }; theme: { paper: string; ink: string; accent: string; accentSoft: string }; }
export const business: Business = rawBusiness;
export const menu: Menu = rawMenu;
export const money = (price: number) => new Intl.NumberFormat(business.locale, { style: 'currency', currency: business.currency, minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(price);
export const path = (relative = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${relative.replace(/^\//, '')}`;
const originals = import.meta.glob<{ default: ImageMetadata }>('../assets/*.{png,jpg,jpeg,webp,avif}', { eager: true });
export const photos = Object.fromEntries(await Promise.all(Object.entries(originals).map(async ([file, module]) => {
  const large = await getImage({ src: module.default, width: 1200, format: 'webp', quality: 82 });
  const small = await getImage({ src: module.default, width: 600, format: 'webp', quality: 80 });
  return [`images/${file.split('/').pop()}`, { large: large.src, small: small.src }];
})));
