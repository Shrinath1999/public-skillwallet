import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilePageClient from '@/components/ProfilePage';
import playerProfileService from '@/lib/services/playerProfileService';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';

interface ProfilePageProps {
  params: { uuid: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Revalidate page every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for known profiles
export async function generateStaticParams() {
  // For static export, we need to return some params
  // Since we don't have a real endpoint to get all profiles, 
  // we'll return an empty array and let the route be dynamic
  // This allows the build to succeed while keeping the route functional
  return [];
}

// Generate metadata for the profile page
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  try {
    const response = await playerProfileService.getPlayerPublicProfile(params.uuid);
    
    if (response.success && response.data) {
      // Transform PlayerProfile to UserInfo format
      const userInfo = {
        ...response.data,
        milestone_achived: response.data.milestone,
      };
      return generateSEOMetadata(userInfo, params.uuid);
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return generateSEOMetadata(undefined, params.uuid);
}

// Fetch profile data server-side
async function getProfileData(uuid: string) {
  try {
    const [profileResponse, gamesResponse, gameplayResponse, documentsResponse, trophiesResponse] = await Promise.all([
      playerProfileService.getPlayerPublicProfile(uuid),
      playerProfileService.getPointsPerformanceByGame(uuid),
      playerProfileService.getOverallGameplayDetails(uuid),
      playerProfileService.getPlayerPublicProfilLatestDocuments(uuid),
      playerProfileService.getPlayerPublicProfilLatestTrophies(uuid),
    ]);

    if (!profileResponse.success) {
      return null;
    }

    return {
      userInfo: {
        ...profileResponse.data,
        milestone_achived: profileResponse.data.milestone,
        active_since: new Date(profileResponse.data.active_since).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
      },
      games: gamesResponse.success ? gamesResponse.data.games : [],
      gameplayDetails: gameplayResponse.success ? gameplayResponse.data : null,
      documents: documentsResponse.success ? documentsResponse.data.documents : [],
      trophies: trophiesResponse.success ? trophiesResponse.data.trophies : [],
    };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
}

export default async function ProfileRoute({ params }: ProfilePageProps) {
  const profileData = await getProfileData(params.uuid);

  if (!profileData) {
    notFound();
  }

  return <ProfilePageClient initialData={profileData} uuid={params.uuid} />;
}
