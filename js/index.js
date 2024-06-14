document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a");

  // 메뉴 클릭 스크롤링
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      // console.log(`Scrolling to ${targetId}`); // 디버깅 메시지 추가

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
      // console.log(`Scrolling to section index: ${index}`); // 디버깅 메시지 추가
      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      currentSectionIndex = index;
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
    }, 1000); // 스크롤 완료 후 1초 후에 다시 스크롤 가능
  };

  document.addEventListener("wheel", handleWheel);


  // 비디오 재생 속도 조절
  document.querySelector('video').playbackRate = 0.3;
});
