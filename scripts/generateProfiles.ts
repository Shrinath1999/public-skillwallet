import fs from 'fs';
import path from 'path';

// Define the profile structure matching the simplified interface
interface PlayerProfile {
  first_name: string;
  last_name: string;
  player_id: number;
  milestone: number;
  profile_image_url: string;
  uuid?: string;
  username?: string;
}

// Multiple profiles to generate at build time (using real data from CSV)
const profiles: PlayerProfile[] = [
  {
    first_name: 'Shrinath',
    last_name: 'Malavekar',
    player_id: 1,
    milestone: 1,
    profile_image_url: '',
    uuid: 'becafbde-51b1-4f76-98cb-0066c82d2820',
    username: 'shrinath-malavekar'
  },
  {
    first_name: 'Arvind',
    last_name: 'Shelke',
    player_id: 22,
    milestone: 1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: '6e3f5ecf-3614-4513-a9be-45bb5ab1f87e',
    username: 'arvind-shelke'
  },
  {
    first_name: 'Shante',
    last_name: 'Kuvalis',
    player_id: 812,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: 'e7bdbbe1-ecc9-48e7-9abe-9d0ea7bac258',
    username: 'shante-kuvalis'
  },
  {
    first_name: 'Jamie',
    last_name: 'Cormier',
    player_id: 813,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: 'b756289c-3b5d-436c-817c-91c4a482609e',
    username: 'jamie-cormier'
  },
  {
    first_name: 'Jospeh',
    last_name: 'Ziemann',
    player_id: 814,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: 'd8ae0fb4-fee9-4408-8361-2197ea257c3d',
    username: 'jospeh-ziemann'
  },
  {
    first_name: 'Ingeborg',
    last_name: 'Terry',
    player_id: 815,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: 'e0e6b7ed-23b4-49eb-930b-6230ca8bd55a',
    username: 'ingeborg-terry'
  },
  {
    first_name: 'Vesta',
    last_name: 'Spinka',
    player_id: 816,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: '65575123-7832-4e68-96e3-515e871d4088',
    username: 'vesta-spinka'
  },
  {
    first_name: 'Lester',
    last_name: 'Abernathy',
    player_id: 817,
    milestone: -1,
    profile_image_url: 'https://1h-qa-static-assets.s3.us-west-2.amazonaws.com/public_html/static/adminpanel/assets/img/admin/profilePic_default.png',
    uuid: '1de899fc-9208-4adf-8ce6-3d53b17fe619',
    username: 'lester-abernathy'
  }
];




// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write profiles to JSON file
const profilesPath = path.join(dataDir, 'profiles.json');
fs.writeFileSync(profilesPath, JSON.stringify(profiles, null, 2));

console.log(`✅ Generated ${profiles.length} profiles at ${profilesPath}`);

// Also generate a metadata file for sitemap generation
const metadata = {
  generatedAt: new Date().toISOString(),
  profileCount: profiles.length,
  profiles: profiles.map(p => ({
    uuid: p.uuid,
    username: p.username,
    lastModified: new Date().toISOString()
  }))
};

const metadataPath = path.join(dataDir, 'profiles-metadata.json');
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

console.log(`✅ Generated metadata at ${metadataPath}`);
