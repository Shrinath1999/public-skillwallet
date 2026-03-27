import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProfilePageClient from '@/components/ProfilePage';
import playerProfileService from '@/lib/services/playerProfileService';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo/metadata';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Revalidate page every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for known profiles
export async function generateStaticParams() {
  try {
    const response = await playerProfileService.getPublicPlayerProfiles();
    
    if (response.success && response.data?.profiles) {
      return response.data.profiles.slice(0, 10).map((profile) => ({
        username: profile.username || `${profile.first_name.toLowerCase()}-${profile.last_name.toLowerCase()}`,
      }));
    }
  } catch (error) {
    console.error('Error generating static params:', error);
  }
  
  // Fallback to empty array for ISR - new profiles will be generated on-demand
  return [];
}

// Helper function to check if the input is a UUID
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// Helper function to find UUID by username or return UUID if it's already a UUID
async function resolveUuid(identifier: string): Promise<string | null> {
  try {
    // If it's already a UUID, return it
    if (isUUID(identifier)) {
      return identifier;
    }
    
    // Otherwise, try to find by username
    const response = await playerProfileService.findUserByUsername(identifier);
    
    if (response.success && response.data) {
      return response.data.uuid || null;
    }
  } catch (error) {
    console.error('Error resolving UUID:', error);
  }
  
  return null;
}

// Generate metadata for the profile page
export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const uuid = await resolveUuid(username);
  
  if (!uuid) {
    return generateSEOMetadata(undefined);
  }

  try {
    const response = await playerProfileService.getPlayerPublicProfile(uuid);
    
    if (response.success && response.data && response.data.first_name) {
      // Transform PlayerProfile to UserInfo format
      const userInfo = {
        ...response.data,
        milestone_achived: response.data.milestone,
      };
      return generateSEOMetadata(userInfo, uuid);
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  return generateSEOMetadata(undefined, uuid);
}

// Fetch profile data server-side
async function getProfileData(identifier: string) {
  const uuid = await resolveUuid(identifier);
  
  if (!uuid) {
    redirect('https://1huddle.co');
  }

  try {
    const profileResponse = await playerProfileService.getPlayerPublicProfile(uuid);

    if (!profileResponse.success || !profileResponse.data) {
      redirect('https://1huddle.co');
    }

    // Validate that the profile has required data
    if (!profileResponse.data.first_name) {
      redirect('https://1huddle.co');
    }

    const [gamesResponse, gameplayResponse, documentsResponse, trophiesResponse] = await Promise.all([
      playerProfileService.getPointsPerformanceByGame(uuid),
      playerProfileService.getOverallGameplayDetails(uuid),
      playerProfileService.getPlayerPublicProfilLatestDocuments(uuid),
      playerProfileService.getPlayerPublicProfilLatestTrophies(uuid),
    ]);

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
    redirect('https://1huddle.co');
  }
}

export default async function ProfileRoute({ params }: ProfilePageProps) {
  const { username } = await params;
  const profileData = await getProfileData(username);
  const uuid = await resolveUuid(username);
  return <ProfilePageClient initialData={profileData} uuid={uuid || ''} />;
}
