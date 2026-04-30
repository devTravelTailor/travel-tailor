function parseUrl(url) {
  if (!url) return '';
  const trimmed = String(url).trim();
  const frontendBase = (process.env.NEXT_PUBLIC_URL_PREFIX || '').replace(
    /\/+$/,
    ''
  );
  const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');

  let base =
    trimmed.includes('http://') || trimmed.includes('https://')
      ? trimmed
      : trimmed.startsWith('/images/')
      ? trimmed
      : trimmed.startsWith('/uploads/')
      ? `${apiBase}${trimmed}`
      : `${frontendBase}${trimmed}`;

  try {
    return encodeURI(base);
  } catch (e) {
    return base;
  }
}

export default parseUrl;
