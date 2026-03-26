import React, { Suspense } from 'react';
import { Metadata } from 'next';
import PageClient from './page-client';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';
import playerProfileService from '@/lib/services/playerProfileService';

export async function generateMetadata(): Promise<Metadata> {
  // Try to get UUID from search params or use default
  const defaultUuid = process.env.NEXT_PUBLIC_DEFAULT_UUID || 'becafbde-51b1-4f76-98cb-0066c82d2820';
  
  try {
    const response = await playerProfileService.getPlayerPublicProfile(defaultUuid);
    if (response.success && response.data) {
      const userInfo = {
        ...response.data,
        milestone_achived: response.data.milestone,
      };
      return generateSEOMetadata(userInfo, defaultUuid);
    }
  } catch (error) {
    console.error('Error fetching metadata:', error);
  }
  
  return generateSEOMetadata();
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PageClient />
    </Suspense>
  );
}
