// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("플랫폼 스크립트 로드 완료");

// 2. 페이지 로드 시 로그인 세션 확인
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session);
});

// 3. UI 업데이트 (로그인 전/후 화면 전환)
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

// 4. 회원가입 함수 (비밀번호 6자 이상 필수)
async function handleSignUp() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) return alert("이메일과 비밀번호를 입력해주세요.");
    if (password.length < 6) return alert("비밀번호는 6자 이상이어야 합니다.");

    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    
    if (error) {
        alert("가입 실패: " + error.message);
    } else {
        alert("회원가입 성공! 자동으로 로그인합니다.");
        handleLogin(); // 가입 즉시 로그인 시도
    }
}

// 5. 로그인 함수
async function handleLogin() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) return alert("이메일과 비밀번호를 입력해주세요.");

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        alert("로그인 실패: " + error.message);
    } else {
        updateAuthUI(data.session);
    }
}

// 6. 게임 실행 함수 (플랫폼 핵심)
async function startGame(gameId) {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        alert("로그인이 필요합니다! 상단에서 로그인을 먼저 해주세요.");
        return;
    }

    // 고도 게임 페이지로 토큰 전달
    const accessToken = session.access_token;
    window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
}

// 7. 로그아웃 함수
async function handleLogout() {
    await supabaseClient.auth.signOut();
    location.reload(); // 세션 초기화를 위해 새로고침
}

// 8. 슬라이드 컨트롤 (정상 작동 확인됨)
const scrollContainer = document.getElementById('gameScroll');
if (scrollContainer) {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}