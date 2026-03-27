import type { Metadata } from 'next';

interface UserInfo {
  first_name: string;
  last_name: string;
  player_id: number;
  milestone_achived: number;
  profile_image_url: string;
  active_since: string;
}

interface SEOConfig {
  companyName: string;
  websiteUrl: string;
  defaultDescription: string;
  keywords: string[];
  author: string;
  twitterHandle?: string;
  facebookPage?: string;
  linkedinPage?: string;
}

const seoConfig: SEOConfig = {
  companyName: '1Huddle',
  websiteUrl: 'https://publicskillwallet.1huddle.co',
  defaultDescription: 'Discover employee skills, achievements, and training progress on 1Huddle SkillWallet. View comprehensive player profiles, game statistics, trophies, and professional development milestones.',
  keywords: [
    'skillwallet',
    '1huddle',
    'employee training',
    'gamification',
    'professional development',
    'corporate learning',
    'skill assessment',
    'employee engagement',
    'training platform',
    'game-based learning',
    'career development',
    'employee skills',
    'workforce training',
    'learning management',
    'gamified training'
  ],
  author: '1Huddle',
  twitterHandle: '@1Huddle',
  facebookPage: 'https://www.facebook.com/1Huddle',
  linkedinPage: 'https://www.linkedin.com/company/1huddle'
};

export function generateMetadata(userInfo?: UserInfo, uuid?: string): Metadata {
  const isUserProfile = userInfo && userInfo.first_name && userInfo.last_name;
  const userName = isUserProfile ? `${userInfo.first_name} ${userInfo.last_name}` : 'Player';
  const canonicalUrl = uuid ? `${seoConfig.websiteUrl}?uuid=${uuid}` : seoConfig.websiteUrl;
  
  const title = isUserProfile 
    ? `${userName} - SkillWallet Profile | ${seoConfig.companyName}`
    : `Public SkillWallet | ${seoConfig.companyName}`;

  const description = isUserProfile
    ? `View ${userName}'s professional profile on 1Huddle SkillWallet. Discover their achievements, ${userInfo.milestone_achived} milestones, game statistics, and professional development progress. Active since ${userInfo.active_since}.`
    : seoConfig.defaultDescription;

  const keywords = isUserProfile 
    ? [
        ...seoConfig.keywords,
        userName.toLowerCase(),
        `${userInfo.first_name.toLowerCase()} ${userInfo.last_name.toLowerCase()}`,
        'player profile',
        'employee achievements',
        'professional profile'
      ]
    : seoConfig.keywords;

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.companyName,
    
    openGraph: {
      type: 'profile',
      siteName: `${seoConfig.companyName} SkillWallet`,
      title,
      description,
      url: canonicalUrl,
      images: userInfo?.profile_image_url ? [
        {
          url: userInfo.profile_image_url,
          width: 400,
          height: 400,
          alt: `${userName}'s Profile Picture - ${seoConfig.companyName} SkillWallet`,
        }
      ] : [
        {
          url: `${seoConfig.websiteUrl}/assets/img/og-default-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${seoConfig.companyName} SkillWallet - Professional Development Platform`,
        }
      ],
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title,
      description,
      images: userInfo?.profile_image_url ? [userInfo.profile_image_url] : [`${seoConfig.websiteUrl}/assets/img/twitter-default-image.jpg`],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl,
        'en': canonicalUrl,
        'es': `${canonicalUrl}&lang=es`,
        'fr': `${canonicalUrl}&lang=fr`,
        'de': `${canonicalUrl}&lang=de`,
        'pt': `${canonicalUrl}&lang=pt`,
        'it': `${canonicalUrl}&lang=it`,
        'ja': `${canonicalUrl}&lang=ja`,
        'zh': `${canonicalUrl}&lang=zh`,
      },
    },
    
    category: 'Education',
    classification: 'Professional Development Platform',
    referrer: 'origin-when-cross-origin',
    
    other: {
      'theme-color': '#2563eb',
      'msapplication-TileColor': '#2563eb',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'apple-mobile-web-app-title': `${seoConfig.companyName} SkillWallet`,
      'application-name': `${seoConfig.companyName} SkillWallet`,
    },
  };
  
  return metadata;
}

export function generateStructuredData(userInfo?: UserInfo, uuid?: string) {
  const baseUrl = seoConfig.websiteUrl;
  const canonicalUrl = uuid ? `${baseUrl}?uuid=${uuid}` : baseUrl;
  const isUserProfile = userInfo && userInfo.first_name && userInfo.last_name;
  const userName = isUserProfile ? `${userInfo.first_name} ${userInfo.last_name}` : 'Player';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoConfig.companyName,
    url: baseUrl,
    logo: `${baseUrl}/assets/img/logo.png`,
    description: 'Leading gamified employee training and professional development platform',
    sameAs: [
      seoConfig.facebookPage,
      seoConfig.linkedinPage,
      `https://twitter.com/${seoConfig.twitterHandle?.replace('@', '')}`
    ].filter(Boolean),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-855-483-1337',
      contactType: 'Sales',
      availableLanguage: ['English']
    }
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${seoConfig.companyName} SkillWallet`,
    url: baseUrl,
    description: seoConfig.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}?uuid={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  let personSchema = null;
  if (isUserProfile) {
    personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: userName,
      url: canonicalUrl,
      image: userInfo.profile_image_url,
      description: `Professional profile on ${seoConfig.companyName} SkillWallet with ${userInfo.milestone_achived} achievements and milestones.`,
      knowsAbout: [
        'Professional Development',
        'Corporate Training',
        'Skill Development',
        'Game-Based Learning'
      ],
      worksFor: {
        '@type': 'Organization',
        name: seoConfig.companyName
      },
      sameAs: canonicalUrl
    };
  }

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: isUserProfile ? `${userName}'s SkillWallet Profile` : 'Public SkillWallet',
    description: isUserProfile 
      ? `View ${userName}'s professional achievements, training progress, and skill development on ${seoConfig.companyName} SkillWallet.`
      : seoConfig.defaultDescription,
    url: canonicalUrl,
    mainEntity: personSchema || organizationSchema,
    provider: organizationSchema,
    dateModified: new Date().toISOString(),
    inLanguage: 'en-US'
  };

  return [organizationSchema, websiteSchema, profilePageSchema, personSchema].filter(Boolean);
}

export default seoConfig;
