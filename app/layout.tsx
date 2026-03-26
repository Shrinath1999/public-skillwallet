import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SkillWallet | 1Huddle',
  description: 'Discover employee skills and achievements on 1Huddle SkillWallet.',
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
