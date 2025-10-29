// components/SeoHelmet.jsx
import { Helmet } from "react-helmet";

export default function SeoHelmet({ seo = {}, fallback = {} }) {
  const title = seo.metaTitle || fallback.title;
  const description = seo.metaDescription || fallback.description;
  const image = seo.metaImage || fallback.image;
  const url = fallback.url;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {seo.keywords?.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}

      {/* Canonical */}
      {url && <link rel="canonical" href={url} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="article" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
