const scrollContainer = document.getElementById('gameScroll');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.onclick = () => {
    scrollContainer.scrollBy({ left: 310, behavior: 'smooth' });
};

prevBtn.onclick = () => {
    scrollContainer.scrollBy({ left: -310, behavior: 'smooth' });
};

// 마우스 휠로도 가로 스크롤 가능
scrollContainer.onwheel = (e) => {
    e.preventDefault();
    scrollContainer.scrollLeft += e.deltaY;
};