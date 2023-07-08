$(document).ready(function(){
  if($('.slick-slideshow').length) {
      $('.slick-slideshow').on('init', function(event, slick) {
        var $slides = $(slick.$slides);
        var $currentSlide = $slides.eq(slick.currentSlide);
        applyAnimation($currentSlide, false);
        activateSlide(slick.currentSlide);
    });

    $('.slick-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var $slides = $(slick.$slides);
        var $currentSlide = $slides.eq(currentSlide);
        applyAnimation($currentSlide, true);
        var $nextSlide = $slides.eq(nextSlide);
        applyAnimation($nextSlide, false);
        deactivateSlide(currentSlide);
        activateSlide(nextSlide);
    });

    function applyAnimation($slide, reset) {
        var scaleStart = reset ? 1.04901 : 1.01202;
        var scaleEnd = reset ? 1.01202 : 1.04901;

        $slide.css({
            'transform': 'translate3d(0px, 0px, 0px) scale(' + scaleStart + ')',
            'transition': 'none'
        });

        // Thời gian chờ trước khi áp dụng hiệu ứng
        setTimeout(function() {
            $slide.css({
                'transform': 'translate3d(0px, 0px, 0px) scale(' + scaleEnd + ')',
                'transition': 'transform 8s ease-in-out'
            });
        }, 100);
    }
    function activateSlide(slideIndex) {
      $('.slide_labels_titles li').removeClass('active');
      var $currentSlide = $('#home-title-slide' + slideIndex);
      $currentSlide.addClass('active');
      TweenMax.from($currentSlide, 1, { x: '100%' });
    }
    function deactivateSlide(slideIndex) {
      $('#home-title-slide' + slideIndex).removeClass('active');
    }
    $('.slick-slideshow').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
        autoplay: true,
        autoplaySpeed: 8000,
        customPaging: (_slider, i) => '<div id="dot' + (i + 1) + '"><svg viewBox="0 0 40 40" class="spinner" width="20" height="20" style="--duration: 15.046667s;"><circle cx="20" cy="20" r="12" class="outer" opacity="0.5"></circle><circle cx="20" cy="20" r="5.5" class="inner" opacity="0.5"></circle></svg></div>'
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
if($('.nav-fixed').length) {
      var num = 100;  
      $(window).bind('scroll', function () {
          if ($(window).scrollTop() > num) {   
              $('.nav-fixed').addClass('fixed');
          }
          else
          {
              $('.nav-fixed').removeClass('fixed');
          }
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
          }, 1200);
        }, 1000);
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
});