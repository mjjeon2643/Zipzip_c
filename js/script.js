// 버튼 → 지도
document.querySelectorAll('.region-btn').forEach(btn => {
  const regionId = btn.dataset.target;
  const regionPath = document.getElementById(regionId);

  btn.addEventListener('mouseenter', () => regionPath?.classList.add('highlight'));
  btn.addEventListener('mouseleave', () => regionPath?.classList.remove('highlight'));

  // 클릭 → 해당 지역 페이지로 이동
  btn.addEventListener('click', () => {
    if (!regionId) return;
    const regionName = regionId.replace('region-', '');
    console.log("버튼 클릭 →", regionName);  // ✅ 확인용 로그
    location.href = `region_pages/${regionName}.html`;
  });
});


// 지도 → 버튼 & 맵핀 연결 및 클릭 이동 처리
document.querySelectorAll('svg .land').forEach(path => {
  const regionId = path.id;
  const regionName = regionId.replace('region-', '');

  const btn = document.querySelector(`.region-btn[data-target="${regionId}"]`);
  const pinGroup = document.getElementById(`pin-group-${regionId}`);

  // 마우스 진입 시: path, 버튼, 맵핀 강조
  path.addEventListener('mouseenter', () => {
    path.classList.add('highlight');
    btn?.classList.add('btn-highlight');
    if (pinGroup) pinGroup.style.display = 'block';
  });

  // 마우스 나갈 시: 강조 제거 및 맵핀 숨김
  path.addEventListener('mouseleave', () => {
    path.classList.remove('highlight');
    btn?.classList.remove('btn-highlight');
    if (pinGroup) pinGroup.style.display = 'none';
  });

  // 클릭 시: 해당 지역 페이지로 이동
  path.addEventListener('click', () => {
    if (!regionId) return;
    console.log("지도 클릭 →", regionName);
    location.href = `region_pages/${regionName}.html`;
  });
});





