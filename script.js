// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/**
 * 2. 회원가입 처리 함수
 */
async function handleSignUp() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        alert("회원가입 실패: " + error.message);
    } else {
        alert("회원가입 성공! 이제 로그인을 진행해주세요.");
    }
}

/**
 * 3. 로그인 처리 함수 (핵심)
 */
async function handleLogin() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }

    // Supabase 이메일 로그인 시도
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("로그인 실패: " + error.message);
    } else if (data.session) {
        console.log("로그인 성공! 게임으로 이동합니다.");
        const accessToken = data.session.access_token;
        const gameId = 'YGJ'; // 기본 게임 ID 설정

        // 로그인 성공 시 토큰을 들고 고도 게임 페이지(ygj.html)로 즉시 이동
        window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
    }
}

/**
 * 4. 기존 슬라이드 컨트롤 유지
 */
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

if (nextBtn && prevBtn && scrollContainer) {
    nextBtn.onclick = () => {
        scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    };

    prevBtn.onclick = () => {
        scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
    };
}