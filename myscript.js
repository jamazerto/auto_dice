chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: "jquery-3.3.1.min.js"});
  chrome.tabs.executeScript({file: "replace_dice.js"});
});