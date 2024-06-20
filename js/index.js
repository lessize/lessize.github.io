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
  document.addEventListener("DOMContentLoaded", function() {
    var initialSlide = document.querySelector('.slides-container [data-order="1"]');
    var initalSelected = document.querySelector('.slide-navigation__txt [data-order="1"]');
    var mq_medium = window.matchMedia('(min-width: 860px)');
    var mq_big = window.matchMedia('(min-width: 1200px)');
  
    function activate_slide(order) {
      var unactiveSlide = document.querySelector('.slide.active');
      var activeSlide = document.querySelector('.slides-container [data-order="' + order + '"]');
      
      if (!activeSlide.classList.contains('active')) {
        slide_in(activeSlide);
        slide_out(unactiveSlide);
      }
    }
  
    function slide_in(slide) {
      animation_in(slide);
      slide.classList.add('active');
      TweenMax.to(slide, 1, { autoAlpha: 1 }, '-=1');
    }
  
    function slide_out(slide) {
      slide.style.zIndex = '2';
      slide.classList.remove('active');
      TweenMax.to(slide, 1, { autoAlpha: 0, onComplete: removeZ });
      
      function removeZ() {
        slide.style.zIndex = '1';
      }
      
      animation_out(slide);
    }
  
    function animation_in(slide) {
      var title = slide.querySelector('h1');
      var subtitle = slide.querySelector('h2');
      var text = slide.querySelector('p');
      var button = slide.querySelector('button');
      var image = slide.querySelector('img');
  
      TweenMax.fromTo(title, 0.6, { autoAlpha: 0, x: 100 }, { autoAlpha: 0.6, x: 0, ease: Power2.easeOut });
      TweenMax.fromTo(subtitle, 0.5, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut }, '-0.1');
      TweenMax.fromTo(text, 0.8, { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0, ease: Power2.easeOut });
      TweenMax.fromTo(button, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
      TweenMax.to(image, 0, { autoAlpha: 1, scale: 1 });
    }
  
    function animation_out(slide) {
      var title = slide.querySelector('h1');
      var subtitle = slide.querySelector('h2');
      var text = slide.querySelector('p');
      var button = slide.querySelector('button');
      var image = slide.querySelector('img');
  
      TweenMax.to(title, 0.6, { autoAlpha: 0, x: 0 });
      TweenMax.to(subtitle, 0.5, { autoAlpha: 0, x: 200 });
      TweenMax.to(text, 0.5, { autoAlpha: 0 });
      TweenMax.to(button, 0.5, { autoAlpha: 0 });
      TweenMax.to(image, 1, { scale: 1.1 });
    }
  
    document.querySelectorAll('.slide-navigation__txt span').forEach(function(span) {
      span.addEventListener('click', function() {
        var order = this.getAttribute('data-order');
        var spans = document.querySelectorAll('.slide-navigation__txt span');
        var current = document.querySelector('.slide.active').getAttribute('data-order');
  
        spans.forEach(function(span) {
          span.classList.remove('active');
        });
  
        this.classList.add('active');
        activate_slide(order);
        stagger_squares(order, current);
      });
    });
  
    function stagger_squares(order, current) {
      var mq = 0.7;
      var moveY;
      var squares = document.querySelectorAll('.slide-navigation__squares .square');
      var staggerTime = -0.12;
  
      if (order < current) {
        staggerTime *= -1;
      }
  
      if (mq_medium.matches) { mq = 1; }
      if (mq_big.matches) { mq = 1.3; }
  
      moveY = (order - 1) * (15 * mq);
      TweenMax.staggerTo(squares, 0.1, { y: moveY }, staggerTime);
    }
  
    initialSlide.classList.add('active');
    initalSelected.classList.add('active');
    TweenMax.to(initialSlide, 0.5, { autoAlpha: 1 });
  });
  
});