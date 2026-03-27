import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://qa-api.1huddle.co/api/rest';

interface PlayerProfile {
  first_name: string;
  last_name: string;
  active_since: string;
  player_id: number;
  milestone: number;
  profile_image_url: string;
  uuid?: string;
  username?: string;
  created_at?: string;
  updated_at?: string;
}

interface GamePerformance {
  game_id: number;
  game_name: string;
  game_image_url: string;
  rank: number;
  points: number;
  high_score: number;
  win_rate: string;
}

interface Document {
  doc_id: number;
  doc_name: string;
  doc_type: string;
  doc_url: string;
  thumbnail_url: string;
  issuer: string;
  achievement_type: string;
  issue_date: string;
  description: string;
  updated_on: string;
  isPdfLoading?: boolean;
  thumbnail?: string;
  pageNo?: number;
}

interface Trophy {
  trophies_id: number;
  trophies_name: string;
  description: string;
  logo_url: string;
  trophy_type: string;
  achieved_date: string;
}

interface OverallGameplay {
  total_points: number;
  total_games: number;
  total_trophies: number;
  perfect_games: number;
  total_time: number;
  max_weekly_streak: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message_code?: number;
}

class PlayerProfileService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Gateway API calls with required headers
  private async gatewayGet(url: string) {
    try {
      const response = await axios.get(url, {
        headers: {
          'api_gateway': 'true',
          'user-type': process.env.NEXT_PUBLIC_USER_TYPE || 'player',
          'api-key': process.env.NEXT_PUBLIC_API_KEY,
          'api-secret': process.env.NEXT_PUBLIC_API_SECRET,
          'locale': process.env.NEXT_PUBLIC_LOCALE || 'en',
          'platform': process.env.NEXT_PUBLIC_PLATFORM || 'WebApp',
          'company-id': '',
          'player-id': '',
          'api-version': process.env.NEXT_PUBLIC_API_VERSION || '4',
          'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error('Gateway API error:', error);
      throw error;
    }
  }

  async getPlayerPublicProfile(uuid: string): Promise<ApiResponse<PlayerProfile>> {
    try {      
      // Gateway endpoint: 3p0cq3006j.execute-api.us-west-2.amazonaws.com/why/user/{uuid}
      const response = await this.gatewayGet(`https://3p0cq3006j.execute-api.us-west-2.amazonaws.com/why/user/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching player profile:', error);
      throw error;
    }
  }

  async getPointsPerformanceByGame(uuid: string): Promise<ApiResponse<{ games: GamePerformance[] }>> {
    try {
      // Gateway endpoint: j1cdnrfs63.execute-api.us-west-2.amazonaws.com/why/games/performance/{uuid}
      const response = await this.gatewayGet(`https://j1cdnrfs63.execute-api.us-west-2.amazonaws.com/why/games/performance/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching game performance:', error);
      throw error;
    }
  }

  async getOverallGameplayDetails(uuid: string): Promise<ApiResponse<OverallGameplay>> {
    try {
      // Gateway endpoint: 0z99ihmhw3.execute-api.us-west-2.amazonaws.com/why/games/analytics/{uuid}
      const response = await this.gatewayGet(`https://0z99ihmhw3.execute-api.us-west-2.amazonaws.com/why/games/analytics/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching overall gameplay:', error);
      throw error;
    }
  }

  async getPlayerPublicProfilLatestDocuments(uuid: string): Promise<ApiResponse<{ documents: Document[] }>> {
    try {
      // Gateway endpoint: s4yfkvq5b3.execute-api.us-west-2.amazonaws.com/why/documents/{uuid}
      const response = await this.gatewayGet(`https://s4yfkvq5b3.execute-api.us-west-2.amazonaws.com/why/documents/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  async getPlayerPublicProfilLatestTrophies(uuid: string): Promise<ApiResponse<{ trophies: Trophy[] }>> {
    try {
      // Gateway endpoint: q4kvtcjyg7.execute-api.us-west-2.amazonaws.com/why/trophies/{uuid}
      const response = await this.gatewayGet(`https://q4kvtcjyg7.execute-api.us-west-2.amazonaws.com/why/trophies/${uuid}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching trophies:', error);
      throw error;
    }
  }

  async getPublicPlayerProfiles(): Promise<ApiResponse<{ profiles: PlayerProfile[] }>> {
    try {
      // For testing, return mock data with the current user
      // In production, this would call an actual API endpoint
      const mockProfiles: PlayerProfile[] = [
        {
          first_name: 'Shri',
          last_name: 'demo.qa',
          player_id: 1,
          milestone: 1,
          profile_image_url: '',
          uuid: 'becafbde-51b1-4f76-98cb-0066c82d2820',
          username: 'shri-demoqa',
          active_since: '2025-05-13T09:18:58Z',
          created_at: '2025-05-13T09:18:58Z',
          updated_at: '2025-05-13T09:18:58Z',
        }
      ];

      return {
        success: true,
        data: { profiles: mockProfiles },
        message_code: 200,
      };
    } catch (error) {
      console.error('Error fetching public profiles:', error);
      return {
        success: false,
        data: { profiles: [] },
        message_code: 500,
      };
    }
  }

  async findUserByUsername(username: string): Promise<ApiResponse<PlayerProfile>> {
    try {
      // First try to get all profiles and find by username
      const profilesResponse = await this.getPublicPlayerProfiles();
      
      if (profilesResponse.success && profilesResponse.data?.profiles) {
        const profile = profilesResponse.data.profiles.find(p => 
          p.username === username || 
          `${p.first_name.toLowerCase()}-${p.last_name.toLowerCase()}` === username
        );
        
        if (profile) {
          return {
            success: true,
            data: profile,
            message_code: 200,
          };
        }
      }
      
      // If not found, try to parse as first-name-last-name format
      const nameParts = username.split('-');
      if (nameParts.length === 2) {
        const [firstName, lastName] = nameParts;
        // You could implement an API endpoint here to search by name
        // For now, return not found
      }
      
      return {
        success: false,
        data: null as any,
        message_code: 404,
      };
    } catch (error) {
      console.error('Error finding user by username:', error);
      return {
        success: false,
        data: null as any,
        message_code: 500,
      };
    }
  }
}

export default new PlayerProfileService();
