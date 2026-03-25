'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-10 bg-white border-t border-gray-300 flex items-center px-5 md:relative md:h-auto md:border-t-0 md:mt-10 md:py-4">
      <button
        onClick={() => window.open('https://1huddle.co/privacy/')}
        className="text-gray-700 text-xs hover:underline cursor-pointer"
      >
        {t('privacyPolicyTitle')}
      </button>
      <button
        onClick={() => window.open('https://1huddle.co/terms-of-service/')}
        className="text-gray-700 text-xs hover:underline cursor-pointer ml-5"
      >
        {t('termsofServiceTitle')}
      </button>
      <div className="flex-1 flex justify-end">
        <img src="assets/img/1huddle_logo.png" alt="1Huddle" className="h-6 w-auto" />
      </div>
    </footer>
  );
}
