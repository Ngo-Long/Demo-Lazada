import { getSearchInput, getSearchHistoryList, createHistoryElementItem } from './index.js';

export function initSaveNewHistoryItem({ elementId, termHistoryList }) {
  if (!elementId || !Array.isArray(termHistoryList)) throw new Error('error');

  const searchForm = document.getElementById(elementId);
  if (!searchForm) throw new Error('error');

  searchForm.addEventListener('submit', (e) => {
    handleSearchFormHistoryList(e, searchForm, termHistoryList);
  });
}

export function handleSearchFormHistoryList(e, searchForm, termHistoryList) {
  if (!searchForm || !Array.isArray(termHistoryList)) throw new Error('error');

  e.preventDefault();

  const searchInput = getSearchInput();

  if (!searchInput) throw new Error('error');

  // get value
  const searchText = searchInput.value.trim();
  if (searchText.length === 0) throw new Error('error');

  // ADD: add src ....
  // create new history
  const newHistory = {
    title: searchText,
    src: '#!',
  };

  // save local storage
  termHistoryList.push(newHistory);
  localStorage.setItem('history_list', JSON.stringify(termHistoryList));

  // append child dom
  const historyElementItem = createHistoryElementItem(newHistory);

  const historyElementList = getSearchHistoryList();
  if (historyElementList) historyElementList.appendChild(historyElementItem);

  // reset value
  searchForm.reset();
}
