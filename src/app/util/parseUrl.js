function parseUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();

  let base =
    trimmed.includes('http://') || trimmed.includes('https://')
      ? trimmed
      : trimmed.startsWith('/images/')
      ? trimmed
      : `${process.env.NEXT_PUBLIC_URL_PREFIX || ''}${trimmed}`;

  try {
    return encodeURI(base);
  } catch (e) {
    return base;
  }
}

export default parseUrl;
