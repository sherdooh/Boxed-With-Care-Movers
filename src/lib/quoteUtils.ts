export const formatQuoteNumber = (referenceDate: string, seed: string, sequenceLength = 6) => {
  const datePortion = referenceDate.replace(/-/g, '');
  const numericSeed = seed.replace(/\D/g, '');
  const sequence = numericSeed ? numericSeed.slice(-sequenceLength).padStart(sequenceLength, '0') : '000001';
  return `BWC-${datePortion}-${sequence}`;
};

export const sanitizeFileName = (value: string) => {
  return value
    .trim()
    .replace(/[\\/:"*?<>|\s]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'quote';
};
