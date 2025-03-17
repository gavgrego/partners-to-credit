import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  name?: string;
}

const SEO = ({
  title = 'partnersto.credit - Credit Card Points Transfer Guide',
  description = 'Find the best credit card transfer partners and current point transfer bonuses. Compare transfer ratios across American Express, Chase, Capital One, Citi, and BILT.',
  canonical = 'https://partnersto.credit',
  type = 'website',
  name = 'partnersto.credit',
}: SEOProps) => {
  const siteTitle =
    title === 'partnersto.credit - Credit Card Points Transfer Guide'
      ? title
      : `${title} | Credit Card Points Transfer Guide`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <link rel="icon" href="/logo.svg" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
};

export default SEO;