// 검색필터(시/군 -> 시/군/구)
const data = {

  "서울특별시": {
    "강남구": ["개포1동", "개포2동", "개포3동", "개포4동", "논현1동", "논현2동", "대치1동", "대치2동", "대치4동", "도곡1동", "도곡2동", "삼성1동", "삼성2동", "세곡동", "수서동", "신사동", "압구정동", "역삼1동", "역삼2동", "일원1동", "일원본동", "청담동"],
    "강동구": ["강일동", "고덕1동", "고덕2동", "길동", "둔촌1동", "둔촌2동", "명일1동", "명일2동", "상일1동", "상일2동", "성내1동", "성내2동", "성내3동", "암사1동", "암사2동", "암사3동", "천호1동", "천호2동", "천호3동"],
    "강북구": ["미아동", "번1동", "번2동", "번3동", "삼각산동", "삼양동", "송중동", "송천동", "수유1동", "수유2동", "수유3동", "우이동", "인수동"],
    "강서구": ["가양1동", "가양2동", "가양3동", "공항동", "등촌1동", "등촌2동", "등촌3동", "발산1동", "방화1동", "방화2동", "방화3동", "염창동", "우장산동", "화곡1동", "화곡2동", "화곡3동", "화곡4동", "화곡6동", "화곡8동", "화곡본동"],
    "관악구": ["난곡동", "난향동", "남현동", "대학동", "미성동", "보라매동", "삼성동", "서림동", "서원동", "성현동", "신림동", "신사동", "신원동", "은천동", "조원동", "중앙동", "청룡동", "청림동", "행운동", "행운동"],
    "광진구": ["광장동", "구의1동", "구의2동", "구의3동", "군자동", "능동", "자양1동", "자양2동", "자양3동", "자양4동", "중곡1동", "중곡2동", "중곡3동", "중곡4동", "화양동"],
    "구로구": ["가리봉동", "개봉1동", "개봉2동", "개봉3동", "고척1동", "고척2동", "구로1동", "구로2동", "구로3동", "구로4동", "구로5동", "신도림동", "오류1동", "오류2동", "천왕동", "항동"],
    "금천구": ["가산동", "독산1동", "독산2동", "독산3동", "독산4동", "시흥1동", "시흥2동", "시흥3동", "시흥4동", "시흥5동"],
    "노원구": ["공릉1동", "공릉2동", "상계1동", "상계2동", "상계3·4동", "상계5동", "상계6·7동", "상계8동", "상계9동", "상계10동", "상계11동", "월계1동", "월계2동", "월계3동", "중계1동", "중계2·3동", "중계4동", "하계1동", "하계2동"],
    "도봉구": ["도봉1동", "도봉2동", "방학1동", "방학2동", "방학3동", "쌍문1동", "쌍문2동", "쌍문3동", "쌍문4동", "창1동", "창2동", "창3동", "창4동", "창5동"],
    "동대문구": ["답십리1동", "답십리2동", "신설동", "용신동", "이문1동", "이문2동", "장안1동", "장안2동", "전농1동", "전농2동", "제기동", "청량리동", "회기동", "휘경1동", "휘경2동"],
    "동작구": ["노량진1동", "노량진2동", "대방동", "동작동", "본동", "사당1동", "사당2동", "사당3동", "사당4동", "사당5동", "상도1동", "상도2동", "상도3동", "상도4동", "신대방1동", "신대방2동"],
    "마포구": ["공덕동", "광흥창동", "대흥동", "도화동", "망원1동", "망원2동", "상수동", "서강동", "서교동", "성산1동", "성산2동", "신공덕동", "아현동", "연남동", "염리동", "용강동", "중동", "합정동", "현석동"],
    "서대문구": ["남가좌1동", "남가좌2동", "북가좌1동", "북가좌2동", "북아현동", "신촌동", "연희동", "영천동", "천연동", "충현동", "홍은1동", "홍은2동", "홍제1동", "홍제2동", "홍제3동"],
    "서초구": ["내곡동", "반포1동", "반포2동", "반포3동", "반포4동", "방배1동", "방배2동", "방배3동", "방배4동", "서초1동", "서초2동", "서초3동", "서초4동", "양재1동", "양재2동", "염곡동", "우면동"],
    "성동구": ["금호1가동", "금호2·3가동", "금호4가동", "마장동", "사근동", "상왕십리동", "성수1가1동", "성수1가2동", "성수2가1동", "성수2가3동", "송정동", "옥수동", "용답동", "응봉동", "행당1동", "행당2동", "홍익동"],
    "성북구": ["길음1동", "길음2동", "돈암1동", "돈암2동", "동선동", "보문동", "삼선동", "석관동", "성북동", "안암동", "월곡1동", "월곡2동", "장위1동", "장위2동", "장위3동", "정릉1동", "정릉2동", "정릉3동", "정릉4동", "종암동", "하월곡동"],
    "송파구": ["가락1동", "가락2동", "가락본동", "거여1동", "거여2동", "마천1동", "마천2동", "문정1동", "문정2동", "방이1동", "방이2동", "삼전동", "석촌동", "송파1동", "송파2동", "신천동", "오금동", "오륜동", "위례동", "잠실2동", "잠실3동", "잠실4동", "잠실6동", "잠실7동", "장지동", "풍납1동", "풍납2동"],
    "양천구": ["목1동", "목2동", "목3동", "목4동", "목5동", "신월1동", "신월2동", "신월3동", "신월4동", "신월5동", "신월6동", "신월7동", "신정1동", "신정2동", "신정3동", "신정4동", "신정6동", "신정7동"],
    "영등포구": ["당산1동", "당산2동", "대림1동", "대림2동", "대림3동", "도림동", "문래동", "신길1동", "신길3동", "신길4동", "신길5동", "신길6동", "신길7동", "양평1동", "양평2동", "여의동", "영등포본동", "영등포동"],
    "용산구": ["남영동", "보광동", "서빙고동", "용문동", "용산2가동", "이촌1동", "이촌2동", "이태원1동", "이태원2동"],

    

  "전라북도": {
    "전주시 완산구": ["중앙동", "풍남동", "노송동", "완산동", "동서학동", "서서학동", "중화산1동", "중화산2동", "서신동", "평화1동", "평화2동", "삼천1동", "삼천2동", "삼천3동", "효자1동", "효자2동", "효자3동", "효자4동", "효자5동"],
    "전주시 덕진구": ["진북동", "인후1동", "인후2동", "인후3동", "덕진동", "금암1동", "금암2동", "팔복동", "우아1동", "우아2동", "호성동", "송천1동", "송천2동", "조촌동", "여의동", "혁신동"], 
    "군산시": ["옥산면", "옥도면", "옥서면", "회현면", "임피면", "서수면", "대야면", "개정면", "성산면", "나포면", "옥구읍", "해신동", "소룡동", "미성동", "조촌동", "경암동", "구암동", "개정동", "수송동", "나운1동", "나운2동", "나운3동", "소룡동", "미장동", "산북동", "월명동", "중앙동"],
    "익산시": ["함열읍", "오산면", "황등면", "함라면", "웅포면", "성당면", "용안면", "낭산면", "망성면", "여산면", "금마면", "왕궁면", "춘포면", "삼기면", "용동면", "중앙동", "평화동", "인화동", "동산동", "마동", "남중동", "모현동", "송학동", "신동", "영등1동", "영등2동", "어양동", "팔봉동", "삼성동"],
    "정읍시": ["신태인읍", "북면", "입암면", "소성면", "고부면", "영원면", "덕천면", "이평면", "정우면", "태인면", "감곡면", "옹동면", "칠보면", "산내면", "수성동", "장명동", "내장상동", "시기동", "초산동", "연지동", "농소동", "상교동"],
    "남원시": ["운봉읍", "주천면", "수지면", "송동면", "주생면", "금지면", "대강면", "대산면", "사매면", "덕과면", "보절면", "산동면", "이백면", "아영면", "산내면", "동충동", "죽항동", "노암동", "금동", "왕정동", "향교동", "도통동"],
    "김제시": ["만경읍", "죽산면", "백산면", "용지면", "백구면", "부량면", "공덕면", "청하면", "성덕면", "진봉면", "금구면", "봉남면", "황산면", "금산면", "광활면", "요촌동", "신풍동", "검산동", "교월동"],
    "완주군": ["삼례읍", "봉동읍", "용진읍", "상관면", "이서면", "소양면", "구이면", "고산면", "비봉면", "운주면", "화산면", "동상면", "경천면"],
    "진안군": ["진안읍", "용담면", "안천면", "동향면", "상전면", "백운면", "성수면", "마령면", "부귀면", "정천면", "주천면"],
    "무주군": ["무주읍", "무풍면", "설천면", "적상면", "안성면", "부남면"],
    "장수군": ["장수읍", "산서면", "번암면", "장계면", "천천면", "계남면", "계북면"],
    "임실군": ["임실읍", "청웅면", "운암면", "신평면", "성수면", "오수면", "신덕면", "삼계면", "관촌면", "강진면", "덕치면", "지사면"],
    "순창군": ["순창읍", "인계면", "동계면", "풍산면", "금과면", "팔덕면", "쌍치면", "복흥면", "적성면", "유등면", "구림면"],
    "고창군": ["고창읍", "고수면", "아산면", "무장면", "공음면", "상하면", "해리면", "성송면", "대산면", "심원면", "흥덕면", "성내면", "신림면", "부안면"],
    "부안군": ["부안읍", "주산면", "동진면", "행안면", "계화면", "보안면", "변산면", "진서면", "백산면", "상서면", "하서면", "줄포면", "위도면"]
  }
}

};

