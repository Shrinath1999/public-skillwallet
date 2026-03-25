# Public SkillWallet - Next.js + React

A modern Next.js and React conversion of the Angular PlayerPublicProfileComponent. This application displays player profiles, achievements, performance metrics, documents, trophies, and game statistics from the 1Huddle platform.

## Project Structure

```
public-skillwallet/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Main profile page
│   └── globals.css         # Global styles with Tailwind
├── components/
│   ├── Header.tsx          # Header with help menu
│   ├── ProfileCard.tsx     # Player profile card
│   ├── StatsGrid.tsx       # Statistics grid display
│   ├── DocumentsSection.tsx # Achievements/certificates section
│   ├── GamesTable.tsx      # Games performance table
│   ├── TrophiesSection.tsx # Trophies display
│   ├── Footer.tsx          # Footer with links
│   └── Skeleton.tsx        # Loading skeleton component
├── lib/
│   ├── services/
│   │   └── playerProfileService.ts  # API service layer
│   ├── utils/
│   │   └── timeFormatter.ts         # Utility functions
│   └── i18n/
│       └── config.ts               # i18n configuration
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## Features

- **Player Profile Display**: Shows player name, profile image, active since date, and milestones achieved
- **Statistics Grid**: Displays key metrics (total points, games, trophies, perfect games, time played, weekly streaks)
- **Documents Section**: Shows certificates and awards with hover effects
- **Games Performance Table**: Lists games with rank, points, high score, and win rate
- **Trophies Display**: Shows latest trophies with game trophy overlays
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton loaders for better UX
- **Internationalization**: i18n support for multiple languages
- **Help Menu**: Desktop and mobile help popups

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Internationalization**: i18next + react-i18next
- **Icons**: Lucide React
- **Language**: TypeScript
- **Date/Time**: moment-timezone

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd public-skillwallet
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your API base URL:
```
NEXT_PUBLIC_API_BASE_URL=https://api.1huddle.co
```

## Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building

Build for production:
```bash
npm run build
npm start
```

## Usage

Access the player profile by navigating to:
```
http://localhost:3000?uuid=<player-uuid>
```

Replace `<player-uuid>` with the actual player UUID.

## API Endpoints

The service layer expects the following API endpoints:

- `GET /api/player/public-profile/{uuid}` - Get player profile
- `GET /api/player/performance/games/{uuid}` - Get game performance
- `GET /api/player/gameplay/overall/{uuid}` - Get overall gameplay stats
- `GET /api/player/documents/{uuid}` - Get player documents
- `GET /api/player/trophies/{uuid}` - Get player trophies

## Components

### Header
- Sticky header with 1Huddle branding
- Help icon with desktop menu and mobile popup
- Responsive design

### ProfileCard
- Player profile image with fallback
- Player name display
- Active since date
- Milestones achieved
- Loading skeleton states

### StatsGrid
- Responsive grid layout (1-4 columns based on breakpoint)
- Icon display for each stat
- Time format support for time played
- Loading states

### DocumentsSection
- Document/certificate display
- Hover overlay with document name
- PDF and image support
- Responsive grid layout

### GamesTable
- Desktop table view with all columns
- Mobile card view for better UX
- Game logo, rank, points, high score, win rate
- Ordinal suffix for ranks

### TrophiesSection
- Trophy grid display
- Game trophy overlay support
- Show more functionality
- Loading states

### Footer
- Privacy policy and terms links
- 1Huddle logo
- Fixed on mobile, relative on desktop

## Styling

The project uses Tailwind CSS for styling with custom colors:
- Primary: `#3856D1`
- Secondary: `#071934`

Global styles are defined in `app/globals.css` with custom scrollbar styling and animations.

## Internationalization

Translation keys are configured in `lib/i18n/config.ts`. Add new languages by extending the resources object:

```typescript
const resources = {
  en: { translation: { /* English translations */ } },
  es: { translation: { /* Spanish translations */ } },
  // Add more languages
};
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for images
- Skeleton loaders for better perceived performance
- Responsive grid layouts
- CSS-in-JS with Tailwind for minimal bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - 1Huddle

## Support

For issues or questions, contact the development team.
