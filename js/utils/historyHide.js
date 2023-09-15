export function hideSearchHistory({ elementId, inputId, termHistoryList }) {
  if (!elementId || !inputId || !termHistoryList) throw new Error('error');
  if (!Array.isArray(termHistoryList)) throw new Error('error');

  const historyContainer = document.getElementById(elementId);
  if (!historyContainer) throw new Error('error');

  const searchInput = document.getElementById(inputId);
  if (!searchInput) throw new Error('error');

  // show search history
  searchInput.addEventListener('click', () => {
    // empty history list is not displayed
    if (termHistoryList.length !== 0) historyContainer.style.display = 'block';
  });

  // hidden search history if clicking outside of searchHistory or searchInput
  document.addEventListener('click', (e) => {
    if (
      e.target !== searchInput &&
      !searchInput.contains(e.target) &&
      !historyContainer.contains(e.target)
    ) {
      historyContainer.style.display = 'none';
    }
  });
}
