// 1. Supabase 클라이언트 초기화
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. 페이지 로드 시 로그인 상태 체크
window.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateUI(session);
});

// 3. UI 업데이트 함수 (로그인 전/후 화면 전환)
function updateUI(session) {
    const authSection = document.querySelector('.auth-section');
    const subtitle = document.querySelector('.subtitle');

    if (session) {
        // 로그인 성공 시: 입력창 숨기고 환영 메시지 표시
        const userEmail = session.user.email.split('@')[0]; // ID처럼 사용
        authSection.innerHTML = `
            <div style="color: #fff; margin-bottom: 10px; font-weight: bold;">
                반갑습니다, <span style="color: #e67e22;">${userEmail}</span>님!
            </div>
            <button class="auth-btn signup-btn" onclick="handleLogout()">로그아웃</button>
        `;
        subtitle.innerText = `${userEmail}님, 모험을 시작할 준비가 되셨나요?`;
    }
}

// 4. 로그인 함수 (이동하지 않고 UI만 갱신)
async function handleLogin() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email, password: password,
    });

    if (error) return alert("로그인 실패: " + error.message);
    
    alert("로그인 되었습니다!");
    updateUI(data.session);
}

// 5. 실제 게임 시작 함수 (PLAY NOW 클릭 시 호출)
async function startGame(gameId) {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (!session) {
        alert("로그인이 필요한 서비스입니다. 상단에서 로그인을 먼저 해주세요!");
        return;
    }

    const accessToken = session.access_token;
    // 이제 클릭한 게임의 경로로 토큰을 들고 이동
    window.location.href = `https://shines1003.github.io/game/games/${gameId}/ygj.html?token=${accessToken}`;
}

// 6. 로그아웃 함수
async function handleLogout() {
    await supabaseClient.auth.signOut();
    location.reload(); // 새로고침해서 로그인 폼으로 복구
}

// 7. 회원가입/슬라이드 로직 (기존 유지)
async function handleSignUp() {
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPw').value;
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) alert(error.message); else alert("가입 성공! 로그인을 진행해주세요.");
}

const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
if (nextBtn && prevBtn) {
    nextBtn.onclick = () => scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
    prevBtn.onclick = () => scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
}