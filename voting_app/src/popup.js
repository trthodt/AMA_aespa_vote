const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });


const mailInfo = localStorage.getItem("mail-info");
if (mailInfo) {
  document.getElementById("mail-info").value = mailInfo;
}

document.getElementById("vote-aespa").onclick = async () => {
  chrome.tabs.sendMessage(tab.id, {
    action: "AUTO_VOTE",
    artist: "aespa"
  });
};

document.getElementById("vote-ateez").onclick = async () => {
  chrome.tabs.sendMessage(tab.id, {
    action: "AUTO_VOTE",
    artist: "ateez"
  });
};

document.getElementById("submit-mail").onclick = async () => {
  const mailInfo = document.getElementById("mail-info").value;
  if (!mailInfo) {
    console.log("Vui lòng nhập thông tin đăng nhập");
    return;
  } else {
    localStorage.setItem("mail-info", mailInfo);
  }
  const parts = mailInfo.trim().split(/\s+/);
  const info = {
    email: parts[0],
    password: parts[1],
    code: parts.slice(2).join('')
  }
  chrome.tabs.sendMessage(tab.id, {
    action: "SUBMIT_MAIL",
    info: info
  });
};
