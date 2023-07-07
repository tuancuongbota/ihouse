$(document).ready(function(){
  var intervalId;

  $('.slick-slideshow').on('init', function(event, slick) {
    startScaleAnimation(slick.currentSlide);
  });

  $('.slick-slideshow').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    stopScaleAnimation();
  });

  $('.slick-slideshow').on('afterChange', function(event, slick, currentSlide) {
    startScaleAnimation(currentSlide);
  });

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

  function startScaleAnimation(slideIndex) {
    var slideElements = $('.slick-slide');
    var scaleValue = 1; // Giá trị scale ban đầu
    var scaleFactor = 0.0001; // Hệ số vận tốc scale

    intervalId = setInterval(function() {
      scaleValue += scaleFactor;
      slideElements.each(function(index, element) {
        if (index === slideIndex) {
          $(element).css('transform', 'translate3d(0px, 0px, 0px) scale(' + scaleValue + ', ' + scaleValue + ')');
        } else {
          $(element).css('transform', 'matrix(1, 0, 0, 1, 0, 0)');
        }
      });

      if (scaleValue >= 1.01668) {
        stopScaleAnimation();
      }
    }, 10);
  }

  function stopScaleAnimation() {
    clearInterval(intervalId);
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
});