// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. 페이지 로드 시 로그인 상태 확인 및 UI 갱신
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session);
});

// 3. UI 업데이트 함수 (로그인 폼 <-> 환영 메시지)
function updateAuthUI(session) {
    const loginForm = document.getElementById('login-form');
    const loggedInArea = document.getElementById('logged-in-area');
    const displayId = document.getElementById('display-id');

    if (session) {
        // 로그인 상태: 폼 숨기고 환영 영역 표시
        loginForm.classList.add('hidden');
        loggedInArea.classList.remove('hidden');
        // 이메일에서 @ 앞부분만 추출해 ID처럼 표시
        displayId.innerText = session.user.email.split('@')[0];
    } else {
        // 로그아웃 상태: 폼 표시하고 환영 영역 숨김
        loginForm.classList.remove('hidden');
        loggedInArea.classList.add('hidden');
    }
}

// 4. 회원가입 함수
async function handleSignUp() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;
    const { error } = await supabaseClient.auth.signUp({ email, password });
    
    if (error) alert("가입 실패: " + error.message);
    else alert("가입 성공! 이제 로그인을 해주세요.");
}

// 5. 로그인 함수 (성공 시 UI만 바꿈)
async function handleLogin() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        alert("로그인 실패: " + error.message);
    } else {
        alert("로그인되었습니다!");
        updateAuthUI(data.session); // 화면 전환
    }
}

// 6. 게임 시작 함수 (PLAY NOW 클릭 시 실행)
async function startGame(gameId) {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        alert("로그인이 필요한 서비스입니다. 로그인을 먼저 해주세요!");
        return;
    }

    const accessToken = session.access_token;
    // 실제 게임 페이지로 토큰을 들고 이동
    window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
}

// 7. 로그아웃 함수
async function handleLogout() {
    await supabaseClient.auth.signOut();
    location.reload(); // 깔끔하게 새로고침해서 로그인 폼으로 복구
}

// 슬라이드 컨트롤 로직
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn && prevBtn) {
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}