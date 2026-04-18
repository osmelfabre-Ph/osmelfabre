import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  jsonLd?: object;
}

const SITE_NAME = "Osmel Fabre — Fotografia di Ritratto";
const DEFAULT_DESCRIPTION =
  "Osmel Fabre, fotografo di ritratto a Milano. Ritratti professionali, book per attori, fotografia corporate maschile, formazione e mentoring fotografico.";
const DEFAULT_IMAGE = "https://www.osmelfabre.it/media/osmel-photos/gallery/1776493937139-cs8neflzlcm.jpg";
const SITE_URL = "https://www.osmelfabre.it";

const DEFAULT_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Osmel Fabre",
      jobTitle: "Fotografo di Ritratto",
      url: SITE_URL,
      image: DEFAULT_IMAGE,
      sameAs: [
        "https://www.instagram.com/osmelfabre",
        "https://www.themenbrandphotography.com",
      ],
      knowsAbout: [
        "Fotografia di Ritratto",
        "Fotografia Corporate Maschile",
        "Book per Attori",
        "Mentoring Fotografico",
      ],
      areaServed: { "@type": "Country", name: "Italia" },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Osmel Fabre Fotografia",
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      image: DEFAULT_IMAGE,
      founder: { "@id": `${SITE_URL}/#person` },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Milano",
        addressCountry: "IT",
      },
      priceRange: "€€",
      sameAs: ["https://www.instagram.com/osmelfabre"],
    },
  ],
};

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = "website",
  jsonLd,
}: SEOProps) {
  const fullTitle = title ? `${title} | Osmel Fabre` : SITE_NAME;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const structuredData = jsonLd ?? DEFAULT_JSON_LD;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
