const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.onclick = () => {
    scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
};

prevBtn.onclick = () => {
    scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
};

function startGame(gameId) {
    alert(`'${gameId}' 접속을 위해 구글 로그인을 진행합니다.`);
}