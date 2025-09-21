/**
 * Utility functions for formatting various data types in the MVX Portfolio Manager
 */

/**
 * Format a number as currency (USD)
 * @param value - The numerical value to format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number): string => {
  if (value === 0) return '$0.00';
  
  // Handle very small values
  if (Math.abs(value) < 0.001) {
    return `$${value.toExponential(2)}`;
  }
  
  // Handle values less than $1
  if (Math.abs(value) < 1) {
    return `$${value.toFixed(6)}`;
  }
  
  // Handle normal values
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Format a percentage value
 * @param value - The percentage value (e.g., 0.05 for 5%)
 * @returns Formatted percentage string
 */
export const formatPercentage = (value: number): string => {
  if (value === 0) return '0.00%';
  
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
};

/**
 * Format large numbers with appropriate suffixes (K, M, B, T)
 * @param value - The number to format
 * @returns Formatted number string
 */
export const formatLargeNumber = (value: number): string => {
  if (value === 0) return '0';
  
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (abs >= 1e12) {
    return `${sign}${(abs / 1e12).toFixed(1)}T`;
  } else if (abs >= 1e9) {
    return `${sign}${(abs / 1e9).toFixed(1)}B`;
  } else if (abs >= 1e6) {
    return `${sign}${(abs / 1e6).toFixed(1)}M`;
  } else if (abs >= 1e3) {
    return `${sign}${(abs / 1e3).toFixed(1)}K`;
  }
  
  return value.toString();
};

/**
 * Format token balance with appropriate decimal places
 * @param balance - The balance string from blockchain
 * @param decimals - Number of decimals for the token
 * @param maxDecimals - Maximum decimal places to show (default: 8)
 * @returns Formatted balance string
 */
export const formatTokenBalance = (
  balance: string, 
  decimals: number, 
  maxDecimals: number = 8
): string => {
  const numBalance = parseFloat(balance) / Math.pow(10, decimals);
  
  if (numBalance === 0) return '0';
  
  // For very small amounts, show more decimals
  if (numBalance < 0.001) {
    return numBalance.toFixed(maxDecimals);
  }
  
  // For amounts less than 1, show up to 6 decimals
  if (numBalance < 1) {
    return numBalance.toFixed(6);
  }
  
  // For larger amounts, show up to 4 decimals
  return numBalance.toFixed(4);
};

/**
 * Format MultiversX address for display (truncated)
 * @param address - The full address string
 * @param startLength - Number of characters to show at start (default: 6)
 * @param endLength - Number of characters to show at end (default: 4)
 * @returns Truncated address string
 */
export const formatAddress = (
  address: string, 
  startLength: number = 6, 
  endLength: number = 4
): string => {
  if (!address || address.length <= startLength + endLength) {
    return address;
  }
  
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

/**
 * Format timestamp to readable date string
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string
 */
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param timestamp - Unix timestamp in seconds
 * @returns Relative time string
 */
export const formatRelativeTime = (timestamp: number): string => {
  const now = Date.now() / 1000;
  const diff = now - timestamp;
  
  if (diff < 60) {
    return 'Just now';
  } else if (diff < 3600) {
    const minutes = Math.floor(diff / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < 86400) {
    const hours = Math.floor(diff / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diff < 2592000) {
    const days = Math.floor(diff / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(timestamp);
  }
};

/**
 * Format transaction hash for display
 * @param hash - Transaction hash
 * @returns Formatted hash string
 */
export const formatTxHash = (hash: string): string => {
  return formatAddress(hash, 8, 6);
};

/**
 * Format gas cost
 * @param gasUsed - Gas used
 * @param gasPrice - Gas price in wei
 * @returns Formatted gas cost string
 */
export const formatGasCost = (gasUsed: number, gasPrice: number): string => {
  const cost = (gasUsed * gasPrice) / 1e18; // Convert from wei to EGLD
  return `${cost.toFixed(6)} EGLD`;
};

/**
 * Validate and format MultiversX address
 * @param address - Address to validate
 * @returns Object with validation result and formatted address
 */
export const validateAndFormatAddress = (address: string): {
  isValid: boolean;
  formatted: string;
  error?: string;
} => {
  if (!address) {
    return {
      isValid: false,
      formatted: '',
      error: 'Address is required'
    };
  }
  
  // Remove whitespace
  const cleaned = address.trim();
  
  // Check length (MultiversX addresses are 62 characters)
  if (cleaned.length !== 62) {
    return {
      isValid: false,
      formatted: cleaned,
      error: 'Address must be 62 characters long'
    };
  }
  
  // Check if starts with 'erd1'
  if (!cleaned.startsWith('erd1')) {
    return {
      isValid: false,
      formatted: cleaned,
      error: 'Address must start with "erd1"'
    };
  }
  
  // Basic character validation (should only contain alphanumeric characters)
  const validChars = /^[a-z0-9]+$/;
  if (!validChars.test(cleaned)) {
    return {
      isValid: false,
      formatted: cleaned,
      error: 'Address contains invalid characters'
    };
  }
  
  return {
    isValid: true,
    formatted: cleaned
  };
};
