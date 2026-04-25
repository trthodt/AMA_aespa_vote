import handleVote from "./handlevote/handlevote";

import handleLogin from "./handlelogin/handleLogin";

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "AUTO_VOTE") {
    handleVote(msg.artist);
  } else if (msg.action === "SUBMIT_MAIL") {
    handleLogin(msg.info);
  }
});

