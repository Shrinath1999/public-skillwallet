# Assets Guide for public-skillwallet

## Image Assets Copied

All required images have been copied from the 1huddleWebapp1.5 reference project to the public-skillwallet project.

### Directory Structure
```
public/assets/img/
├── 1Huddle_White_trademark.png      # Header logo
├── 1huddle_logo.png                 # Footer logo
├── default_iv_place_holder.png      # Default placeholder for images
├── 1h_placeholder.png               # Alternative placeholder
└── playerPublicProfile/
    ├── headerBg.png                 # Header background
    ├── helpIcon.png                 # Help icon
    ├── perfectgames.png             # Perfect games stat icon
    ├── playerPublicProfileBg.png    # Main background
    ├── profileHeader.png            # Profile card header background
    ├── tableHeader.png              # Table header background
    ├── time.png                     # Time stat icon
    ├── time1.png                    # Alternative time icon
    ├── totalGames.png               # Total games stat icon
    ├── totalPoints.png              # Total points stat icon
    ├── trophy.png                   # Trophy stat icon
    └── weekly.png                   # Weekly streaks stat icon
```

## Image Usage in Components

### Header Component
- `1Huddle_White_trademark.png` - Logo in sticky header
- `helpIcon.png` - Help menu icon

### ProfileCard Component
- `default_iv_place_holder.png` - Fallback for profile images

### StatsGrid Component
- `totalPoints.png` - Total points icon
- `totalGames.png` - Total games icon
- `trophy.png` - Trophies earned icon
- `perfectgames.png` - Perfect games icon
- `time.png` or `time1.png` - Time played icon
- `weekly.png` - Weekly streaks icon

### Background Images
- `playerPublicProfileBg.png` - Main page background
- `headerBg.png` - Header background
- `profileHeader.png` - Profile card header background
- `tableHeader.png` - Table/section header backgrounds

### DocumentsSection Component
- `1h_placeholder.png` - Fallback for document thumbnails

### Footer Component
- `1huddle_logo.png` - Footer logo

## External Images

The following images are loaded from external S3 URLs and do not need to be copied:
- `playerPublicProfileAd.png` - Advertisement banner (from S3)
- `ring.png` - Trophy ring overlay (from S3)
- Game logos and player profile images - Loaded dynamically from API

## Notes

- All images are PNG format for optimal quality and transparency support
- Images are optimized for web use
- Fallback placeholders are provided for missing user-generated content
- Background images use CSS background-size: cover for responsive scaling
- Icon images are sized appropriately for their use cases (16px-110px)

## Total Assets
- **16 PNG images** copied to the project
- **2 external S3 images** referenced in code
- **Dynamic images** loaded from API responses
