function parseUrl(url) {
  if (url.includes('http://') || url.includes('https://')) {
    return url;
  } else if (url.startsWith('/images/')) {
    return url;
  } else {
    return `${process.env.NEXT_PUBLIC_URL_PREFIX || ''}${url}`;
  }
}

export default parseUrl;
