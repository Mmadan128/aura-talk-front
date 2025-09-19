// Currency formatting utilities
export const formatCurrency = (amount: number, currency: 'INR' | 'EUR' = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Fix currency in text responses
export const fixCurrencyInText = (text: string): string => {
  // Replace euros with rupees in common patterns
  return text
    .replace(/€([\d,]+)/g, '₹$1') // €186,000 -> ₹186,000
    .replace(/(\d+)\s*euros?/gi, '₹$1') // 186000 euros -> ₹186000
    .replace(/Euro/g, 'Rupees')
    .replace(/euro/g, 'rupees');
};