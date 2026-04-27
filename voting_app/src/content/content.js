import handleVote from "./handlevote/handlevote";

import handleLogin from "./handlelogin/handleLogin";
import { mountMyComponent } from "../webpopup/MountComp";

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "AUTO_VOTE") {
    handleVote(msg.artist);
  } else if (msg.action === "SUBMIT_MAIL") {
    handleLogin(msg.info);
  }
});

function createPopup() {
  if (window.location.hostname !== "vote.theamas.com") return;
  // tránh tạo nhiều lần
  if (document.getElementById("my-extension-popup")) return;

  const popup = document.createElement("div");
  popup.id = "my-extension-popup"
  document.body.appendChild(popup);
}

createPopup();

mountMyComponent("#my-extension-popup");

