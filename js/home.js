import {
  hideSearchHistory,
  removeHistoryList,
  initSaveNewHistoryItem,
  renderSearchHistoryList,
} from './utils/index.js';

function getTermHistoryList() {
  try {
    return JSON.parse(localStorage.getItem('history_list')) || [];
  } catch {
    return [];
  }
}

// home
(() => {
  // const termHistoryList = [
  //   {
  //     title: 'giày',
  //     src: 'https://www.lazada.vn/',
  //   },
  // ];
  const termHistoryList = getTermHistoryList();
  renderSearchHistoryList({
    elementId: 'search-history-list',
    termHistoryList,
  });

  // save a new history item
  initSaveNewHistoryItem({
    elementId: 'search-form',
    termHistoryList,
  });

  removeHistoryList({
    elementId: 'historyDelete',
    termHistoryList,
  });

  hideSearchHistory({
    elementId: 'history-container',
    inputId: 'search_input',
    termHistoryList,
  });
})();
