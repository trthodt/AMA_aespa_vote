chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension đã cài!");
});

chrome.runtime.onMessage.addListener((msg) => {
  console.log("Background received:", msg);
});