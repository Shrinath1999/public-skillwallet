'use client';

import React from 'react';
import Skeleton from './Skeleton';

interface ScoreDetail {
  points: string | number | null;
  title: string;
  imgName: string;
  showInTimeFormat: boolean;
}

interface StatsGridProps {
  scoreDetails: ScoreDetail[];
  isLoading: boolean;
  breakpoint: number;
}

export default function StatsGrid({ scoreDetails, isLoading, breakpoint }: StatsGridProps) {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[Math.min(Math.max(Math.round(breakpoint), 1), 4)] || 'grid-cols-3';

  return (
    <div className={`w-full md:w-[70%] md:ml-5`}>
      <div className={`grid ${gridColsClass} gap-5`}>
        {scoreDetails.map((score, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-h-[160px]"
          >
            {isLoading ? (
              <>
                <Skeleton width={30} height={30} className="mb-3" />
                <Skeleton width={60} height={20} className="mb-2" />
                <Skeleton width={80} height={16} />
              </>
            ) : (
              <>
                <img
                  src={`/assets/img/playerPublicProfile/${score.imgName}.png`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/img/default_iv_place_holder.png';
                  }}
                  alt={score.title}
                  className={`${score.imgName === 'weekly' ? 'w-5 h-5' : 'w-[30px] h-[30px]'} mb-3`}
                />
                {!score.showInTimeFormat ? (
                  <span className="font-bold text-xl text-[#3856D1] mb-2">
                    {score.points ? score.points : '--'}
                  </span>
                ) : (
                  <div
                    className="font-bold text-xl text-[#3856D1] mb-2"
                    dangerouslySetInnerHTML={{ __html: String(score.points || '--') }}
                  />
                )}
                <span className="text-sm font-medium text-[#3856D1] text-center">{score.title}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
