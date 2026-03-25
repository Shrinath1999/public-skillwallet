import { NextRequest, NextResponse } from 'next/server';
import playerProfileService from '@/lib/services/playerProfileService';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const uuid = searchParams.get('uuid');

  if (!uuid) {
    return NextResponse.json(
      { error: 'UUID is required' },
      { status: 400 }
    );
  }

  try {
    const [profileResponse, gamesResponse, gameplayResponse, documentsResponse, trophiesResponse] = await Promise.all([
      playerProfileService.getPlayerPublicProfile(uuid),
      playerProfileService.getPointsPerformanceByGame(uuid),
      playerProfileService.getOverallGameplayDetails(uuid),
      playerProfileService.getPlayerPublicProfilLatestDocuments(uuid),
      playerProfileService.getPlayerPublicProfilLatestTrophies(uuid),
    ]);

    if (!profileResponse.success) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    const data = {
      userInfo: {
        ...profileResponse.data,
        active_since: new Date(profileResponse.data.active_since).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        }),
        milestone_achived: profileResponse.data.milestone,
      },
      games: gamesResponse.success ? gamesResponse.data.games : [],
      gameplayDetails: gameplayResponse.success ? gameplayResponse.data : null,
      documents: documentsResponse.success ? documentsResponse.data.documents.map((doc) => ({
        ...doc,
        isPdfLoading: true,
      })) : [],
      trophies: trophiesResponse.success ? trophiesResponse.data.trophies : [],
    };

    // Revalidate the page for this UUID
    const { revalidatePath } = await import('next/cache');
    revalidatePath(`/profile/${uuid}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error refreshing profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
