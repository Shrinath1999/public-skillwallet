import React, { Suspense } from 'react';
import PageClient from './page-client';

export default function Page() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <PageClient />
    </Suspense>
  );
}
