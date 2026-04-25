document.getElementById("vote-aespa").onclick = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "AUTO_VOTE",
    artist: "aespa"
  });
};

document.getElementById("vote-ateez").onclick = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.tabs.sendMessage(tab.id, {
    action: "AUTO_VOTE",
    artist: "ateez"
  });
};