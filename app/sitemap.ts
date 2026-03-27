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
    },
  ];

  try {
    const response = await playerProfileService.getPublicPlayerProfiles();
    
    if (response.success && response.data?.profiles) {
      const profilePages: SitemapEntry[] = response.data.profiles.map((profile: any) => ({
        url: `${baseUrl}/profile/${profile.username || `${profile.first_name.toLowerCase()}-${profile.last_name.toLowerCase()}`}`,
        lastModified: new Date(profile.updated_at || profile.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));

      return [...staticPages, ...profilePages];
    }
  } catch (error) {
    console.error('Error fetching profiles for sitemap:', error);
  }

  return staticPages;
}
