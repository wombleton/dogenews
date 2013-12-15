/* global chrome */
function dogeMe(tabId) {
  chrome.tabs.executeScript(tabId, {
    "file": "doge.js"
  });
}

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  var urls = [
    'http://www.nzherald.co.nz/',
    'http://www.stuff.co.nz/'
  ];

  if (urls.indexOf(tab.url) >= 0) {
    if (change.status === 'loading') {
      chrome.pageAction.show(tabId);
    } else if (change.status === 'complete') {
      dogeMe(tabId);
    }
  } else {
    chrome.pageAction.hide(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  dogeMe(tab.id);
});
