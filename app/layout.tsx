import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Public SkillWallet - 1Huddle',
  description: 'View player profiles and achievements on 1Huddle SkillWallet',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
