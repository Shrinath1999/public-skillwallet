'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle, X } from 'lucide-react';

interface HeaderProps {
  isMobile: boolean;
  onHelpClick: (show: boolean) => void;
  showHelpPopup: boolean;
}

export default function Header({ isMobile, onHelpClick, showHelpPopup }: HeaderProps) {
  const { t } = useTranslation();
  const [showDesktopMenu, setShowDesktopMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[50px] bg-cover bg-center flex items-center px-[5%]"
        style={{
          backgroundImage: "url('assets/img/playerPublicProfile/headerBg.png')",
          backgroundSize: '100% 100%',
        }}>
        <div className="w-full flex flex-row items-center">
          <img
            src="assets/img/1Huddle_White_trademark.png"
            alt="1Huddle Logo"
            className="h-[50px] w-auto"
          />
          <div className="w-px h-5 bg-white/50 mx-5" />
          <span className="text-white font-bold text-sm">
            {t('publicProfileTitle')}<sup className="text-xs">®</sup>
          </span>
          <div className="flex-1 flex justify-end">
            {isMobile ? (
              <button
                onClick={() => onHelpClick(true)}
                className="cursor-pointer hover:opacity-80 transition"
              >
                <img
                  src="assets/img/playerPublicProfile/helpIcon.png"
                  alt="Help"
                  className="w-[22px] h-[22px]"
                />
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDesktopMenu(!showDesktopMenu)}
                  className="cursor-pointer hover:opacity-80 transition"
                >
                  <img
                    src="assets/img/playerPublicProfile/helpIcon.png"
                    alt="Help"
                    className="w-[22px] h-[22px]"
                  />
                </button>
                {showDesktopMenu && (
                  <div className="absolute right-0 mt-2 w-[400px] bg-[#3856D1] rounded-lg shadow-lg p-4 text-white">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/30">
                      <div className="flex items-center gap-2">
                        <img
                          src="assets/img/playerPublicProfile/helpIcon.png"
                          alt="Help"
                          className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">
                          What is the <span className="font-bold">Skill</span>Wallet<sup>®</sup> by 1Huddle?
                        </span>
                      </div>
                      <button
                        onClick={() => setShowDesktopMenu(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <p className="text-xs text-white/80">
                      You are viewing the profile of a player on the 1Huddle skill development platform. Check out their biggest training achievements and performance insights. If you have questions about this profile — email 1Huddle at{' '}
                      <a href="mailto:support@1Huddle.co" className="underline cursor-pointer">
                        support@1Huddle.co
                      </a>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {isMobile && showHelpPopup && (
        <div className="bg-[#3856D1] rounded-lg m-4 text-white">
          <div className="flex items-center justify-between p-4 border-b border-white/30">
            <div className="flex items-center gap-3">
              <img
                src="assets/img/playerPublicProfile/helpIcon.png"
                alt="Help"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">
                What is the <span className="font-bold">Skill</span>Wallet<sup>®</sup> by 1Huddle?
              </span>
            </div>
            <button
              onClick={() => onHelpClick(false)}
              className="text-white hover:opacity-80"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            <p className="text-xs text-white/80">
              You are viewing the profile of a player on the 1Huddle skill development platform. Check out their biggest training achievements and performance insights. If you have questions about this profile — email 1Huddle at{' '}
              <a href="mailto:support@1Huddle.co" className="underline cursor-pointer">
                support@1Huddle.co
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
