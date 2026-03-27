'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from './Skeleton';

interface UserInfo {
  first_name: string;
  last_name: string;
  active_since: string;
  player_id: number;
  milestone_achived: number;
  profile_image_url: string;
}

interface ProfileCardProps {
  userInfo: UserInfo;
  isLoading: boolean;
}

export default function ProfileCard({ userInfo, isLoading }: ProfileCardProps) {
  const { t } = useTranslation();

  return (
    <div className="w-full md:w-[30%] mb-5 md:mb-0">
      <div className="bg-white rounded-lg border border-[#E0E0E0] shadow-lg overflow-hidden">
        {!isLoading && (
          <div
            className="w-full h-[85px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/img/playerPublicProfile/profileHeader.png')",
              backgroundSize: '100% 100%',
            }}
          />
        )}
        {isLoading && <Skeleton height={85} />}

        <div className="flex justify-center -mt-[50px] relative z-10">
          {isLoading ? (
            <Skeleton width={125} height={125} circle />
          ) : (
            <img
              src={userInfo.profile_image_url || '/assets/img/default_iv_place_holder.png'}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/assets/img/default_iv_place_holder.png';
              }}
              alt="Profile"
              className="w-[125px] h-[125px] rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}
        </div>

        <div className="text-center mt-7">
          {isLoading ? (
            <Skeleton width={200} height={30} className="mx-auto" />
          ) : (
            <span className="font-bold text-sm text-gray-900">
              {userInfo.first_name?.toUpperCase()} {userInfo.last_name?.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex justify-center my-5">
          <div className="w-[85%] h-px bg-gray-300" />
        </div>

        {!isLoading && (
          <div className="px-10 pb-8">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xs text-gray-500">{t('active_sincePlayerProfile')}</span>
              <span className="text-sm font-medium text-gray-800">{userInfo.active_since}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">{t('milestones_achivedPlayerProfile')}</span>
              <span className="text-sm font-medium text-gray-800">
                {userInfo.milestone_achived > 0
                  ? `${userInfo.milestone_achived} ${t('gamesPlayerProfile')}`
                  : '--'}
              </span>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="px-10 pb-8 space-y-3">
            <Skeleton height={30} />
            <Skeleton height={30} />
          </div>
        )}
      </div>
    </div>
  );
}
