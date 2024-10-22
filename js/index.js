document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("header a");

  // 메뉴 클릭 스크롤링
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  // 마우스 휠 스크롤링
  const sections = document.querySelectorAll("main > section");
  let currentSectionIndex = 0;
  let isScrolling = false;

  const scrollToSection = (index) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      currentSectionIndex = index;
      // updateNav();
    }
  };

  const handleWheel = (event) => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.deltaY > 0) {
      if (currentSectionIndex < sections.length - 1) {
        scrollToSection(currentSectionIndex + 1);
      }
    } else {
      if (currentSectionIndex > 0) {
        scrollToSection(currentSectionIndex - 1);
      }
    }

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  };

  document.addEventListener("wheel", handleWheel);

  // // 내비게이션 업데이트
  // const updateNav = () => {
  //   let currentSection;
  //   let minDistance = Number.MAX_VALUE;

  //   sections.forEach((section) => {
  //     const rect = section.getBoundingClientRect();
  //     const distance = Math.abs(rect.top - window.innerHeight / 2);

  //     if (distance < minDistance) {
  //       minDistance = distance;
  //       currentSection = section;
  //     }
  //   });

  //   if (currentSection) {
  //     const id = currentSection.getAttribute("id");
  //     links.forEach(link => {
  //       if (link.getAttribute("href") === `#${id}`) {
  //         link.style.color = "black";
  //       } else {
  //         link.style.color = "grey";
  //       }
  //     });
  //   }
  // };

  // document.addEventListener("scroll", updateNav);
  // document.addEventListener("DOMContentLoaded", updateNav);

  // // 페이지 로드 시 모든 링크를 회색으로 설정
  // links.forEach(link => link.style.color = "grey");


  // 비디오 재생 속도 조절
  document.querySelector('video').playbackRate = 0.3;


  // progress bar 애니메이션
  const progressBars = document.querySelectorAll('.progress');

    const animateProgressBar = (progressBar, finalValue) => {
      let value = 0;
      const interval = setInterval(() => {
        value++;
        progressBar.value = value;
        if (value >= finalValue) {
          clearInterval(interval);
        }
      }, 10);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const finalValue = progressBar.getAttribute('data-final-value');
          animateProgressBar(progressBar, finalValue);
        }
      });
    }, {
      threshold: 0.5 // progress bar가 50% 보이는 시점에 애니메이션 실행
    });

    progressBars.forEach(progressBar => {
      observer.observe(progressBar);
    });


  // slider
  var tabs = document.querySelectorAll('#accordion > li > a');
  var addons = document.querySelectorAll('.addon');
  var accordion = document.getElementById('accordion');
  var topBar = document.querySelector('#tabs > div > div.top-bar')
  var lists = document.querySelectorAll('#accordion > li')

  accordion.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      event.preventDefault();
      tabs.forEach(function(tab) {
        tab.classList.remove('active');
      });
      addons.forEach(function(addon) {
        addon.classList.remove('fadein');
      });
      lists.forEach(function(list) {
        list.classList.remove('fadeinli');
      });

      var target = event.target.closest('a');
      target.classList.add('active');
      target.parentElement.querySelector('.addon').classList.add('fadein');
      target.parentElement.classList.add('fadeinli');
      
      var tabId = target.getAttribute('href').substring(1);
      document.querySelectorAll('.browser > div').forEach(function(tabContent) {
        tabContent.style.display = 'none';
        topBar.style.display = 'block';
      });
      document.getElementById(tabId).style.display = 'block';
    }
  });

  document.getElementById('tabs-1').style.display = 'block';
});

// 버튼 누르면 새 창에서 링크 열기
function navigateToLink(button) {
  const link = button.getAttribute('data-link');
  window.open(link, '_blank');
}




// gallery
// 모달 요소 가져오기
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalVideo = document.getElementById("modal-video");
const modalVideoSource = document.getElementById("modal-video-source");
const closeBtn = document.getElementsByClassName("close")[0];

// 모든 li 요소에 클릭 이벤트 추가
document.querySelectorAll('#slider li').forEach((li, index, list) => {
  li.addEventListener('click', function() {
    const imgBox = li.querySelector('.imgbox');
    
    // 모달 창 초기화 (이미지와 비디오 숨기기)
    modalImage.style.display = "none";
    modalVideo.style.display = "none";

    // 마지막 li인지 확인
    if (index === list.length - 1) {
      // 비디오를 모달에 설정
      modalVideoSource.src = '../img/video/smombie.mp4'; // 비디오 파일 경로 설정
      modalVideo.style.display = "block"; // 비디오 보이기
      modalVideo.load(); // 새로운 비디오 로드
    } else {
      // 이미지 배경 가져오기
      const bgImage = getComputedStyle(imgBox).backgroundImage;

      // 이미지 설정 (url() 부분 제거)
      modalImage.src = bgImage.slice(5, -2);
      modalImage.style.display = "block"; // 이미지 보이기
    }

    // 모달 창 보이기
    modal.style.display = "block";
  });
});

// 모달 닫기 버튼 이벤트 추가
closeBtn.addEventListener('click', function() {
  modal.style.display = "none";
  modalVideo.pause(); // 모달을 닫을 때 비디오도 일시 정지
});

// 모달 바깥 클릭 시 모달 닫기
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalVideo.pause(); // 모달을 닫을 때 비디오도 일시 정지
  }
});
  