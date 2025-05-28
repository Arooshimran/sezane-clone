const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://celebrated-love-44f06665d3.strapiapp.com';

export function getImageUrl(img: any): string {
  if (!img) return 'https://dummyimage.com/720x960';
  const url =
    img.formats?.large?.url ||
    img.formats?.medium?.url ||
    img.formats?.small?.url ||
    img.url;
  return url?.startsWith('http') ? url : `${API_BASE}${url}`;
}


export function getCategoryAndSubIds(mainCat: any) {
  const ids = [mainCat.id];
  if (mainCat.categories && Array.isArray(mainCat.categories)) {
    ids.push(...mainCat.categories.map((sub: any) => sub.id));
  }
  return ids;
}