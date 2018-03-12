chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript({file: "js/jquery-3.3.1.min.js"});
  chrome.tabs.insertCSS({file: "css/bootstrap.css"});
  chrome.tabs.executeScript({file: "js/bootstrap.js"});
  chrome.tabs.executeScript({file: "replace_dice.js"});
});