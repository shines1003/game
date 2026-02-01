// === 배경 파티클 효과 (선택 사항, CSS로 대체 가능) ===
// 이 부분은 CSS만으로도 가능하지만, JS로 동적인 입자 생성도 가능함을 보여줍니다.
const particlesContainer = document.querySelector('.floating-particles');
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particlesContainer.appendChild(particle);

    const size = Math.random() * 5 + 2; // 2px to 7px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5s to 10s
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    // 추가적인 CSS 애니메이션 (opacity, transform 등)은 style.css에서 정의
    particle.style.opacity = Math.random() * 0.5 + 0.3; // 0.3 to 0.8
    
    // 일정 시간 후 파티클 제거
    setTimeout(() => {
        particle.remove();
    }, parseFloat(particle.style.animationDuration) * 1000);
}

// 200ms마다 새로운 파티클 생성
// setInterval(createParticle, 200);


// === 게임 카드 슬라이더 기능 ===
const gameSelectionScroll = document.getElementById('gameSelectionScroll');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

const scrollAmount = 300; // 한 번 클릭 시 이동할 픽셀 값 (카드 너비 + 간격)

leftArrow.addEventListener('click', () => {
    gameSelectionScroll.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

rightArrow.addEventListener('click', () => {
    gameSelectionScroll.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// 게임 시작 함수
function startGame(gameId) {
    alert(`${gameId} 게임 시작! Supabase 로그인 화면으로 이동합니다.`);
    // TODO: 여기에 Supabase 로그인 화면으로 리다이렉트하는 로직 구현
    // 예: window.location.href = 'https://your-supabase-auth-url.com';
}

// 초기 로드 시 첫 번째 카드 활성화 (스타일링 목적)
document.addEventListener('DOMContentLoaded', () => {
    const firstGameCard = document.querySelector('.game-card');
    if (firstGameCard) {
        firstGameCard.classList.add('active');
    }
});