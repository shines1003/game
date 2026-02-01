const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// 스크롤 이동 거리 설정
const scrollAmount = 310;

nextBtn.onclick = () => {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
};

prevBtn.onclick = () => {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
};

// 마우스 휠 지원
scrollContainer.onwheel = (e) => {
    if (e.deltaY !== 0) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
    }
};

// 게임 시작 함수
function startGame(gameId) {
    alert(`'${gameId}' 게임을 시작하기 위해\n구글 계정으로 로그인을 진행합니다.`);
}