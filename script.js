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
        loginForm.classList.add('hidden');
        loggedInArea.classList.remove('hidden');
        displayId.innerText = session.user.email.split('@')[0];
    } else {
        loginForm.classList.remove('hidden');
        loggedInArea.classList.add('hidden');
    }
}

// 4. 회원가입 함수 (자동 로그인 기능 추가)
async function handleSignUp() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) {
        alert("이메일과 비밀번호를 모두 입력해주세요.");
        return;
    }

    // Supabase 회원가입 시도
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    
    if (error) {
        alert("가입 실패: " + error.message);
    } else {
        // [핵심] 가입 성공 시 바로 로그인 함수를 호출하여 자동 입장
        alert("회원가입 성공! 자동으로 로그인합니다.");
        handleLogin(); 
    }
}

// 5. 로그인 함수
async function handleLogin() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    if (!email || !password) {
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }

    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });

    if (error) {
        alert("로그인 실패: " + error.message);
    } else {
        alert("반갑습니다!");
        updateAuthUI(data.session);
    }
}

// 6. 게임 시작 함수
async function startGame(gameId) {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        alert("로그인이 필요한 서비스입니다. 로그인을 먼저 해주세요!");
        return;
    }

    const accessToken = session.access_token;
    window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
}

// 7. 로그아웃 함수
async function handleLogout() {
    await supabaseClient.auth.signOut();
    location.reload();
}

// 슬라이드 컨트롤 로직
const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn && prevBtn && scrollContainer) {
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}