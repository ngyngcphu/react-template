export const escapeRegexCharacters = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
