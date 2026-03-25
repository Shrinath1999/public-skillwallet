'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';

interface Game {
  game_id: number;
  game_name: string;
  game_image_url: string;
  rank: number;
  points: number;
  high_score: number;
  win_rate: string;
}

interface GamesTableProps {
  games: Game[];
  isLoading: boolean;
  isMobile: boolean;
}

export default function GamesTable({ games, isLoading, isMobile }: GamesTableProps) {
  const { t } = useTranslation();

  if (!games.length && !isLoading) return null;

  const getOrdinal = (num: number): string => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
  };

  return (
    <div className="w-full mt-5">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {!isLoading && games.length > 0 && (
          <div
            className="px-5 py-3 flex items-center h-[50px] bg-cover bg-center border-b"
            style={{
              backgroundImage: "url('assets/img/playerPublicProfile/tableHeader.png')",
              backgroundSize: '100% 100%',
            }}
          >
            <span className="text-white font-bold text-sm">{t('performanceProfile')}</span>
            <div className="w-px h-5 bg-white/50 mx-5" />
            <span className="text-white font-bold text-sm">{t('topGamesProfile')}</span>
          </div>
        )}

        {isLoading && (
          <div className="p-4">
            <Skeleton height={40} />
          </div>
        )}

        {games.length > 0 && !isMobile && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('noProfile')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium"></th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('nameProfile')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('rankProfile')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('pointsProfile')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('highScoreProfile')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs text-gray-600 font-medium">
                    {t('winRateProfile')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, index) => (
                  <tr
                    key={game.game_id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{index + 1}</td>
                    <td className="px-4 py-3 flex justify-center">
                      <img
                        src={game.game_image_url}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'assets/img/default_iv_place_holder.png';
                        }}
                        alt={game.game_name}
                        className="w-[27px] h-[27px] rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{game.game_name}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {game.rank}
                      <sup className="text-xs">{getOrdinal(game.rank)}</sup>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{game.points}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{game.high_score}%</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{game.win_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {games.length > 0 && isMobile && (
          <div className="bg-white">
            {games.map((game, index) => (
              <div key={game.game_id} className="flex p-3 border-b last:border-b-0">
                <div className="w-[5%] flex items-center justify-center">
                  <span className="font-medium text-sm text-gray-900">{index + 1}</span>
                </div>
                <div className="w-[20%] flex items-center justify-center">
                  <img
                    src={game.game_image_url}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/img/default_iv_place_holder.png';
                    }}
                    alt={game.game_name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="w-[75%] flex flex-col">
                  <span className="font-medium text-sm text-gray-900 mb-2">{game.game_name}</span>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <span className="text-xs text-gray-600">
                        {t('rankProfile')}: <span className="font-medium text-gray-900">{game.rank}<sup>{getOrdinal(game.rank)}</sup></span>
                      </span>
                      <div className="mt-1">
                        <span className="text-xs text-gray-600">
                          {t('highScoreProfile')}: <span className="font-medium text-gray-900">{game.high_score}%</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="text-xs text-gray-600">
                        {t('pointsProfile')}: <span className="font-medium text-gray-900">{game.points}</span>
                      </span>
                      <div className="mt-1">
                        <span className="text-xs text-gray-600">
                          {t('winRateProfile')}: <span className="font-medium text-gray-900">{game.win_rate}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
