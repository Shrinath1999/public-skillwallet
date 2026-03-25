export const getTime = (totalSeconds: number, t: (key: string) => string): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = totalSeconds - hours * 3600 - minutes * 60;
  seconds = Math.round(seconds * 100) / 100;

  if (hours > 0) {
    return `${hours}<span style='font-size:16px'>${t('SKILLWALLEThrs')}</span> ${minutes}<span style='font-size:16px'>${t('SKILLWALLETmin')}</span>`;
  } else if (minutes >= 0) {
    return `${minutes}<span style='font-size:16px'>${t('SKILLWALLETmin')}</span> ${seconds}<span style="font-size:16px">${t('SKILLWALLETsec')}</span>`;
  } else {
    return `${seconds}<span style='font-size:16px'>${t('SKILLWALLETsec')}</span>`;
  }
};

export const getNumberOrdinal = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

export const languageNumberConversion = (num: number | null): string => {
  if (num === null || num === undefined) return '--';
  return num.toString();
};
