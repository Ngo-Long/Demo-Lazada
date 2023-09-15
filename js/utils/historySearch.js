// import { createHistoryElementItem } from './index.js';

export function renderSearchHistoryList({ elementId, termHistoryList }) {
  if (!elementId) throw new Error('error');
  if (!Array.isArray(termHistoryList)) throw new Error('error');

  const historyElementList = document.getElementById(elementId);
  if (!historyElementList) throw new Error('error');

  termHistoryList.forEach((termHistory) => {
    const historyElementItem = createHistoryElementItem(termHistory);

    historyElementList.appendChild(historyElementItem);
  });
}

export function createHistoryElementItem(termHistory) {
  if (!termHistory) throw new Error('error');

  const historyElementItem = document.createElement('a');

  // add info
  historyElementItem.href = '#!';
  historyElementItem.textContent = termHistory.title;
  historyElementItem.classList.add('history-item');

  return historyElementItem;
}
