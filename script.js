// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. 통합된 게임 시작 함수
async function startGame(gameId) {
    try {
        // 현재 세션(로그인 상태) 확인
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();

        if (sessionError) throw sessionError;

        if (!session) {
            // 로그인이 안 되어 있으면 구글 로그인 실행
            const { error: authError } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin 
                }
            });
            if (authError) throw authError;
        } else {
            // 로그인 상태라면 토큰을 들고 이동
            const accessToken = session.access_token;
            // 게임 폴더 구조가 /games/YGJ/index.html 인지 확인 필수!
            window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;;
        }
    } catch (err) {
        console.error("인증 에러:", err.message);
        alert("인증 오류: " + err.message);
    }
}

// 3. 슬라이드 컨트롤 (정상)
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.onclick = () => {
    scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
};

prevBtn.onclick = () => {
    scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
};