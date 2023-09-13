export function truncateText(text, maxLength) {
  if (typeof text !== 'string' || text.length === 0) return;
  if (!Number.isInteger(maxLength) || maxLength < 0) return;

  if (text.length <= maxLength) return text;

  const truncatedText = text.slice(0, maxLength - 1);

  return `${truncatedText}…`;
}
