export const formatBalance = (balance: string | null): string => {
  return balance || 'N/A';
};

export const shortenBalance = (balance: string): string => {
  return balance.length > 7 ? `${balance.substring(0, 7)}...` : balance;
};

export const shortenAddress = (account: string, head = 5, tail = 3): string => {
  if (account) {
    return account.length <= head + tail
      ? account
      : `${account.substring(0, head)}...${account.substring(account.length - tail)}`;
  }
  return '';
};

export const shortenText = (username: string, prefixLength = 20): string => {
  return username?.length > prefixLength ? `${username.substring(0, prefixLength)}...` : username;
};

export const convertMSToFormattedTime = (timeInMilliseconds: number): string => {
  const seconds: number = Math.floor(timeInMilliseconds / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  } else if (seconds < 3600) {
    const minutes: number = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    const hours: number = Math.floor(seconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
};