document.addEventListener("DOMContentLoaded", () => {
  const sidoSelect = document.getElementById("sido");
  const sigunguSelect = document.getElementById("sigungu");

  // 해당 요소들이 존재할 때만 실행
  if (sidoSelect && sigunguSelect) {
    sidoSelect.addEventListener("change", () => {
      const selectedSido = sidoSelect.value;
      const sigunguList = data[selectedSido] || [];

      // 시/군/구 초기화
      sigunguSelect.innerHTML = '<option value="" disabled selected hidden>시/군/구</option>';

      // 새로운 옵션 추가
      sigunguList.forEach(gun => {
        const option = document.createElement("option");
        option.value = gun;
        option.textContent = gun;
        sigunguSelect.appendChild(option);
      });
    });
  }
});




// header hover and underline
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const currentPath = window.location.pathname.split("/").pop();

  // 빈집 찾기와 연결된 지역 페이지들
  const regionPages = [
    "Seoul.html", "Gyeonggi.html", "Incheon.html", "Busan.html",
    "Daegu.html", "Daejeon.html", "Gwangju.html", "Ulsan.html",
    "Gangwon.html", "Chungbuk.html", "Chungnam.html",
    "Jeonbuk.html", "Jeonnam.html", "Gyeongbuk.html", "Gyeongnam.html",
    "Jeju.html", "Sejong.html", "N_Chungcheong.html", "S_Chungcheong.html",
    "N_Gyeongsang.html", "S_Gyeongsang.html", "N_Jeolla.html", "S_Jeolla.html"
  ];
  const farmingPages = [
    "community.html", "education.html", "interview.html", "policy"
  ];

  links.forEach(link => {
    const linkPath = link.getAttribute("href")?.split("/").pop();

    // 일반 페이지 자동 매칭
    if (linkPath === currentPath) {
      link.classList.add("active");
    }

    // 지역 페이지도 <빈집 찾기>에 매핑
    if (regionPages.includes(currentPath) && linkPath === "index.html") {
      link.classList.add("active");
    }
    // 귀농귀촌 하위 페이지도 귀농귀촌 정보 페이지에 매핑
    if (farmingPages.includes(currentPath) && linkPath === "guide.html") {
      link.classList.add("active");
    }
  });
});


// Scroll Auto
let hasScrolledDown = false;
let hasScrolledUp = false;


window.addEventListener("wheel", (e) => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollBottom =
    document.documentElement.scrollHeight - window.innerHeight - scrollTop;

  // 맨 위 → 아래로 스크롤 시 bottom-section으로 이동
  if (!hasScrolledDown && scrollTop === 0 && e.deltaY > 0) {
    hasScrolledDown = true;

  const bottomSection = document.querySelector(".bottom-section");
    const targetY = bottomSection.offsetTop - 100; // 100px 더 위로

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }

  // 맨 아래 → 위로 스크롤 시 layout-fixed로 이동
  if (!hasScrolledUp && scrollBottom < 2 && e.deltaY < 0) {
    hasScrolledUp = true;

    const layoutFixed = document.querySelector(".layout-fixed");
    const targetY = layoutFixed.offsetTop - 100; // 100px 더 위로

    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  }

  // 상태 초기화
  if (scrollTop === 0) {
    hasScrolledDown = false;
  }
  if (scrollBottom === 0) {
    hasScrolledUp = false;
  }
}, { passive: true });