// 1. Supabase 클라이언트 초기화 (기존 동일)
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 2. 리다이렉트 처리 로직 (해시값 대응)
 */
window.addEventListener('DOMContentLoaded', async () => {
    // 1) 해시(#)에서 토큰 추출 (OAuth 리다이렉트 시 발생)
    const hash = window.location.hash;
    let accessToken = null;
    
    if (hash) {
        const hashParams = new URLSearchParams(hash.substring(1));
        accessToken = hashParams.get('access_token');
    }

    // 2) 쿼리(?)에서 game_id 추출
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game_id') || 'YGJ'; // 못찾으면 기본값 YGJ

    // 3) 세션 확인
    const { data: { session } } = await supabaseClient.auth.getSession();

    // 토큰이 있거나 세션이 이미 존재하면 게임 페이지로 이동
    if ((session || accessToken) && gameId) {
        const finalToken = accessToken || session.access_token;
        console.log("인증 확인됨! 게임으로 입장합니다.");
        window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${finalToken}`;
    }
});

/**
 * 3. 게임 시작 함수
 */
async function startGame(gameId) {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession();

        if (!session) {
            const { error } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    // 리다이렉트 시 game_id를 잃어버리지 않게 query string 유지
                    redirectTo: `https://shines1003.github.io/game/?game_id=${gameId}`
                }
            });
            if (error) throw error;
        } else {
            window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${session.access_token}`;
        }
    } catch (err) {
        console.error("인증 실패:", err.message);
    }
}