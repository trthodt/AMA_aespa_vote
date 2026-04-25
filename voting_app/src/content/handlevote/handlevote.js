const handleVote = async (artist) => {
  // redirect nếu chưa đúng trang
    if (!window.location.pathname.includes(artist)) {
      await openCategory(artist);
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
};

const openCategory = async (artist) => {
    const tag = artist === 'aespa' ? 'female k-pop' : 'male k-pop';
  const categoryBtn = [...document.querySelectorAll("button, a")]
    .find(el => el.innerText?.toLowerCase().includes(tag));

  if (!categoryBtn) {
    return;
  }

  categoryBtn.click();

  // đợi load UI
  await new Promise(r => setTimeout(r, 1500));

  // 2. Tìm aespa
  const aespaCard = [...document.querySelectorAll("h2, h3, p")]
    .find(el => el.innerText?.toLowerCase().includes(artist));

  if (!aespaCard) {
    return;
    }
  aespaCard.closest("button, div")?.click();
}

export default handleVote;