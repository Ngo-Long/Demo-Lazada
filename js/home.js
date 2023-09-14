// valid global
const NAV_SEARCH = document.getElementById('nav-search');

const saveHistoryList = (historyList) => {
  localStorage.setItem('history_list', JSON.stringify(historyList));
};

// <----
// *****
// ---->

function hideSearchHistory() {
  const searchInput = NAV_SEARCH.querySelector('#search_input');
  const searchForm = NAV_SEARCH.querySelector('.nav-search__form');
  const searchHistory = NAV_SEARCH.querySelector('.nav-search__history');
  if (!searchInput || !searchHistory || !searchForm) return;

  // show search history
  searchInput.addEventListener('focus', () => {
    // empty history list is not displayed
    const historyList = getHistoryList();
    if (historyList.length === 0) return;

    searchHistory.style.display = 'block';
  });

  // hidden search history if clicking outside of searchHistory or searchInput
  document.addEventListener('click', (event) => {
    if (
      event.target !== searchInput &&
      !searchInput.contains(event.target) &&
      !searchHistory.contains(event.target)
    ) {
      searchHistory.style.display = 'none';
    }
  });
}

function renderSearchHistoryList(termList) {
  if (!Array.isArray(termList) || termList.length === 0) return;

  const historyElementList = NAV_SEARCH.querySelector('.history-list');
  if (!historyElementList) return;

  termList.forEach((term) => {
    const historyElementItem = createHistoryElementItem(term);

    historyElementList.appendChild(historyElementItem);
  });
}

function createHistoryElementItem(term) {
  if (!term) return;

  const historyElementItem = document.createElement('a');

  // add info
  historyElementItem.href = '#!';
  historyElementItem.textContent = term.title;
  historyElementItem.classList.add('history-item');

  return historyElementItem;
}

function handleSearchFormHistoryList(e) {
  e.preventDefault();

  const searchInput = NAV_SEARCH.querySelector('#search_input');
  if (!searchInput) return;

  // get value
  const searchText = searchInput.value.trim();
  if (searchText.length === 0) return;

  // ADD: add src ....
  // create new history
  const newHistory = {
    title: searchText,
    src: '#!',
  };

  // save local storage
  const historyList = getHistoryList();
  historyList.push(newHistory);
  localStorage.setItem('history_list', JSON.stringify(historyList));

  // append child
  const historyElementItem = createHistoryElementItem(newHistory);

  const historyElementList = NAV_SEARCH.querySelector('.history-list');
  if (historyElementList) historyElementList.appendChild(historyElementItem);

  // reset value
  const searchForm = NAV_SEARCH.querySelector('#search-form');
  if (searchForm) searchForm.reset();
}

function getHistoryList() {
  try {
    return JSON.parse(localStorage.getItem('history_list')) || [];
  } catch {
    return [];
  }
}

function removeHistoryList() {
  const historyDelete = document.querySelector('.history-delete');
  if (!historyDelete) return;

  historyDelete.addEventListener('click', () => {
    // save to local storage
    const newHistoryList = [];
    localStorage.setItem('history_list', JSON.stringify(newHistoryList));

    // DOM
    const searchHistory = NAV_SEARCH.querySelector('.nav-search__history');
    if (searchHistory) searchHistory.style.display = 'none';

    const historyElementList = NAV_SEARCH.querySelector('.history-list');
    if (historyElementList) historyElementList.textContent = '';
  });
}

// home
(() => {
  hideSearchHistory();

  // Add search to history
  // const historyList = [
  //   {
  //     title: 'giày',
  //     src: 'https://www.lazada.vn/'
  //   },
  //   { title: 'giày nam',
  //     src: 'https://www.lazada.vn/'
  //   },
  // ];
  const historyList = getHistoryList();
  renderSearchHistoryList(historyList);

  // create new history
  const searchForm = document.getElementById('search-form');
  if (searchForm) searchForm.addEventListener('submit', handleSearchFormHistoryList);

  removeHistoryList();
})();
