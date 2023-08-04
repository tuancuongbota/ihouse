$(document).ready(function(){
  var wDWs = $(window).width();
  if ($('.slick-slideshow').length) {
    var $slickSlideshow = $('.slick-slideshow');
    var $slideLabelsTitles = $('.slide_labels_titles li');
    $slickSlideshow.on('init', function() {
      var $currentSlide = getCurrentSlide();
      activateSlideTitle($currentSlide);
    });

    $slickSlideshow.slick({
      dots: true,
      infinite: true,
      speed: 500,
      swipe: true,
      swipeToSlide: true,
      touchMove: true,
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

    $slickSlideshow.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      var $currentSlide = getCurrentSlide();
      var $nextSlide = slick.$slides.eq(nextSlide);

      deactivateSlide(currentSlide);
      activateSlideTitle($nextSlide);
      TweenMax.fromTo($currentSlide, 10, {
        scale: 1
      }, {
        scale: 1.04901,
        onComplete: function() {
          $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });

      TweenMax.fromTo($nextSlide, 10, {
        scale: 1
      }, {
        scale: 1.04901,
        onComplete: function() {
          $nextSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });

      if (!isAnimating) {
        isAnimating = true;
        TweenMax.killTweensOf($currentSlide);
        $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
      }
      gsap.from($('.slide_labels_titles li.active'), { x: '100%', duration: 1, ease: 'power2.out' });
    });

    $slickSlideshow.on('afterChange', function(event, slick, currentSlide) {
      isAnimating = false;
      var $currentSlide = $(slick.$slides.get(currentSlide));
      activateSlideTitle($currentSlide);
      $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    function getCurrentSlide() {
      return $slickSlideshow.find('.slick-current');
    }

    function activateSlideTitle($slide) {
      var slideIndex = $slide.index();
      $slideLabelsTitles.removeClass('active');
      $('#home-title-slide' + slideIndex).addClass('active');
        var $video = $slide.find('.fp-video');
        if ($video.length > 0 && $video.attr('src')) {
          $video.get(0).play();
          $slide.find('img').css('display', 'none');
          $video.addClass('playing');
        } else {
          $slide.find('img').css('display', 'block');
          $video.removeClass('playing');
        }
    }

    function deactivateSlide(slideIndex) {
      $('#home-title-slide' + slideIndex).removeClass('active');
        var $slide = $('#home-title-slide' + slideIndex);
        var $video = $slide.find('.fp-video');
        if ($video.length > 0 && !$video.get(0).paused) {
          $video.get(0).pause();
        }
    }

    $(window).on('beforeunload', function() {
      var $currentSlide = getCurrentSlide();
      TweenMax.killTweensOf($currentSlide);
      $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });
    $(window).on('load', function() {
      var $currentSlide = getCurrentSlide();
      TweenMax.fromTo($currentSlide, 10, {
        scale: 1
      }, {
        scale: 1.04901,
        onComplete: function() {
          $currentSlide.css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });
    })
    gsap.from($('.slide_labels_titles li.active'), { x: '100%', duration: 1, ease: 'power2.out' });
  
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
    $(".footer-bottom-custom").css({
      "opacity": "1",
      "transform": "matrix(1, 0, 0, 1, 0, 0)"
    });
  }
  if ($('.footer-title').length) {
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
    
    gsap.set(elements, { opacity: 0, y: 100 });
    $(window).scroll(function() {
      elements.forEach(element => {
        if (isElementVisible(element)) {
          gsap.to(element, { opacity: 1, y: 0, duration: 1 });
        }
      });
    });
    function isElementVisible(element) {
      const viewportHeight = $(window).height();
      const elementTop = element.offset().top;
      const elementBottom = elementTop + element.outerHeight();
      const scrollTop = $(window).scrollTop();
    
      return (elementTop < (scrollTop + viewportHeight)) && (elementBottom > scrollTop);
    }
  }
  if ($('.project-button-primary').length) {
    var button = document.querySelector('.project-button-primary');
    var gallery = document.querySelector('.project-gallery-overlay');

    button.addEventListener('click', function() {
      var items = gallery.querySelectorAll('a');
      var fancyboxItems = [];

      items.forEach(function(item) {
        fancyboxItems.push({
          src: item.getAttribute('data-src'),
          caption: item.getAttribute('data-caption')
        });
      });

      Fancybox.show(fancyboxItems, {
        loop: true,
        buttons: ['fullScreen', 'close'],
        Thumbs: {
          autoStart: true
        },
        animationEffect: "fade",
        transitionEffect: "fade",
        transitionDuration: 500,
        arrows: true,
        infobar: true,
        caption: function(item) {
          return item.caption;
        }
      });
    });
  }
  if ($('.grid-gallery-list').length) {
    $('#blueprint-album').click(function() {
      var items = $('.blueprint-albums a').map(function() {
        return {
          src: $(this).data('src'),
          caption: $(this).data('caption')
        };
      }).get();

      Fancybox.show(items, {
        loop: true,
        buttons: ['fullScreen', 'close'],
        Thumbs: {
          autoStart: true
        },
        animationEffect: "fade",
        transitionEffect: "fade",
        transitionDuration: 500,
        arrows: true,
        infobar: true,
        caption: function(item) {
          return item.caption;
        }
      });
    });
    $('#construction-photo').click(function() {
      var items = $('.construction-photo a').map(function() {
        return {
          src: $(this).data('src'),
          caption: $(this).data('caption')
        };
      }).get();

      Fancybox.show(items, {
        loop: true,
        buttons: ['fullScreen', 'close'],
        Thumbs: {
          autoStart: true
        },
        animationEffect: "fade",
        transitionEffect: "fade",
        transitionDuration: 500,
        arrows: true,
        infobar: true,
        caption: function(item) {
          return item.caption;
        }
      });
    });
  }
  if ($('.project-gallery-single').length) {
    var canScroll = true;
  var scrollTimeout;

  $('.project-gallery-single').click(function() {
    $('.project-gallery-single').removeClass('is-selected');
    
    $(this).addClass('is-selected');
    
    var imageSrc = $(this).find('.project-gallery-img').attr('src');
    $('.project-pswp-img').attr('src', imageSrc);
  });
  if (wDWs > 992) {
      $('.project-pswp-scroll-wrap').on('mousewheel', function(event) {
        event.preventDefault();
        
        if (!canScroll) return;
        
        clearTimeout(scrollTimeout);
        
        var currentSelected = $('.project-gallery-single.is-selected');
        var isLastImage = currentSelected.is(':last-child');
        var isFirstImage = currentSelected.is(':first-child');
        
        if (event.originalEvent.deltaY < 0) {
            if (!isFirstImage) {
                var prevSelected = currentSelected.prev('.project-gallery-single');
                currentSelected.removeClass('is-selected');
                prevSelected.addClass('is-selected');
                var imageSrc = prevSelected.find('.project-gallery-img').attr('src');
                changeImageWithGsap(imageSrc);
            }
        } else {
            if (!isLastImage) {
                var nextSelected = currentSelected.next('.project-gallery-single');
                currentSelected.removeClass('is-selected');
                nextSelected.addClass('is-selected');
                var imageSrc = nextSelected.find('.project-gallery-img').attr('src');
                changeImageWithGsap(imageSrc);
            } else {
                var firstSelected = currentSelected.siblings().first('.project-gallery-single');
                currentSelected.removeClass('is-selected');
                firstSelected.addClass('is-selected');
                var imageSrc = firstSelected.find('.project-gallery-img').attr('src');
                changeImageWithGsap(imageSrc);
            }
        }
        
        canScroll = false;
        scrollTimeout = setTimeout(function() {
            canScroll = true;
        }, 500); // Chỉnh số lượng thời gian chậm lại tại đây (theo mili giây)
     });
    }
  $('.project-pswp-zoom-wrap').on('click', function() {
    var imgElement = $('.project-pswp-img');
    var galleryElement = $('.project-gallery-swiper');
  
    if (imgElement.hasClass('zoomed-in')) {
      gsap.to(imgElement, { scale: 1, duration: 0.3 });
      imgElement.removeClass('zoomed-in');
    } else {
      var galleryWidth = galleryElement.width();
      var galleryHeight = galleryElement.height();
  
      gsap.fromTo(
        imgElement,
        { scale: 1 },
        { scale: galleryWidth / imgElement.width(), duration: 0.3 }
      );
      imgElement.addClass('zoomed-in');
    }
  });
  
  function changeImageWithGsap(imageSrc) {
    var imgElement = $('.project-pswp-img');
    
    gsap.to(imgElement, { opacity: 0, duration: 0.2, onComplete: function() {
      $('.project-pswp-img').attr('src', imageSrc);
      gsap.to(imgElement, { opacity: 1, duration: 0.2 });
    }});
    updateCounter();
  }
  $('.project-pswp-button.project-pswp-button-arrow-left').click(function() {
  var currentSelected = $('.project-gallery-single.is-selected');
  var prevSelected = currentSelected.prev('.project-gallery-single');
  
  if (prevSelected.length) {
    currentSelected.removeClass('is-selected');
    prevSelected.addClass('is-selected');
    var imageSrc = prevSelected.find('.project-gallery-img').attr('src');
    changeImageWithGsap(imageSrc);
    updateCounter();
  }
});

  $('.project-pswp-button.project-pswp-button-arrow-right').click(function() {
      var currentSelected = $('.project-gallery-single.is-selected');
      var nextSelected = currentSelected.next('.project-gallery-single');
      
      if (nextSelected.length) {
        currentSelected.removeClass('is-selected');
        nextSelected.addClass('is-selected');
        var imageSrc = nextSelected.find('.project-gallery-img').attr('src');
        changeImageWithGsap(imageSrc);
        updateCounter();
      }
    });

    function updateCounter() {
      var currentSelectedIndex = $('.project-gallery-single.is-selected').index() + 1;
      var totalImages = $('.project-gallery-single').length;
      $('.project-pswp-counter').text(currentSelectedIndex + '/' + totalImages);
    }
  }
  if ($('.green-detail-list-btn').length) {
    $('.green-detail-list-btn a').click(function(e) {
         e.preventDefault();
         const videoUrl = $(this).attr('href');
         const videoEmbedUrl = videoUrl.replace('watch?v=', 'embed/');
         $.fancybox.open({
             src: videoEmbedUrl,
             type: 'iframe',
             iframe: {
              css: {
                width: '800px',
                height: '450px'
              }
            }
         });
    });
  }
  if ($('.green-detail-page').length) {
    function animateScroll() {
      var content = $('.green-detail-content');
      var list = $('.green-detail-list-item');
      gsap.set(content, { opacity: 0, y: 100 });
      gsap.set(list, { opacity: 0, y: 200 });
      gsap.to(content, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
      gsap.to(list, { opacity: 1, y: 0, duration: 1, delay: 1 });
    }
    $(window).on('load', function() {
      animateScroll();
    });
  }
  if ($('.studio-page').length) {
    const elements = [
      $('.studio-content'),
      $('.studio-personnel'),
      $('.studio-working'),
      $('.studio-life'),
      $('.studio-expert'),
      $('.studio-page .fp-grid')
    ];
    
    gsap.set(elements, { opacity: 0, y: 200 });
    $(window).scroll(function() {
      elements.forEach(element => {
        if (isElementVisible(element)) {
          gsap.to(element, { opacity: 1, y: 0, duration: 1 });
        }
      });
    });
    
    function isElementVisible(element) {
      const viewportHeight = $(window).height();
      const elementTop = element.offset().top;
      const elementBottom = elementTop + element.outerHeight();
      const scrollTop = $(window).scrollTop();
    
      return (elementTop < (scrollTop + viewportHeight)) && (elementBottom > scrollTop);
    }
  }
  if ($('.dropdown-toggle').length) {
    $('.dropdown-toggle').click(function() {
      $('.dropdown-menu').not($(this).next('.dropdown-menu')).hide();
      $(this).next('.dropdown-menu').toggle();
    });
    $('.dropdown-item').click(function() {
      $('.dropdown-menu').hide();
    });
  }
  if ($('.accordion').length) {
    $('.accordion .accordion-item .accordion-header .badge').click(function() {
      var $collapse = $(this).closest('.accordion-item').find('.collapse');
      var $header = $(this).closest('.accordion-header');
      var $icon = $(this).find('.fa-chevron-up');
  
      if ($collapse.hasClass('show')) {
        $collapse.removeClass('show');
        $header.addClass('collapsed');
        $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
      } else {
        $collapse.addClass('show');
        $header.removeClass('collapsed');
        $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }
  
      if ($('.fa-chevron-up').length) {
        $('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      } else {
        $('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      }
    });
  
    gsap.fromTo(
      '.accordion .accordion-item .accordion-body .avatar',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
    );
  }
  if ($('.order-by').length) {
    $('.order-by .btn-transparent').click(function() {
      var arrowIcon = $(this).find('.fa-arrow-down-a-z');
      if (arrowIcon.hasClass('fa-arrow-down-a-z')) {
        arrowIcon.removeClass('fa-arrow-down-a-z').addClass('fa-arrow-up-a-z');
      } else {
        arrowIcon.removeClass('fa-arrow-up-a-z').addClass('fa-arrow-down-a-z');
      }
    });
  }
  if ($('.body_main_all').length) {
    AOS.init();
    var arrowLink = document.querySelector('a.arrow');
    arrowLink.addEventListener('click', function(event) {
    event.preventDefault(); 
    var homeNews = document.querySelector('.green-minimalism');
    homeNews.scrollIntoView({ behavior: 'smooth' });
   });
  }

if ($('#projects_project').length) {
  var projectsStudio = $('#projects_studio');
  var projectsProject = $('#projects_project');
  var slickInitialized = false;
  if (window.innerWidth < 767) {
    if (!slickInitialized) {
      projectsStudio.add(projectsProject).slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
      });
      slickInitialized = true;
    }
    projectsStudio.add(projectsProject).removeClass("grid").addClass("slick-projects");
  } else {
    projectsStudio.add(projectsProject).removeClass("slick-projects").addClass("grid");
  }
  $(window).on('resize', function() {
    if (window.innerWidth < 767) {
      if (!slickInitialized) {
        projectsStudio.add(projectsProject).slick({
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          centerMode: false,
          variableWidth: true,
        });
        slickInitialized = true;
      }
      projectsStudio.add(projectsProject).removeClass("grid").addClass("slick-projects");
    } else {
      if (slickInitialized) {
        projectsStudio.add(projectsProject).slick("unslick");
        slickInitialized = false;
      }
      projectsStudio.add(projectsProject).removeClass("slick-projects").addClass("grid");
    }
  });
}
});