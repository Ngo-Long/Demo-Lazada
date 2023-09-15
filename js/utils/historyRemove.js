import { getSearchHistoryList, getSearchHistoryContainer } from './index.js';

export function removeHistoryList({ elementId, termHistoryList }) {
  if (!elementId || !Array.isArray(termHistoryList)) throw new Error('error');

  const historyDelete = document.getElementById(elementId);
  if (!historyDelete) throw new Error('error');

  historyDelete.addEventListener('click', () => {
    // get data  local storage
    const savedHistoryList = JSON.parse(localStorage.getItem('history_list')) || [];

    // save to local storage
    termHistoryList = [];
    localStorage.setItem('history_list', JSON.stringify(termHistoryList));

    // DOM
    const historyContainer = getSearchHistoryContainer();
    if (historyContainer) historyContainer.style.display = 'none';

    const searchHistoryList = getSearchHistoryList();
    if (searchHistoryList) searchHistoryList.textContent = '';
  });
}
