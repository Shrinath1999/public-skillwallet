'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import StatsGrid from '@/components/StatsGrid';
import DocumentsSection from '@/components/DocumentsSection';
import GamesTable from '@/components/GamesTable';
import TrophiesSection from '@/components/TrophiesSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { getTime } from '@/lib/utils/timeFormatter';
import '../lib/i18n/config';

interface UserInfo {
  first_name: string;
  last_name: string;
  active_since: string;
  player_id: number;
  milestone_achived: number;
  profile_image_url: string;
  scoreDetails?: Array<{
    points: string | number | null;
    title: string;
    imgName: string;
    showInTimeFormat: boolean;
  }>;
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

interface ProfilePageProps {
  initialData: {
    userInfo: UserInfo;
    games: Game[];
    gameplayDetails: any;
    documents: Document[];
    trophies: Trophy[];
  };
  uuid: string;
}

export default function ProfilePageClient({ initialData, uuid }: ProfilePageProps) {
  const { t } = useTranslation();
  const [data, setData] = useState(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isGamesLoading, setIsGamesLoading] = useState(false);
  const [isGameplayLoading, setIsGameplayLoading] = useState(false);
  const [isTrophiesLoading, setIsTrophiesLoading] = useState(false);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(false);

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
    if (data.gameplayDetails && data.userInfo) {
      const totalTimePlayed = data.gameplayDetails.total_time 
        ? getTime(data.gameplayDetails.total_time, t) 
        : '--';

      const scoreDetails = [
        {
          points: data.gameplayDetails.total_points,
          title: t('totalPointsPlayerProfile'),
          imgName: 'totalPoints',
          showInTimeFormat: false,
        },
        {
          points: data.gameplayDetails.total_games,
          title: t('totalGamesPlayerProfile'),
          imgName: 'totalGames',
          showInTimeFormat: false,
        },
        {
          points: data.gameplayDetails.total_trophies,
          title: t('trophiesEarned'),
          imgName: 'trophy',
          showInTimeFormat: false,
        },
        {
          points: data.gameplayDetails.perfect_games,
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
          points: data.gameplayDetails.max_weekly_streak,
          title: t('weeklyStreaks'),
          imgName: 'weekly',
          showInTimeFormat: false,
        },
      ];

      setData(prev => ({
        ...prev,
        userInfo: {
          ...prev.userInfo,
          scoreDetails,
        },
      }));
    }
  }, [data.gameplayDetails, data.userInfo, t]);

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

  const handleShowMore = () => {
    setHideShowMore(true);
    setMaxToShow(data.trophies.length);
  };

  const handleDocumentClick = (doc: Document) => {
    console.log('Document clicked:', doc);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(`/api/refresh-profile?uuid=${uuid}`);
      if (response.ok) {
        const refreshedData = await response.json();
        setData(refreshedData);
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <>
      <SEOHead userInfo={data.userInfo} uuid={uuid} />
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

        {/* Refresh indicator for ISR */}
        {isRefreshing && (
          <div className="bg-blue-500 text-white px-4 py-2 text-center text-sm">
            Refreshing data...
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-[5%] py-6 pb-20 md:pb-6">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row gap-5 mb-8">
            <ProfileCard userInfo={data.userInfo} isLoading={isProfileLoading} />
            <StatsGrid
              scoreDetails={data.userInfo.scoreDetails || []}
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
                documents={data.documents}
                isLoading={isDocumentsLoading}
                onDocumentClick={handleDocumentClick}
              />
              <GamesTable games={data.games} isLoading={isGamesLoading} isMobile={isMobile} />
            </div>
          </div>

          {/* Trophies Section */}
          <TrophiesSection
            trophies={data.trophies}
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
