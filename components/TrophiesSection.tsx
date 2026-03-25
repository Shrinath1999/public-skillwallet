'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';

interface Trophy {
  trophies_id: number;
  trophies_name: string;
  description: string;
  logo_url: string;
  trophy_type: string;
  achieved_date: string;
}

interface TrophiesSectionProps {
  trophies: Trophy[];
  isLoading: boolean;
  maxToShow: number;
  hideShowMore: boolean;
  onShowMore: () => void;
}

export default function TrophiesSection({
  trophies,
  isLoading,
  maxToShow,
  hideShowMore,
  onShowMore,
}: TrophiesSectionProps) {
  const { t } = useTranslation();

  if (!trophies.length && !isLoading) return null;

  return (
    <div className="w-full mt-5">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {!isLoading && trophies.length > 0 && (
          <div
            className="px-5 py-3 flex items-center h-[50px] bg-cover bg-center border-b"
            style={{
              backgroundImage: "url('assets/img/playerPublicProfile/tableHeader.png')",
              backgroundSize: '100% 100%',
            }}
          >
            <span className="text-white font-bold text-sm">{t('latestTrophiesachivedProfile')}</span>
          </div>
        )}

        {isLoading && (
          <div className="p-4">
            <Skeleton height={40} />
          </div>
        )}

        {trophies.length > 0 && (
          <div className="p-3">
            <div className="flex flex-wrap gap-3">
              {trophies.slice(0, maxToShow).map((trophy) => (
                <div
                  key={trophy.trophies_id}
                  className="w-full sm:w-[calc(50%-6px)] lg:w-[20%] flex flex-col items-center text-center"
                >
                  {isLoading ? (
                    <>
                      <Skeleton width={110} height={110} circle className="mb-3" />
                      <Skeleton width={80} height={20} className="mb-2" />
                      <Skeleton width={100} height={16} />
                    </>
                  ) : (
                    <>
                      <div className="relative mb-3">
                        {trophy.trophy_type === 'game_trophy' ? (
                          <>
                            <img
                              src="assets/img/ring.png"
                              alt="Ring"
                              className="w-[110px] h-[110px] rounded-full shadow-lg"
                            />
                            <img
                              src={trophy.logo_url}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'assets/img/default_iv_place_holder.png';
                              }}
                              alt={trophy.trophies_name}
                              className="absolute top-[23px] left-1/2 transform -translate-x-1/2 w-[63px] h-[64px] rounded-full"
                            />
                          </>
                        ) : (
                          <img
                            src={trophy.logo_url}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'assets/img/default_iv_place_holder.png';
                            }}
                            alt={trophy.trophies_name}
                            className="w-[110px] h-[110px] rounded-full shadow-lg object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-sm text-gray-900 mb-2">{trophy.trophies_name}</span>
                      <span className="text-xs text-gray-700">{trophy.description}</span>
                    </>
                  )}
                </div>
              ))}
            </div>

            {!isLoading && trophies.length > 5 && !hideShowMore && (
              <div className="flex justify-end mt-4 pr-4">
                <button
                  onClick={onShowMore}
                  className="text-[#3856D1] font-bold text-xs hover:opacity-80 transition"
                >
                  {t('showMoreProfile')} ▼
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
