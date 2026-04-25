import handleVote from "./handlevote/handlevote";

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "AUTO_VOTE") {
    handleVote(msg.artist);
  }
});

