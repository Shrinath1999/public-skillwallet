import Head from 'next/head';
import { generateStructuredData } from '@/lib/seo/metadata';

interface SEOHeadProps {
  userInfo?: {
    first_name: string;
    last_name: string;
    player_id: number;
    milestone_achived: number;
    profile_image_url: string;
    active_since: string;
  };
  uuid?: string;
}

export default function SEOHead({ userInfo, uuid }: SEOHeadProps) {
  const structuredData = generateStructuredData(userInfo, uuid);

  return (
    <Head>
      {/* Structured Data */}
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      
      {/* Additional meta tags for better SEO */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="1Huddle SkillWallet" />
      
      {/* PWA related meta tags */}
      <meta name="application-name" content="1Huddle SkillWallet" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://1h-prod-static-assets.s3.us-west-2.amazonaws.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for performance */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />
      
      {/* Favicon and app icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Canonical URL */}
      {uuid && (
        <link
          rel="canonical"
          href={`https://skillwallet.1huddle.com?uuid=${uuid}`}
        />
      )}
      
      {/* Alternative language links */}
      {uuid && (
        <>
          <link rel="alternate" hrefLang="en" href={`https://skillwallet.1huddle.com?uuid=${uuid}`} />
          <link rel="alternate" hrefLang="es" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=es`} />
          <link rel="alternate" hrefLang="fr" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=fr`} />
          <link rel="alternate" hrefLang="de" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=de`} />
          <link rel="alternate" hrefLang="pt" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=pt`} />
          <link rel="alternate" hrefLang="it" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=it`} />
          <link rel="alternate" hrefLang="ja" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=ja`} />
          <link rel="alternate" hrefLang="zh" href={`https://skillwallet.1huddle.com?uuid=${uuid}&lang=zh`} />
          <link rel="alternate" hrefLang="x-default" href={`https://skillwallet.1huddle.com?uuid=${uuid}`} />
        </>
      )}
    </Head>
  );
}
