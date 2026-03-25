import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

const resources = {
  en: {
    translation: {
      publicProfileTitle: 'Public Profile',
      howitworks: 'How it works',
      totalPoints: 'Total Points',
      totalGames: 'Total Games',
      trophiesEarned: 'Trophies Earned',
      perfectGamesLabel: 'Perfect Games',
      timePlayed: 'Time Played',
      weeklyStreaks: 'Weekly Streaks',
      totalPointsPlayerProfile: 'Total Points',
      totalGamesPlayerProfile: 'Total Games',
      achivements: 'Achievements',
      certificateAwards: 'Certificates & Awards',
      performanceProfile: 'Performance',
      topGamesProfile: 'Top Games',
      noProfile: 'No.',
      nameProfile: 'Game Name',
      rankProfile: 'Rank',
      pointsProfile: 'Points',
      highScoreProfile: 'High Score',
      winRateProfile: 'Win Rate',
      latestTrophiesachivedProfile: 'Latest Trophies Achieved',
      showMoreProfile: 'Show More',
      active_sincePlayerProfile: 'Active Since',
      milestones_achivedPlayerProfile: 'Milestones Achieved',
      gamesPlayerProfile: 'games',
      privacyPolicyTitle: 'Privacy Policy',
      termsofServiceTitle: 'Terms of Service',
      SKILLWALLEThrs: 'hrs',
      SKILLWALLETmin: 'min',
      SKILLWALLETsec: 'sec',
      playerPublicProfileText: 'You are viewing the profile of a player on the 1Huddle skill development platform. Check out their biggest training achievements and performance insights. If you have questions about this profile — email 1Huddle at %s',
    },
  },
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
