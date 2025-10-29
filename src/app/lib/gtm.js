export const GTM_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      event: 'pageview',
      page: url,
    });
  }
};