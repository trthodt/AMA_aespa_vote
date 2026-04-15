chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.action === "AUTO_VOTE") {

    // redirect nếu chưa đúng trang
    if (!window.location.pathname.includes("aespa")) {
      await openCategory();
    }

    // click 30 lần
    const btn = document.querySelector('[aria-label="Increase Votes"]');

    for (let i = 0; i < 30; i++) {
      btn.click();
      await new Promise(r => setTimeout(r, 100));
    }

    // submit
    const voteBtn = document.querySelector('.Vote_submit-button');
    voteBtn?.click();
  }
});


const openCategory = async () => {
  const categoryBtn = [...document.querySelectorAll("button, a")]
    .find(el => el.innerText?.toLowerCase().includes("female k-pop"));

  if (!categoryBtn) {
    return;
  }

  categoryBtn.click();

  // đợi load UI
  await new Promise(r => setTimeout(r, 1500));

  // 2. Tìm aespa
  const aespaCard = [...document.querySelectorAll("h2, h3, p")]
    .find(el => el.innerText?.toLowerCase().includes("aespa"));

  if (!aespaCard) {
    return;
    }
  aespaCard.closest("button, div")?.click();
}