'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import StatsGrid from '@/components/StatsGrid';
import DocumentsSection from '@/components/DocumentsSection';
import GamesTable from '@/components/GamesTable';
import TrophiesSection from '@/components/TrophiesSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import playerProfileService from '@/lib/services/playerProfileService';
import { getTime } from '@/lib/utils/timeFormatter';
import '../lib/i18n/config';

interface UserInfo {
  first_name: string;
  last_name: string;
  active_since: string;
  player_id: number;
  milestone_achived: number;
  profile_image_url: string;
  scoreDetails: Array<{
    points: string | number | null;
    title: string;
    imgName: string;
    showInTimeFormat: boolean;
  }>;
}

interface ScoreDetail {
  points: string | number | null;
  title: string;
  imgName: string;
  showInTimeFormat: boolean;
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

interface Game {
  game_id: number;
  game_name: string;
  game_image_url: string;
  rank: number;
  points: number;
  high_score: number;
  win_rate: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();
  const uuid = searchParams.get('uuid') || process.env.NEXT_PUBLIC_DEFAULT_UUID || 'becafbde-51b1-4f76-98cb-0066c82d2820';

  const [userInfo, setUserInfo] = useState<UserInfo>({
    first_name: '',
    last_name: '',
    active_since: '',
    player_id: 0,
    milestone_achived: 0,
    profile_image_url: '',
    scoreDetails: [],
  });

  const [documents, setDocuments] = useState<Document[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [trophies, setTrophies] = useState<Trophy[]>([]);

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isGamesLoading, setIsGamesLoading] = useState(true);
  const [isGameplayLoading, setIsGameplayLoading] = useState(true);
  const [isTrophiesLoading, setIsTrophiesLoading] = useState(true);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(false);
  const [breakpoint, setBreakpoint] = useState(3);
  const [maxToShow, setMaxToShow] = useState(5);
  const [hideShowMore, setHideShowMore] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  useEffect(() => {
    calculateBreakpoint();
    window.addEventListener('resize', calculateBreakpoint);
    return () => window.removeEventListener('resize', calculateBreakpoint);
  }, []);

