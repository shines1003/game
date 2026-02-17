// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 2. 페이지 로드 시 실행 (해시값 분석 로직)
 */
window.addEventListener('DOMContentLoaded', async () => {
    // URL에서 해시(#) 이후의 문자열을 가져옴
    const hash = window.location.hash;
    let accessToken = null;
    
    if (hash) {
        // #을 떼어내고 파라미터로 변환 (예: access_token=...)
        const hashParams = new URLSearchParams(hash.substring(1));
        accessToken = hashParams.get('access_token');
    }

    // URL 쿼리(?)에서 game_id를 가져옴 (기본값 YGJ)
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id') || 'YGJ';

    // 이미 로그인된 세션이 있는지 확인
    const { data: { session } } = await supabaseClient.auth.getSession();

    // 해시에 토큰이 있거나 이미 로그인 세션이 있다면 바로 게임으로 이동
    if ((session || accessToken) && gameId) {
        const finalToken = accessToken || session.access_token;
        console.log("인증 정보 감지! 게임 페이지로 이동합니다.");
        window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${finalToken}`;
    }
});

/**
 * 3. 게임 시작 버튼 클릭 함수
 */
async function startGame(gameId) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            // 로그인이 안 되어 있다면 구글 로그인창으로 보냄
            // 이때 다시 돌아올 주소에 game_id를 붙여서 보냄
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `https://shines1003.github.io/game/?game_id=${gameId}`
                }
            });
            if (error) throw error;
        } else {
            // 이미 로그인 상태라면 즉시 이동
            window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${session.access_token}`;
        }
    } catch (err) {
        console.error("인증 처리 중 에러:", err.message);
    }
}

// 4. 기존 슬라이드 컨트롤 유지
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn && prevBtn && scrollContainer) {
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}