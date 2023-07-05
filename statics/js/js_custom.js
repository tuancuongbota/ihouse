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
  $('.language_btn').on('click', function() {
    $('.language_overlay_content').slideToggle(300);
    $('.language_overlay_content').toggleClass('active');
    $('.language_chevron').toggleClass('active');
  });
  
  $('.language_btn').on('click', function() {
    if ($('.language_overlay_content').hasClass('active')) {
      $('.language_overlay_content').css({
        'opacity': '1',
        'transform': 'matrix(1, 0, 0, 1, 0, 0)',
        'display': 'block'
      });
      $('.language_chevron').css({
        'transform-origin': 'center 40% 0px',
        'transform': 'matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1)'
      });
    } else {
      $('.language_overlay_content').css({
        'opacity': '0',
        'transform': 'matrix(0.75, 0, 0, 0.75, 0, 30)',
        'display': 'none'
      });
      $('.language_chevron').css({
        'transform-origin': 'center 40% 0px',
        'transform': 'matrix(1, 0, 0, 1, 0, 0)'
      });
    }
  });
  $('.header-search-toggle').on('click', function() {
    $('.header-search-wrapper').toggleClass('active');
    $('body').toggleClass('search_active');
    $('.search-gradient').toggleClass('active');
  });
  $('.search-gradient').on('click', function() {
    $('.header-search-wrapper').removeClass('active');
    $('body').removeClass('search_active');
    $('.search-gradient').removeClass('active');
  });
  $('.header-nav-toggle').on('click', function() {
    $('.header-right-mb').toggleClass('active');
    $('.mb-gradient').toggleClass('active');
    $('.search-gradient').removeClass('active');
    $('body').removeClass('search_active');
  });
});