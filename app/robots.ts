import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://publicskillwallet.1huddle.co';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
