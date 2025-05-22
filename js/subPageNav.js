const navigationData = {
  "귀농귀촌 정보": [
    { filename: "stories.html", title: "귀농귀촌 정보" },
  ],
  "귀농·귀촌 가이드": [
    { filename: "guide.html", title: "귀농·귀촌 가이드" },
  ],
  "성공 사례 / 인터뷰": [
    { filename: "interview.html", title: "성공 사례 / 인터뷰" }
  ],
  "교육 정보": [
    { filename: "education.html", title: "교육 정보" }
  ],
  "커뮤니티 & FAQ": [
    { filename: "community.html", title: "FAQ" }
  ],
  "지자체 지원 정책": [
    { filename: "policy.html", title: "지자체 지원 정책" }
  ]
};



const currentPage = window.location.pathname.split("/").pop();
let breadcrumbHTML = "";
const topCategory = "귀농귀촌 정보";
for (const [middleCategory, pages] of Object.entries(navigationData)) {
  const match = pages.find(p => p.filename === currentPage);
  if (match) {
    breadcrumbHTML = `
    <a href="../index.html" class="navigation-bar-link">
      <svg class="home-icon" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M3 12L12 3l9 9v9a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1z"/>
      </svg>
    </a>
     <span class="icon-arrow_right">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="#bbb"/>
  </svg>
</span>
<span>${topCategory}</span>
<span class="icon-arrow_right">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" aria-hidden="true">
    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" fill="#bbb"/>
  </svg>
</span>
<a href="${match.filename}" class="navigation-bar-link">${middleCategory}</a>

    `;
    break;
  }
}

const breadcrumb = document.getElementById("breadcrumb");
if (breadcrumb && breadcrumbHTML) {
  breadcrumb.innerHTML = breadcrumbHTML;
}


// 서브페이지 탭 전환
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// 지역별 관광 리셋버튼
const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  resetBtn.classList.add("flash");

    // 🔥 선택된 지역 태그 해제
  document.querySelectorAll('.region-tag.selected').forEach(tag => {
    tag.classList.remove('selected');
  });
  
  setTimeout(() => {
    resetBtn.classList.remove("flash");
  }, 1000);
});

// 지역별 관광 버튼 클릭
const regionTags = document.querySelectorAll('.region-tag');

regionTags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('selected');
  });
});





const regionButtons = document.querySelectorAll('.region-tag');
const resetButton = document.getElementById('reset-btn');
const properties = document.querySelectorAll('.property');

let selectedRegions = [];

regionButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selected = button.textContent.trim().replace('#', '').trim(); // "서울"
    const targetRegion = selected + '권'; // "서울권"

    // ✅ 이미 선택된 지역이면 무시 (선택 유지)
    if (!selectedRegions.includes(targetRegion)) {
      selectedRegions.push(targetRegion);
      button.classList.add('selected');
    }

    // 카드 필터링
    properties.forEach(property => {
      const label = property.querySelector('.orange');
      const regionText = label.textContent.trim();

      if (selectedRegions.includes(regionText)) {
        property.style.display = 'block';
      } else {
        property.style.display = 'none';
      }
    });
  });
});

resetButton.addEventListener('click', () => {
  regionButtons.forEach(btn => btn.classList.remove('selected'));
  selectedRegions = [];
  properties.forEach(property => {
    property.style.display = 'block';
  });
});
