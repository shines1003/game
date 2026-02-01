const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// 카드 한 장의 너비 + 간격
const cardWidth = 290; 

nextBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: cardWidth,
        behavior: 'smooth'
    });
});

prevBtn.addEventListener('click', () => {
    scrollContainer.scrollBy({
        left: -cardWidth,
        behavior: 'smooth'
    });
});

// 게임 시작 로직 (프로토타입용)
function startGame(gameName) {
    console.log(`${gameName} 접속 시도...`);
    // 여기에 구글 로그인 연동 페이지로 이동하는 로직 추가 예정
    alert(`${gameName}을 시작하기 위해 구글 로그인이 필요합니다.`);
}

// 마우스 휠로도 가로 스크롤 가능하게 설정
scrollContainer.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
});