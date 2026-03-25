'use client';

import React from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}

export default function Skeleton({ width, height, circle, className = '' }: SkeletonProps) {
  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: circle ? '50%' : '4px',
  };

  return (
    <div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={style}
    />
  );
}
