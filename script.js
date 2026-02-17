// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 2. 리다이렉트 처리 로직
 * 구글 로그인 후 돌아왔을 때 URL 파라미터를 읽어 게임으로 자동 입장시킵니다.
 */
window.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id');

    // Supabase 세션 확인
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session && gameId) {
        console.log("인증 확인! 게임 페이지로 이동합니다.");
        const accessToken = session.access_token;
        // 실제 고도 게임이 있는 경로로 이동 (토큰 전달)
        window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
    }
});

/**
 * 3. 게임 시작 버튼 함수
 */
async function startGame(gameId) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            // 구글 클라우드 콘솔에 등록한 도메인과 일치해야 합니다.
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // 로그인 후 돌아올 상세 주소 (원본 도메인이 승인되었으므로 작동함)
                    redirectTo: `https://shines1003.github.io/game/?game_id=${gameId}`
                }
            });
            if (error) throw error;
        } else {
            // 이미 로그인된 경우 즉시 입장
            const accessToken = session.access_token;
            window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
        }
    } catch (err) {
        console.error("인증 실패:", err.message);
        alert("로그인 중 오류가 발생했습니다.");
    }
}

// 4. 슬라이드 애니메이션 (기존 로직 유지)
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn && prevBtn) {
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}