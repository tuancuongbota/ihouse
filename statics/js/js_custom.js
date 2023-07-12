$(document).ready(function(){
  if ($('.slick-slideshow').length) {
    $('.slick-slideshow').slick({
      dots: true,
      infinite: false,
      speed: 500, 
      swipe: true, 
      swipeToSlide: true, 
      touchMove: true, 
      speed: 500,
      slidesToShow: 1,
      adaptiveHeight: false,
      autoplay: true,
      transformsEnabled: !1,
      unslicked: !1,
      pauseOnHover: false,
      pauseOnFocus: false,
      autoplaySpeed: 8000,
      customPaging: (_slider, i) => '<div id="dot' + (i + 1) + '"><svg viewBox="0 0 40 40" class="spinner" width="20" height="20" style="--duration: 15.046667s;"><circle cx="20" cy="20" r="12" class="outer" opacity="0.5"></circle><circle cx="20" cy="20" r="5.5" class="inner" opacity="0.5"></circle></svg></div>'
    });
    var $currentSlide = $('.slick-current');
    TweenMax.fromTo($currentSlide, 10, { scale: 1 }, {
      scale: 1.04901,
      onComplete: function() {
        $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
      }
    });
    $('.slick-slideshow').on('init', function(event, slick) {
      var $slides = $(slick.$slides);
      var $currentSlide = $slides.eq(slick.currentSlide);
      activateSlide(slick.currentSlide);
    });

    $('.slick-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var $slides = $(slick.$slides);
      var $currentSlide = $slides.eq(currentSlide);
      var $nextSlide = $slides.eq(nextSlide);
      deactivateSlide(currentSlide);
      activateSlide(nextSlide);
      TweenMax.fromTo($currentSlide, 10, { scale: 1 }, {
        scale: 1.04901,
        onComplete: function() {
          $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });
      
      TweenMax.fromTo($nextSlide, 10, { scale: 1 }, {
        scale: 1.04901,
        onComplete: function() {
          $nextSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });
      if (!isAnimating) { 
        isAnimating = true; 
        var $slides = $(slick.$slides);
        var $currentSlide = $slides.eq(currentSlide);
        TweenMax.killTweensOf($currentSlide);
        $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
      }
    });
    $('.slick-slideshow').on('afterChange', function(event, slick, currentSlide) {
      isAnimating = false; 
      var $slides = $(slick.$slides);
      var $currentSlide = $slides.eq(currentSlide);
      $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });
    function activateSlide(slideIndex) {
      $('.slide_labels_titles li').removeClass('active');
      var $currentSlide = $('#home-title-slide' + slideIndex);
      $currentSlide.addClass('active');
      TweenMax.from($currentSlide, 1, { x: '100%' });
    }

    function deactivateSlide(slideIndex) {
      $('#home-title-slide' + slideIndex).removeClass('active');
    }
    $(window).on('beforeunload', function() {
      var $currentSlide = $('.slick-current');
      TweenMax.killTweensOf($currentSlide);
      $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });
  
  }
  if($('.header-search-toggle').length) {
    $('.header-search-toggle').on('click', function() {
      $('.header-search-wrapper').toggleClass('active');
      $('body').toggleClass('search_active');
      $('.search-gradient').toggleClass('active');
    });
  }
  if($('.search-gradient').length) {
    $('.search-gradient').on('click', function() {
      $('.header-search-wrapper').removeClass('active');
      $('body').removeClass('search_active');
      $('.search-gradient').removeClass('active');
    });
  }
  $(".language_btn").click(function () {
    $(".language_overlay_content").toggleClass("active");
    $(".language_chevron").toggleClass("active");

    if ($(".language_overlay_content").hasClass("active")) {
      // Hiệu ứng hiển thị từ dưới lên trên
      gsap.to(".language_overlay_content", {
        display: "block",
        opacity: 1,
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        duration: 0.5,
        ease: "power2.out"
      });

      gsap.to(".language_chevron", {
        transformOrigin: "center 40% 0px",
        transform: "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)",
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      // Hiệu ứng ẩn từ trên xuống dưới
      gsap.to(".language_overlay_content", {
        opacity: 0,
        transform: "matrix(0.75, 0, 0, 0.75, 0, 30)",
        duration: 0.5,
        ease: "power2.out",
        onComplete: function () {
          $(".language_overlay_content").css("display", "none");
        }
      });

      gsap.to(".language_chevron", {
        transformOrigin: "center 40% 0px",
        transform: "matrix(1, 0, 0, 1, 0, 0)",
        duration: 0.5,
        ease: "power2.out"
      });
    }
  });
if($('.header-nav-toggle').length) {
    $('.header-nav-toggle').on('click', function() {
      $('.header-toggle-content').toggleClass('open');
      $('.header-right-mb').toggleClass('active');
      $('.mb-gradient').toggleClass('active');
      $('body').toggleClass('body-gradient');
      $('.search-gradient').removeClass('active');
      $('body').removeClass('search_active');
    });
}
if($('.language_mb_btn').length) {
  $('.language_mb_btn').on('click', function() {
    $(this).toggleClass('active');
    $('.language_mb').toggleClass('is-open');
    $('.language_mb_list li, .language_mb_list li a').css('opacity', '0').animate({ opacity: 1 }, 500);
  });
}
  if($('.fp-grid-item').length) {
    var gridItems = $(".fp-grid-item");
    var delay = 0;
    gridItems.each(function(index) {
      var currentItem = $(this);
      setTimeout(function() {
        setTimeout(function() {
          currentItem.removeClass("is-hidden");
          setTimeout(function() {
            currentItem.find("img").removeClass("is-blurred");
            currentItem.addClass("is-loaded");
          }, 500);
        }, 500);
      }, delay);
  
      delay += 500; // Mỗi phần tử được thực hiện sau 0.5 giây
    });
  }
  if ($('.footer-list-item').length) {
    var footerItems = $(".footer-list-item");
    var delay = 0;
  
    footerItems.each(function (index) {
      var currentItem = $(this);
      setTimeout(function () {
        currentItem.css({
          "opacity": "1",
          "transform": "matrix(1, 0, 0, 1, 0, 0)"
        });
  
        if (index === footerItems.length - 1) {
          setTimeout(function () {
            $(".footer-bottom-custom").css({
              "opacity": "1",
              "transform": "matrix(1, 0, 0, 1, 0, 0)"
            });
          }, delay + 700); 
        }
      }, delay);
  
      delay += 700; 
    });
  
    footerItems.css({
      "opacity": "0",
      "transform": "matrix(1, 0, 0, 1, 0, 100)"
    });
  }
  if ($('.footer-title').length) {
    var wDWs = $(window).width();
    if (wDWs < 992) {
      $(".footer-title").click(function() {
        var footerLinks = $(this).siblings(".footer-links");
        var chevron = $(this).find(".fp-fh-chevron");
        var listItem = footerLinks.find("li");

        if (footerLinks.css("height") === "0px") {
            gsap.to(footerLinks, { height: "auto" });
            gsap.fromTo(listItem, { zIndex: 0, opacity: 0, x: "10%", y: 0 }, { zIndex: 0, opacity: 1, x: 0, y: 0, delay: 0.5 });
            gsap.to(chevron, { zIndex: 0, transformOrigin: "center 40% 0px", transform: "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -2.5, 0, 1)" });
        } else {
            gsap.to(listItem, { zIndex: 0, opacity: 0, x: "10%", y: 0 });
            gsap.to(footerLinks, { height: "0px", delay: 0.5 });
            gsap.to(chevron, { zIndex: 0, transformOrigin: "center 40% 0px", transform: "none" });
        }
    });
  }
}
if ($('.info-detail-text').length) {
  function applyGsapAnimation(element) {
    gsap.from(element, { opacity: 0, y: 50, duration: 1 });
  }

  applyGsapAnimation($('.info-detail-text'));
  $('.fp-share-toggle').click(function() {
    var shareLinks = $('.fp-share-content ul li a');
    if (shareLinks.css('display') === 'none') {
      shareLinks.each(function(index) {
        var shareLink = $(this);
        gsap.fromTo(
          shareLink,
          { opacity: 0, display: 'none' },
          { opacity: 1, display: 'block', duration: 1, delay: index * 0.2 }
        );
      });
    } else {
      shareLinks.each(function(index) {
        var shareLink = $(this);
        gsap.to(shareLink, { opacity: 0, display: 'none', duration: 1, delay: index * 0.2 });
      });
    }
  });
}
if ($('.news-detail-text').length) {
  function applyGsapAnimation(element) {
    gsap.from(element, { opacity: 0, y: 50, duration: 1 });
  }

  applyGsapAnimation($('.news-detail-text'));
  $('.fp-share-toggle').click(function() {
    var shareLinks = $('.fp-share-content ul li a');
    if (shareLinks.css('display') === 'none') {
      shareLinks.each(function(index) {
        var shareLink = $(this);
        gsap.fromTo(
          shareLink,
          { opacity: 0, display: 'none' },
          { opacity: 1, display: 'block', duration: 1, delay: index * 0.2 }
        );
      });
    } else {
      shareLinks.each(function(index) {
        var shareLink = $(this);
        gsap.to(shareLink, { opacity: 0, display: 'none', duration: 1, delay: index * 0.2 });
      });
    }
  });
}

if ($('.slick-news-list').length) {
  $('.slick-news-list').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    adaptiveHeight: false,
    autoplay: true,
    autoplaySpeed: 8000,
    customPaging: (_slider, i) => '<div id="dot' + (i + 1) + '"><svg viewBox="0 0 40 40" class="spinner" width="20" height="20" style="--duration: 15.046667s;"><circle cx="20" cy="20" r="11" class="outer" opacity="0.5"></circle><circle cx="20" cy="20" r="5" class="inner" opacity="0.5"></circle></svg></div>'
  });
}
if ($('.header-detail-page').length) {
  // scroll menu
  const nav = document.querySelector('.header-detail-page');
  let prevScrollpos = window.pageYOffset;
  
  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos < currentScrollPos && currentScrollPos > 80) {
      nav.style.top = '-80px';
      $('body').addClass('header-scroll-open'); 
    } else {
      nav.style.top = '0';
      if ($('.header').offset().top <= 0) {
        $('body').removeClass('header-scroll-open');
      }
    }
    prevScrollpos = currentScrollPos;
  };
}
if($('.search-page .nav-fixed').length) {
  var num = 100;  
  $(window).bind('scroll', function () {
      if ($(window).scrollTop() > num) {   
          $('.search-page .nav-fixed').addClass('fixed');
      }
      else
      {
          $('.search-page .nav-fixed').removeClass('fixed');
      }
  });
}
if ($('.news-page .nav-fixed').length) {
  // scroll menu
  const nav = document.querySelector('.header-detail-page');
  const fixedNav = document.querySelector('.nav-fixed');
  let prevScrollpos = window.pageYOffset;
  
  window.onscroll = function() {
    const currentScrollPos = window.pageYOffset;
  
    if (prevScrollpos < currentScrollPos && currentScrollPos > 80) {
      nav.style.top = '-80px';
      fixedNav.classList.add('fixed');
      fixedNav.style.top = '0';
      $('body').addClass('header-scroll-open');
    } else {
      nav.style.top = '-80px';
      fixedNav.style.top = '0';
      fixedNav.classList.add('fixed');
      if ($('.header').offset().top <= 0) {
        $('body').removeClass('header-scroll-open');
        nav.style.top = '0';
        fixedNav.style.top = '0';
        fixedNav.classList.remove('fixed');
      }
    }
  
    prevScrollpos = currentScrollPos;
  };
}
if ($('.fp-trigger').length) {
    let isOpen = false;
    $('.fp-trigger').click(function() {
        if (!isOpen) {
            gsap.to('.arrow-down', { transform: 'matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)', duration: 1 });
            gsap.fromTo('.news-tab-wrap li a', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            $('.news-tab-wrap').css('height', 'auto');
            isOpen = true;
        } else {
            gsap.to('.arrow-down', { transform: 'matrix(1, 0, 0, 1, 0, 0)', duration: 1 });
            gsap.fromTo('.news-tab-wrap li a', { y: 0, opacity: 1 }, { y: -100, opacity: 0, duration: 1 });
            $('.news-tab-wrap').css('height', '');
            isOpen = false;
        }
    });
}
if ($('.project-trigger').length) {
  var isAnimating = false;

$(".project-trigger").click(function() {
    if (isAnimating) return;
    var projectLinks = $(".project-filter-drawer");
    var arrow = $(this).find(".arrow-down");
    var projectlistItem = projectLinks.find("li");

      if (projectLinks.css("height") === "0px") {
          isAnimating = true;
          gsap.to(projectLinks, { height: "auto" });

          projectlistItem.each(function(index) {
              var listItem = $(this);
              setTimeout(() => {
                  gsap.fromTo(listItem, { zIndex: 0, opacity: 0, y: '-100%' }, { zIndex: 0, opacity: 1, x: 0, y: 0 });
                  if (index === projectlistItem.length - 1) {
                      isAnimating = false;
                  }
              }, index * 100); 
          });

          gsap.to(arrow, { zIndex: 0, transformOrigin: "center 40% 0px", transform: "matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, -2.5, 0, 1)" });
      } else {
          isAnimating = true;
          projectlistItem.each(function(index) {
              var listItem = $(this);
              setTimeout(() => {
                  gsap.to(listItem, { zIndex: 0, opacity: 0, y: '-100%' });
                  if (index === projectlistItem.length - 1) {
                      gsap.to(projectLinks, { height: "0px", delay: 0.5 });
                      gsap.to(arrow, { zIndex: 0, transformOrigin: "center 40% 0px", transform: "none", onComplete: () => {
                          isAnimating = false;
                      } });
                  }
              }, index * 100); 
          });
      }
  });

}
if ($('.project-gallery').length) {
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
        ScrollTrigger.create({
            trigger: ".project-gallery",
            start: "top center",
            end: "bottom center",
            onEnter: function () {
                gsap.to(".project-pg-mask-before", { transform: "matrix(1, 0, 0, 1, 0, 0)", duration: 1 });
                gsap.to(".project-pg-mask-after", { transform: "matrix(1, 0, 0, 1, 0, 0)", duration: 1 });
            }
        });
    },
});
}
if ($('.project-tabs').length) {
  var tabButtons = document.querySelectorAll('.nav-link');
  tabButtons.forEach(function(tabButton) {
      tabButton.addEventListener('click', function() {
          var targetId = this.getAttribute('data-bs-target');
          var targetElement = document.querySelector(targetId);
          var projectAtContent = targetElement.querySelector('.project-at-content');
          gsap.fromTo(projectAtContent, { x: '100%' }, { x: '0%', duration: 0.5 });
          var otherProjectAtContents = document.querySelectorAll('.project-at-content:not(' + targetId + ' .project-at-content)');
          otherProjectAtContents.forEach(function(content) {
              gsap.set(content, { x: '100%' });
          });
      });
  });
  }
  if ($('.project-detail-page').length) {
    const elements = [
      $('.project-pd-project-types'),
      $('.project-dropback'),
      $('.project-detail-page .news-detail-desc'),
      $('.project-map'),
      $('.project-tabs'),
      $('.grid-gallery-list'),
      $('.block-news')
    ];
    
    // Thiết lập các phần tử ban đầu ẩn đi
    gsap.set(elements, { opacity: 0, y: 100 });
    
    // Xử lý sự kiện scroll
    $(window).scroll(function() {
      // Lặp qua từng phần tử
      elements.forEach(element => {
        // Kiểm tra xem phần tử có nằm trong khung nhìn hiện tại hay không
        if (isElementVisible(element)) {
          // Áp dụng hiệu ứng hiển thị từ dưới lên trên bằng GSAP
          gsap.to(element, { opacity: 1, y: 0, duration: 1 });
        }
      });
    });
    
    // Hàm kiểm tra xem phần tử có nằm trong khung nhìn hiện tại hay không
    function isElementVisible(element) {
      const viewportHeight = $(window).height();
      const elementTop = element.offset().top;
      const elementBottom = elementTop + element.outerHeight();
      const scrollTop = $(window).scrollTop();
    
      return (elementTop < (scrollTop + viewportHeight)) && (elementBottom > scrollTop);
    }
  }
});