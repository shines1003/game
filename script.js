const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// 카드 한 장의 너비 + 간격 만큼 이동
const scrollAmount = 305;

nextBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

// 마우스 휠로 가로 스크롤 허용
scrollContainer.addEventListener('wheel', (evt) => {
    if (evt.deltaY !== 0) {
        evt.preventDefault();
        scrollContainer.scrollLeft += evt.deltaY;
    }
}, { passive: false });

// 게임 시작 클릭 시 구글 연동 안내
function startGame(gameId) {
    alert(`${gameId} 게임에 접속합니다.\n로그인을 위해 구글 계정 연동 화면으로 이동합니다.`);
    // TODO: Supabase Auth 연동 시 이 부분을 업데이트 하세요.
}