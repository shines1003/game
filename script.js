// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. 통합된 게임 시작 함수
async function startGame(gameId) {
    try {
        // 현재 세션 확인
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session) {
            // 로그인 안 되어 있으면 구글 로그인 (redirectTo 주소 고정)
            const { error: authError } = await supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'https://shines1003.github.io/game/'
                }
            });
            if (authError) throw authError;
        } else {
            // 로그인 상태라면 토큰 들고 형님이 만든 ygj.html로 직행
            const accessToken = session.access_token;
            window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
        }
    } catch (err) {
        console.error("인증 에러:", err.message);
        alert("인증 오류: " + err.message);
    }
}

supabaseClient.auth.onAuthStateChange((event, session) => {
    // 세션이 확인되면 바로 YGJ 게임을 시작하도록 실행
    if (session) {
        startGame('YGJ'); 
    }
});

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