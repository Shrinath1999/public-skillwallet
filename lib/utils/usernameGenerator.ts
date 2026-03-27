export function generateUsername(profile: { first_name: string; last_name: string; username?: string }): string {
  if (profile.username) {
    return profile.username;
  }
  
  // Generate username from first and last name, handling special characters
  const firstName = profile.first_name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const lastName = profile.last_name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return `${firstName}-${lastName}`;
}

export function getProfileUrl(profile: { first_name: string; last_name: string; username?: string }): string {
  const username = generateUsername(profile);
  return `/profile/${username}`;
}
