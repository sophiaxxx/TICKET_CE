var getSelectedTab = (tab) => {
    var tabId = tab.id;
    var sendMessage = (messageObj) => chrome.tabs.sendMessage(tabId, messageObj);
    document.getElementById('ticketGet').addEventListener('click', () => sendMessage({ action: 'TICKETGET' }));
    document.getElementById('reset').addEventListener('click', () => sendMessage({ action: 'RESET' }))
  }
  chrome.tabs.getSelected(null, getSelectedTab);