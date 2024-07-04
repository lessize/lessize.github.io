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
  var tabs = document.querySelectorAll('#accordion li a');
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

  // Initialize the first tab content to be visible
  document.getElementById('tabs-1').style.display = 'block';
});
