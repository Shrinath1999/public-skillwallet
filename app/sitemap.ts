import { MetadataRoute } from 'next';
import playerProfileService from '@/lib/services/playerProfileService';

interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://publicskillwallet.1huddle.co';
  
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: baseUrl,
          'en-US': baseUrl,
          es: `${baseUrl}?lang=es`,
          fr: `${baseUrl}?lang=fr`,
          de: `${baseUrl}?lang=de`,
          pt: `${baseUrl}?lang=pt`,
          it: `${baseUrl}?lang=it`,
          ja: `${baseUrl}?lang=ja`,
          zh: `${baseUrl}?lang=zh`,
        },
      },
    },
  ];

  try {
    const response = await playerProfileService.getPublicPlayerProfiles();
    
    if (response.success && response.data?.profiles) {
      const profilePages: SitemapEntry[] = response.data.profiles.map((profile: any) => ({
        url: `${baseUrl}?uuid=${profile.uuid}`,
        lastModified: new Date(profile.updated_at || profile.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}?uuid=${profile.uuid}`,
            'en-US': `${baseUrl}?uuid=${profile.uuid}`,
            es: `${baseUrl}?uuid=${profile.uuid}&lang=es`,
            fr: `${baseUrl}?uuid=${profile.uuid}&lang=fr`,
            de: `${baseUrl}?uuid=${profile.uuid}&lang=de`,
            pt: `${baseUrl}?uuid=${profile.uuid}&lang=pt`,
            it: `${baseUrl}?uuid=${profile.uuid}&lang=it`,
            ja: `${baseUrl}?uuid=${profile.uuid}&lang=ja`,
            zh: `${baseUrl}?uuid=${profile.uuid}&lang=zh`,
          },
        },
      }));

      return [...staticPages, ...profilePages];
    }
  } catch (error) {
    console.error('Error fetching profiles for sitemap:', error);
  }

  return staticPages;
}