  useEffect(() => {
    if (!uuid) return;

    const fetchData = async () => {
      try {
        await Promise.all([
          fetchPlayerProfile(uuid),
          fetchGamePerformance(uuid),
          fetchGameplayDetails(uuid),
          fetchDocuments(uuid),
          fetchTrophies(uuid),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [uuid]);

  const calculateBreakpoint = () => {
    const width = window.innerWidth;
    const bp = width / 400;

    if (width <= 640) {
      setIsMobile(true);
      setBreakpoint(2);
      setMaxToShow(6);
    } else {
      setIsMobile(false);
      setBreakpoint(Math.round(bp * 10) / 10);
      setMaxToShow(5);
    }
  };

  const fetchPlayerProfile = async (id: string) => {
    try {
      setIsProfileLoading(true);
      const response = await playerProfileService.getPlayerPublicProfile(id);
      if (response.success) {
        const data = response.data;
        setUserInfo((prev) => ({
          ...prev,
          first_name: data.first_name,
          last_name: data.last_name,
          player_id: data.player_id,
          active_since: new Date(data.active_since).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          milestone_achived: data.milestone,
          profile_image_url: data.profile_image_url,
        }));
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsProfileLoading(false);
    }
  };

  const fetchGamePerformance = async (id: string) => {
    try {
      setIsGamesLoading(true);
      const response = await playerProfileService.getPointsPerformanceByGame(id);
      if (response.success) {
        setGames(response.data.games);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsGamesLoading(false);
    }
  };

  const fetchGameplayDetails = async (id: string) => {
    try {
      setIsGameplayLoading(true);
      const response = await playerProfileService.getOverallGameplayDetails(id);
      if (response.success) {
        const data = response.data;
        const totalTimePlayed = data.total_time ? getTime(data.total_time, t) : '--';

        const scoreDetails: ScoreDetail[] = [
          {
            points: data.total_points,
            title: t('totalPointsPlayerProfile'),
            imgName: 'totalPoints',
            showInTimeFormat: false,
          },
          {
            points: data.total_games,
            title: t('totalGamesPlayerProfile'),
            imgName: 'totalGames',
            showInTimeFormat: false,
          },
          {
            points: data.total_trophies,
            title: t('trophiesEarned'),
            imgName: 'trophy',
            showInTimeFormat: false,
          },
          {
            points: data.perfect_games,
            title: t('perfectGamesLabel'),
            imgName: 'perfectgames',
            showInTimeFormat: false,
          },
          {
            points: totalTimePlayed,
            title: t('timePlayed'),
            imgName: 'time',
            showInTimeFormat: true,
          },
          {
            points: data.max_weekly_streak,
            title: t('weeklyStreaks'),
            imgName: 'weekly',
            showInTimeFormat: false,
          },
        ];

        setUserInfo((prev) => ({
          ...prev,
          scoreDetails,
        }));
      }
    } catch (error) {
      console.error('Error fetching gameplay details:', error);
    } finally {
      setIsGameplayLoading(false);
    }
  };

  const fetchDocuments = async (id: string) => {
    try {
      setIsDocumentsLoading(true);
      const response = await playerProfileService.getPlayerPublicProfilLatestDocuments(id);
      if (response.success) {
        const docs = response.data.documents.map((doc) => ({
          ...doc,
          isPdfLoading: true,
        }));
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsDocumentsLoading(false);
    }
  };

  const fetchTrophies = async (id: string) => {
    try {
      setIsTrophiesLoading(true);
      const response = await playerProfileService.getPlayerPublicProfilLatestTrophies(id);
      if (response.success) {
        setTrophies(response.data.trophies);
      }
    } catch (error) {
      console.error('Error fetching trophies:', error);
    } finally {
      setIsTrophiesLoading(false);
    }
  };

  const handleShowMore = () => {
    setHideShowMore(true);
    setMaxToShow(trophies.length);
  };

  const handleDocumentClick = (doc: Document) => {
    console.log('Document clicked:', doc);
  };

  return (
    <>
      <SEOHead userInfo={userInfo} uuid={uuid} />
      <div className="w-full min-h-screen bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: "url('/assets/img/playerPublicProfile/playerPublicProfileBg.png')",
          backgroundSize: '100% 100%',
        }}>
        <Header
          isMobile={isMobile}
          onHelpClick={setShowHelpPopup}
          showHelpPopup={showHelpPopup}
        />

        <main className="flex-1 overflow-y-auto px-[5%] py-6 pb-20 md:pb-6">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-5 mb-8">
            <ProfileCard userInfo={userInfo} isLoading={isProfileLoading} />
            <StatsGrid
              scoreDetails={userInfo.scoreDetails}
              isLoading={isGameplayLoading}
              breakpoint={breakpoint}
            />
          </div>

          {/* Documents and Games Section */}
          <div className="flex flex-col md:flex-row gap-5 mb-8">
            <div className="w-full md:w-[30%]">
              <img
                src="https://1h-prod-static-assets.s3.us-west-2.amazonaws.com/player-public-profile/playerPublicProfileAd.png"
                alt="Advertisement"
                className="w-full rounded-lg cursor-pointer hover:opacity-90 transition"
                onClick={() => window.open('https://meetings.hubspot.com/rbernardino/meet-with-roger')}
              />
            </div>
            <div className="w-full md:w-[70%]">
              <DocumentsSection
                documents={documents}
                isLoading={isDocumentsLoading}
                onDocumentClick={handleDocumentClick}
              />
              <GamesTable games={games} isLoading={isGamesLoading} isMobile={isMobile} />
            </div>
          </div>

          {/* Trophies Section */}
          <TrophiesSection
            trophies={trophies}
            isLoading={isTrophiesLoading}
            maxToShow={maxToShow}
            hideShowMore={hideShowMore}
            onShowMore={handleShowMore}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
